import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORLD_TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const THEME_PRIMARY = '#A6033F'
const WORLD_NEUTRAL = '#dfe5eb'

// Target countries to display and rotate through
const TARGET_COUNTRIES = [
  'United Arab Emirates', // UAE
  'Sri Lanka',
  'Maldives',
  'Malaysia',
  'Ghana',
  'South Africa',
  'United Kingdom' // UK
]

// ISO codes as fallback
const TARGET_COUNTRY_CODES = {
  'ARE': 'United Arab Emirates',
  'LKA': 'Sri Lanka',
  'MDV': 'Maldives',
  'MYS': 'Malaysia',
  'GHA': 'Ghana',
  'ZAF': 'South Africa',
  'GBR': 'United Kingdom'
}

function IntroSection() {
  const textRef = useRef(null)
  const globeRef = useRef(null)
  const sectionRef = useRef(null)
  const [shouldRenderGlobe, setShouldRenderGlobe] = useState(false)

  useEffect(() => {
    // Animate text elements
    if (textRef.current) {
      const textElements = textRef.current.querySelectorAll('.mil-up')
      textElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === textRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const isSmallScreen = window.innerWidth < 900

    if (prefersReduced || isSmallScreen) {
      setShouldRenderGlobe(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRenderGlobe(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2, rootMargin: '180px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldRenderGlobe) return

    const container = globeRef.current
    if (!container) return

    // Clear any existing SVG when remounting
    d3.select(container).selectAll('*').remove()

    const width = Math.min(container.clientWidth || 520, 540)
    const height = width

    const projection = d3.geoOrthographic()
      .scale(height / 2.05)
      .translate([width / 2, height / 2])

    const path = d3.geoPath(projection)
    const graticule = d3.geoGraticule().extent([[-180, -90], [180 - 0.1, 90 - 0.1]])

    const svg = d3.select(container)
      .append('svg')
      .attr('class', 'world-globe-svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')

    svg.append('circle')
      .attr('class', 'world-outline')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())

    let backCountry = null
    let backLine = null
    let country = null
    let line = null
    let countryLabel = null
    let countries = []
    let currentHighlightedCountry = null
    let isUnmounted = false

    const updatePaths = () => {
      projection.clipAngle(180)
      if (backCountry) backCountry.attr('d', path)
      if (backLine) backLine.attr('d', path)

      projection.clipAngle(90)
      if (country) country.attr('d', path)
      if (line) line.attr('d', path)
      
      // Update label position if there's a highlighted country
      if (countryLabel && currentHighlightedCountry) {
        const centroid = path.centroid(currentHighlightedCountry)
        if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
          countryLabel
            .attr('x', centroid[0])
            .attr('y', centroid[1] - 15)
            .style('opacity', 1)
        } else {
          countryLabel.style('opacity', 0)
        }
      }
    }

    const highlightCountry = (index) => {
      if (!country || !countries.length) return
      const targetCountry = countries[index]
      currentHighlightedCountry = targetCountry
      const targetId = targetCountry?.id
      const targetName = targetCountry?.properties?.NAME || targetCountry?.properties?.name || targetCountry?.properties?.NAME_LONG
      
      // Get display name (use short name if available)
      const displayName = TARGET_COUNTRY_CODES[targetId] || targetName || 'Unknown'
      
      country.style('fill', (d) => {
        const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_LONG || ''
        const countryId = d.id
        
        // Check if target country
        const isTarget = TARGET_COUNTRY_CODES[countryId] !== undefined || 
                        TARGET_COUNTRIES.some(target => target.toLowerCase() === countryName.toLowerCase())
        
        if (!isTarget) {
          return 'transparent' // Hide non-target countries
        }
        
        // Check if this is the currently highlighted country
        const isHighlighted = (countryId === targetId) || 
                              (countryName.toLowerCase() === targetName?.toLowerCase())
        
        return isHighlighted ? THEME_PRIMARY : WORLD_NEUTRAL
      })
      
      // Update country label text
      if (countryLabel) {
        countryLabel.text(displayName)
        // Position will be updated in updatePaths()
        updatePaths()
      }
    }

    const spinTo = (index) => {
      if (!countries.length || isUnmounted) return

      const target = d3.geoCentroid(countries[index])
      const rotateInterpolator = d3.interpolate(projection.rotate(), [-target[0], -target[1]])

      d3.transition()
        .duration(2250)
        .ease(d3.easeCubicInOut)
        .tween('rotate', () => (t) => {
          projection.rotate(rotateInterpolator(t))
          updatePaths()
        })
        .on('start', () => {
          highlightCountry(index)
        })
        .on('end', () => {
          if (!isUnmounted) {
            spinTo((index + 1) % countries.length)
          }
        })
    }

    const controller = new AbortController()

    d3.json(WORLD_TOPO_URL, { signal: controller.signal })
      .then((worldData) => {
        if (!worldData || isUnmounted) return

        const allCountries = feature(worldData, worldData.objects.countries).features
        
        // Helper function to check if a country matches our targets
        const isTargetCountry = (d) => {
          const countryName = d.properties?.NAME || d.properties?.name || d.properties?.NAME_LONG || ''
          const countryId = d.id
          
          // Check by ISO code first (most reliable)
          if (TARGET_COUNTRY_CODES[countryId]) {
            return true
          }
          
          // Check by name (case-insensitive)
          const nameLower = countryName.toLowerCase()
          return TARGET_COUNTRIES.some(target => target.toLowerCase() === nameLower)
        }
        
        // Filter to only target countries
        countries = allCountries.filter(isTargetCountry)

        if (countries.length === 0) {
          console.warn('No target countries found in world data. Available countries:', 
            allCountries.slice(0, 10).map(d => ({ id: d.id, name: d.properties?.NAME || d.properties?.name })))
          return
        }

        projection.clipAngle(180)
        backLine = svg.append('path')
          .datum(graticule())
          .attr('class', 'back-line')
          .attr('d', path)

        // Render all countries but make non-target ones transparent
        backCountry = svg.append('g')
          .selectAll('path')
          .data(allCountries)
          .join('path')
          .attr('class', 'back-country')
          .attr('d', path)
          .style('fill', WORLD_NEUTRAL)

        projection.clipAngle(90)
        line = svg.append('path')
          .datum(graticule())
          .attr('class', 'line')
          .attr('d', path)

        // Render all countries but make non-target ones transparent
        country = svg.append('g')
          .selectAll('path')
          .data(allCountries)
          .join('path')
          .attr('class', 'country')
          .attr('d', path)
          .style('fill', WORLD_NEUTRAL)

        // Create country label text element
        countryLabel = svg.append('text')
          .attr('class', 'country-label')
          .attr('text-anchor', 'middle')
          .attr('dy', '-10')
          .style('font-size', '16px')
          .style('font-weight', '600')
          .style('fill', THEME_PRIMARY)
          .style('opacity', 0)
          .style('pointer-events', 'none')
          .style('font-family', 'Outfit, sans-serif')

        spinTo(0)
      })
      .catch(() => {
        // Fail silently if the globe data cannot be loaded
      })

    return () => {
      isUnmounted = true
      controller.abort()
      d3.select(container).selectAll('*').interrupt().remove()
    }
  }, [shouldRenderGlobe])

  return (
    <section className="mil-intro-section mil-p-120-0" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center" ref={textRef}>
          <div className="col-lg-8 col-xl-7 text-center mil-mb-60">
            <h2 className="mil-up mil-mb-30 welcome-title">Welcome to Our World</h2>
            <p className="mil-up mil-mb-40 mil-text-lg">
              We create exceptional experiences that transform ideas into reality.
              Our passion for innovation drives everything we do.
            </p>
            <p className="mil-up mil-text-sm">
              Explore the communities and partnerships we support across the globe.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div ref={globeRef} className="world-globe-container" aria-hidden="true">
              {!shouldRenderGlobe && (
                <div
                  style={{
                    width: '100%',
                    paddingBottom: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #1b3f66, #0f1f36 65%)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: 'radial-gradient(circle at 70% 60%, rgba(255,255,255,0.12), rgba(255,255,255,0))',
                      filter: 'blur(8px)',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection

