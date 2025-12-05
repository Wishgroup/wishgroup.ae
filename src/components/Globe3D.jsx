import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

function Globe3D({ width: propWidth = 400, height: propHeight = 400 }) {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const isMountedRef = useRef(true)
  const stepTimeoutRef = useRef(null)
  const isInitializingRef = useRef(false)
  const [dimensions, setDimensions] = useState({ width: propWidth, height: propHeight })

  // Handle responsive sizing
  useEffect(() => {
    function updateDimensions() {
      const windowWidth = window.innerWidth
      const isMobile = windowWidth < 768
      const isTablet = windowWidth >= 768 && windowWidth < 1024
      
      let newWidth, newHeight
      if (isMobile) {
        // Mobile: use viewport width with padding, max 350px
        const containerWidth = Math.min(windowWidth - 40, 350)
        newWidth = containerWidth
        newHeight = newWidth
      } else if (isTablet) {
        // Tablet: use 80% of viewport, max 400px
        const containerWidth = Math.min(windowWidth * 0.8, 400)
        newWidth = containerWidth
        newHeight = newWidth
      } else {
        // Desktop: use prop dimensions
        newWidth = propWidth
        newHeight = propHeight
      }
      
      setDimensions({ width: newWidth, height: newHeight })
    }

    // Initial update
    updateDimensions()
    
    // Update on resize with debounce
    let resizeTimeout
    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateDimensions, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [propWidth, propHeight])

  const { width, height } = dimensions

  useEffect(() => {
    // Prevent multiple simultaneous initializations
    if (isInitializingRef.current) {
      return
    }
    
    isMountedRef.current = true
    isInitializingRef.current = true
    
    const svg = d3.select(svgRef.current)
    if (!svg.node()) {
      isInitializingRef.current = false
      return
    }
    
    // Clear all existing content and stop any ongoing transitions
    svg.selectAll('*').interrupt().remove()
    
    // Clear any pending timeouts
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current)
      stepTimeoutRef.current = null
    }

    const projection = d3.geoOrthographic()
      .scale(height / 2.0)
      .translate([width / 2, height / 2])
      .clipAngle(90)

    const path = d3.geoPath()
      .projection(projection)

    // Add styles
    svg.append('defs').append('style').text(`
      .world-outline-outer {
        fill: none;
        stroke: rgba(0, 0, 0, 0.1);
        stroke-width: 1.0px;
      }
      .world-outline-inner {
        fill: none;
        stroke: rgba(0, 0, 0, 0.15);
        stroke-width: 0.8px;
      }
      .country {
        fill: #737368;
        stroke: #fff;
        stroke-width: 0.0px;
        stroke-linejoin: round;
      }
      text {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        text-anchor: middle;
      }
      .popup-area {
        pointer-events: auto;
        cursor: pointer;
      }
    `)


    // Great arc interpolator
    const d3_radians = Math.PI / 180

    function d3_geo_greatArcInterpolator() {
      let x0, y0, cy0, sy0, kx0, ky0,
          x1, y1, cy1, sy1, kx1, ky1,
          d, k

      function interpolate(t) {
        const B = Math.sin(t *= d) * k,
              A = Math.sin(d - t) * k,
              x = A * kx0 + B * kx1,
              y = A * ky0 + B * ky1,
              z = A * sy0 + B * sy1
        return [
          Math.atan2(y, x) / d3_radians,
          Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians
        ]
      }

      interpolate.distance = function() {
        if (d == null) k = 1 / Math.sin(d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))))
        return d
      }

      interpolate.source = function(_) {
        const cx0 = Math.cos(x0 = _[0] * d3_radians),
              sx0 = Math.sin(x0)
        cy0 = Math.cos(y0 = _[1] * d3_radians)
        sy0 = Math.sin(y0)
        kx0 = cy0 * cx0
        ky0 = cy0 * sx0
        d = null
        return interpolate
      }

      interpolate.target = function(_) {
        const cx1 = Math.cos(x1 = _[0] * d3_radians),
              sx1 = Math.sin(x1)
        cy1 = Math.cos(y1 = _[1] * d3_radians)
        sy1 = Math.sin(y1)
        kx1 = cy1 * cx1
        ky1 = cy1 * sx1
        d = null
        return interpolate
      }

      return interpolate
    }

    const rotate = d3_geo_greatArcInterpolator()

    // Load world data
    d3.json('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95802/world-110m.json')
      .then(function(world) {
        if (!isMountedRef.current) {
          isInitializingRef.current = false
          return
        }
        
        const allCountries = topojson.feature(world, world.objects.countries).features
        
        // Target countries to highlight: UAE, Sri Lanka, Maldives, Malaysia, Ghana, South Africa, UK
        // Using known approximate centroid coordinates for each country
        const targetLocations = [
          { name: 'United Arab Emirates', lon: 54.4, lat: 24.3 },
          { name: 'Sri Lanka', lon: 80.7, lat: 7.9 },
          { name: 'Maldives', lon: 73.5, lat: 3.2 },
          { name: 'Malaysia', lon: 101.9, lat: 4.2 },
          { name: 'Ghana', lon: -1.0, lat: 7.9 },
          { name: 'South Africa', lon: 25.0, lat: -29.0 },
          { name: 'United Kingdom', lon: -2.0, lat: 54.5 }
        ]
        
        // Helper function to find country by centroid coordinates with tolerance
        function findCountryByLocation(countries, targetLon, targetLat, tolerance = 3) {
          let bestMatch = null
          let minDistance = Infinity
          
          countries.forEach(function(country) {
            try {
              const centroid = d3.geoCentroid(country)
              // Calculate distance considering longitude wrapping
              let lonDiff = Math.abs(centroid[0] - targetLon)
              if (lonDiff > 180) lonDiff = 360 - lonDiff
              const latDiff = Math.abs(centroid[1] - targetLat)
              const distance = Math.sqrt(lonDiff * lonDiff + latDiff * latDiff)
              
              if (distance < minDistance && distance < tolerance) {
                minDistance = distance
                bestMatch = country
              }
            } catch (e) {
              // Skip countries with invalid centroids
            }
          })
          
          return bestMatch
        }
        
        // Find all target countries and preserve their names
        const targetCountries = []
        const targetCountryIds = new Set() // Store identifiers for matching
        
        targetLocations.forEach(loc => {
          const country = findCountryByLocation(allCountries, loc.lon, loc.lat)
          if (country) {
            try {
              const centroid = d3.geoCentroid(country)
              // Create a unique identifier based on rounded centroid coordinates
              const id = `${Math.round(centroid[0] * 10) / 10},${Math.round(centroid[1] * 10) / 10}`
              country._name = loc.name // Store the name for display
              country._id = id // Store identifier for matching
              country._targetIndex = targetCountries.length // Store index for reference
              targetCountries.push(country)
              targetCountryIds.add(id)
              console.log('Found:', loc.name, 'at', loc.lon, loc.lat, 'id:', id)
            } catch (e) {
              console.warn('Error processing country:', loc.name, e)
            }
          } else {
            console.warn('Could not find:', loc.name)
          }
        })
        
        console.log('Found', targetCountries.length, 'out of', targetLocations.length, 'target countries')
        
        // Use all countries for rendering, but only target countries for animation
        const countries = allCountries
        
        // Add identifiers to all countries for matching
        countries.forEach(function(country) {
          try {
            const centroid = d3.geoCentroid(country)
            country._id = `${Math.round(centroid[0] * 10) / 10},${Math.round(centroid[1] * 10) / 10}`
          } catch (e) {
            // Skip if can't get centroid
            country._id = null
          }
        })
        
        let i = -1
        const n = targetCountries.length
        let currentHighlightId = null // Track currently highlighted country
        let currentCountryData = null // Track current country for text positioning

        // Setup front hemisphere
        projection.clipAngle(90)

        const country = svg.selectAll('.country')
          .data(countries)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('data-country-id', d => d._id || '')
          .attr('d', path)
          .style('fill', '#737368')

        // Calculate responsive font size
        const isMobile = window.innerWidth < 768
        const fontSize = isMobile ? '14px' : '18px'
        
        const title = svg.append('text')
          .attr('class', 'country-title')
          .style('text-anchor', 'middle')
          .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
          .style('font-size', fontSize)
          .style('font-weight', 'bold')
          .style('fill', '#000')
          .style('pointer-events', 'none')
          .style('opacity', 0)
          .text('')

        // Animation step function - optimized and smooth
        function step() {
          // Clear any pending timeouts to prevent stuck states
          if (stepTimeoutRef.current) {
            clearTimeout(stepTimeoutRef.current)
            stepTimeoutRef.current = null
          }

          if (!isMountedRef.current) {
            console.log('Component unmounted, stopping animation')
            return
          }
          
          i = (i + 1) % n
          const currentCountry = targetCountries[i]
          
          if (!currentCountry) {
            stepTimeoutRef.current = setTimeout(step, 2000)
            return
          }

          // Store country info for later use
          const countryName = currentCountry._name || 'Country'
          const currentCountryId = currentCountry._id
          currentCountryData = currentCountry // Store for updateGlobe function
          console.log('Rotating to:', countryName, 'Index:', i, 'ID:', currentCountryId)

          // Get centroid for rotation
          let point
          try {
            point = d3.geoCentroid(currentCountry)
          } catch (e) {
            console.warn('Error getting centroid:', e)
            stepTimeoutRef.current = setTimeout(step, 2000)
            return
          }

          // Set up rotation interpolation
          const currentRotate = projection.rotate()
          const targetRotate = [-point[0], -point[1]]
          console.log('Rotating from', currentRotate, 'to', targetRotate, 'for', countryName)
          
          // Initialize the interpolator
          const interpolator = rotate.source(currentRotate).target(targetRotate)
          interpolator.distance() // Calculate distance

          // Function to update the globe paths
          function updateGlobe(rotation) {
            if (!isMountedRef.current) return
            
            // Update projection rotation
            projection.rotate(rotation)
            
            // Update front hemisphere (visible side)
            projection.clipAngle(90)
            country.attr('d', path)
            
            // Keep all countries in default color during rotation (no highlighting yet)
            country.style('fill', '#737368')
            
            // Hide text during rotation
            title.style('opacity', 0)
          }

          // Create rotation animation using a selection-based transition
          // Use the country element as a driver for the transition
          const countryElement = svg.select('path.country')
          if (!countryElement.node()) {
            console.warn('Country element not found, skipping rotation')
            stepTimeoutRef.current = setTimeout(step, 2000)
            return
          }
          
          // Clear any existing transitions to prevent conflicts
          countryElement.interrupt()
          title.interrupt()
          
          const countryTransition = countryElement
            .transition()
            .delay(100)
            .duration(2000) // Smoother, longer rotation
            .ease(d3.easeCubicInOut)

          countryTransition.tween('rotate', function() {
            return function(t) {
              if (!isMountedRef.current) return
              
              // Interpolate rotation using the great arc interpolator
              const newRotate = interpolator(t)
              updateGlobe(newRotate)
            }
          })

          // After rotation completes, wait 3 seconds, then highlight and show name
          countryTransition
            .end()
            .then(function() {
              console.log('Rotation completed for', countryName)
              if (!isMountedRef.current) return
              
              // Wait 3 seconds before highlighting
              stepTimeoutRef.current = setTimeout(() => {
                if (!isMountedRef.current) return
                
                // Update highlight tracker
                currentHighlightId = currentCountryId
                
                // Get centroid for text positioning
                let textPoint
                try {
                  textPoint = d3.geoCentroid(currentCountry)
                } catch (e) {
                  console.warn('Error getting centroid for text:', e)
                  textPoint = null
                }
                
                // Highlight the country
                country
                  .transition()
                  .duration(400)
                  .ease(d3.easeCubicOut)
                  .style('fill', function() {
                    const countryId = d3.select(this).attr('data-country-id')
                    return countryId === currentCountryId ? '#A6033F' : '#737368'
                  })
                
                // Show country name - always display when highlighted
                if (textPoint) {
                  const projectedPoint = projection(textPoint)
                  if (projectedPoint) {
                    // Position and show the country name
                    title
                      .attr('x', projectedPoint[0])
                      .attr('y', projectedPoint[1] - 15)
                      .text(countryName)
                      .transition()
                      .duration(400)
                      .ease(d3.easeCubicOut)
                      .style('opacity', 1)
                  }
                }
                
                // After showing name for 2.5 seconds, fade away and move to next
                stepTimeoutRef.current = setTimeout(() => {
                  if (!isMountedRef.current) return
                  
                  // Fade away highlight
                  country
                    .transition()
                    .duration(500)
                    .ease(d3.easeCubicIn)
                    .style('fill', '#737368')
                  
                  // Fade away text
                  title
                    .transition()
                    .duration(500)
                    .ease(d3.easeCubicIn)
                    .style('opacity', 0)
                    .end()
                    .then(() => {
                      // Clear highlight tracker
                      currentHighlightId = null
                      
                      // Move to next country
                      if (isMountedRef.current) {
                        step()
                      }
                    })
                    .catch(() => {
                      // If transition fails, still move to next
                      currentHighlightId = null
                      if (isMountedRef.current) {
                        step()
                      }
                    })
                }, 2500) // Show name for 2.5 seconds before fading
              }, 3000) // Wait 3 seconds after rotation completes
            })
            .catch(function(err) {
              console.warn('Transition error:', err)
              // Transition was interrupted, try again after delay
              if (isMountedRef.current) {
                stepTimeoutRef.current = setTimeout(step, 2000)
              }
            })
        }

        // Start animation immediately
        setTimeout(() => {
          if (isMountedRef.current) {
            isInitializingRef.current = false
            step()
          } else {
            isInitializingRef.current = false
          }
        }, 500)
      })
      .catch(function(error) {
        console.error('Error loading world map:', error)
        isInitializingRef.current = false
      })

    return () => {
      isMountedRef.current = false
      isInitializingRef.current = false
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current)
        stepTimeoutRef.current = null
      }
      // Clear all SVG content and stop transitions
      const svg = d3.select(svgRef.current)
      if (svg.node()) {
        svg.selectAll('*').interrupt().remove()
      }
    }
  }, [width, height])

  return (
    <div ref={containerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  )
}

export default Globe3D

