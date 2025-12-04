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

    const graticule = d3.geoGraticule()
      .extent([[-180, -90], [180 - 0.1, 90 - 0.1]])

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
      .line {
        fill: none;
        stroke: #000;
        stroke-opacity: .08;
        stroke-width: .5px;
      }
      text {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        text-anchor: middle;
      }
    `)

    // Create outer and inner spheres with synchronized timing
    const outerRadius = projection.scale()
    const innerRadius = outerRadius * 0.85 // Inner sphere is 85% of outer
    
    svg.selectAll('circle.world-outline-outer').remove()
    svg.selectAll('circle.world-outline-inner').remove()
    
    const outerSphere = svg.append('circle')
      .attr('class', 'world-outline-outer')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', outerRadius)
    
    const innerSphere = svg.append('circle')
      .attr('class', 'world-outline-inner')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', innerRadius)

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

        const line = svg.append('path')
          .datum(graticule)
          .attr('class', 'line')
          .attr('d', path)

        const country = svg.selectAll('.country')
          .data(countries)
          .enter()
          .insert('path', '.line')
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
          .style('fill', '#333')
          .style('pointer-events', 'none')
          .style('opacity', 0)
          .text('')

        // Animation step function
        function step() {
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

          // Update country name text immediately
          const countryName = currentCountry._name || 'Country'
          const currentCountryId = currentCountry._id
          currentHighlightId = currentCountryId // Update the highlight tracker
          currentCountryData = currentCountry // Store for updateGlobe function
          console.log('Highlighting:', countryName, 'Index:', i, 'ID:', currentCountryId)
          
          // Get centroid for text positioning
          let textPoint
          try {
            textPoint = d3.geoCentroid(currentCountry)
          } catch (e) {
            console.warn('Error getting centroid for text:', e)
            textPoint = null
          }
          
          if (textPoint) {
            const projectedPoint = projection(textPoint)
            if (projectedPoint) {
              title
                .transition()
                .duration(200)
                .style('opacity', 0)
                .transition()
                .duration(200)
                .attr('x', projectedPoint[0])
                .attr('y', projectedPoint[1] - 15) // Offset above the country
                .text(countryName)
                .style('opacity', 1)
            }
          }

          // Highlight country - match by data attribute
          country
            .transition()
            .duration(300)
            .style('fill', function() {
              // Match by comparing the data attribute
              const countryId = d3.select(this).attr('data-country-id')
              return countryId === currentCountryId ? '#A6033F' : '#737368'
            })

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
            line.attr('d', path)
            
            // Maintain highlight during rotation
            country.style('fill', function() {
              const countryId = d3.select(this).attr('data-country-id')
              return countryId === currentHighlightId ? '#A6033F' : '#737368'
            })
            
            // Update text position to follow the country
            if (currentCountryData && currentHighlightId) {
              try {
                const textPoint = d3.geoCentroid(currentCountryData)
                const projectedPoint = projection(textPoint)
                if (projectedPoint) {
                  // Check if point is visible (within the front hemisphere)
                  const textDistance = Math.sqrt(
                    Math.pow(projectedPoint[0] - width / 2, 2) + 
                    Math.pow(projectedPoint[1] - height / 2, 2)
                  )
                  const radius = projection.scale()
                  
                  if (textDistance <= radius) {
                    title
                      .attr('x', projectedPoint[0])
                      .attr('y', projectedPoint[1] - 15)
                      .style('opacity', 1)
                  } else {
                    title.style('opacity', 0)
                  }
                } else {
                  title.style('opacity', 0)
                }
              } catch (e) {
                // Silently handle errors
                title.style('opacity', 0)
              }
            }
          }

          // Create rotation animation using synchronized transitions for both spheres
          // Use the outer sphere as the primary driver for synchronized timing
          const outerSphereElement = svg.select('circle.world-outline-outer')
          const innerSphereElement = svg.select('circle.world-outline-inner')
          
          if (!outerSphereElement.node() || !innerSphereElement.node()) {
            console.warn('Sphere elements not found, skipping rotation')
            stepTimeoutRef.current = setTimeout(step, 2000)
            return
          }
          
          // Create synchronized transitions for both spheres with identical timing
          const transitionDelay = 250
          const transitionDuration = 1500
          const transitionEase = d3.easeCubicInOut
          
          // Both spheres use the same transition timing for perfect synchronization
          const outerTransition = outerSphereElement
            .transition()
            .delay(transitionDelay)
            .duration(transitionDuration)
            .ease(transitionEase)
          
          // Inner sphere transition with identical timing parameters
          innerSphereElement
            .transition()
            .delay(transitionDelay)
            .duration(transitionDuration)
            .ease(transitionEase)

          // Single tween function shared by both spheres to ensure synchronized rotation
          const rotationTween = function() {
            return function(t) {
              if (!isMountedRef.current) return
              
              // Interpolate rotation using the great arc interpolator
              const newRotate = interpolator(t)
              updateGlobe(newRotate)
            }
          }
          
          // Apply the same tween to both transitions for perfect synchronization
          outerTransition.tween('rotate', rotationTween)

          // Continue to next country after rotation completes (use outer transition as reference)
          outerTransition
            .end()
            .then(function() {
              console.log('Rotation completed for', countryName)
              if (isMountedRef.current) {
                step()
              }
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

