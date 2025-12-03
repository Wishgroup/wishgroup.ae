import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'

function Globe3D({ width = 500, height = 500 }) {
  const svgRef = useRef(null)
  const isMountedRef = useRef(true)
  const stepTimeoutRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true
    const svg = d3.select(svgRef.current)
    if (!svg.node()) return
    
    svg.selectAll('*').remove()

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
      .world-outline {
        fill: none;
        stroke: rgba(0, 0, 0, 0.1);
        stroke-width: 1.0px;
      }
      .back-country {
        fill: #dadac4;
        stroke: #fff;
        stroke-width: 0.0px;
        stroke-linejoin: round;
      }
      .back-line {
        fill: none;
        stroke: #000;
        stroke-opacity: .05;
        stroke-width: .5px;
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

    // World outline circle
    svg.append('circle')
      .attr('class', 'world-outline')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())

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
        if (!isMountedRef.current) return
        
        const countries = topojson.feature(world, world.objects.countries).features
        let i = -1
        const n = countries.length

        // Setup back hemisphere
        projection.clipAngle(180)

        const backLine = svg.append('path')
          .datum(graticule)
          .attr('class', 'back-line')
          .attr('d', path)

        const backCountry = svg.selectAll('.back-country')
          .data(countries)
          .enter()
          .insert('path', '.back-line')
          .attr('class', 'back-country')
          .attr('d', path)

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
          .attr('d', path)

        const title = svg.append('text')
          .attr('x', width / 2)
          .attr('y', height * 3 / 5)

        // Animation step function
        function step() {
          if (!isMountedRef.current) {
            console.log('Component unmounted, stopping animation')
            return
          }
          
          i = (i + 1) % n
          const currentCountry = countries[i]
          
          if (!currentCountry) {
            stepTimeoutRef.current = setTimeout(step, 2000)
            return
          }

          // Highlight country
          country
            .transition()
            .duration(300)
            .style('fill', function(d, j) { 
              return j === i ? 'red' : '#737368' 
            })

          // Get centroid
          let point
          try {
            point = d3.geoCentroid(currentCountry)
          } catch (e) {
            console.warn('Error getting centroid:', e)
            stepTimeoutRef.current = setTimeout(step, 2000)
            return
          }

          const currentRotate = projection.rotate()
          rotate.source(currentRotate).target([-point[0], -point[1]]).distance()

          // Create and run animation - using original pattern with chained transitions
          d3.transition()
            .delay(250)
            .duration(1250)
            .tween('rotate', function() {
              return function(progress) {
                if (!isMountedRef.current) return
                const newRotate = rotate(progress)
                
                // Update back hemisphere
                projection.rotate(newRotate).clipAngle(180)
                backCountry.attr('d', path)
                backLine.attr('d', path)
                
                // Update front hemisphere
                projection.rotate(newRotate).clipAngle(90)
                country.attr('d', path)
                line.attr('d', path)
              }
            })
            .transition()
            .on('end', step)
        }

        // Start animation immediately
        setTimeout(() => {
          if (isMountedRef.current) {
            step()
          }
        }, 500)
      })
      .catch(function(error) {
        console.error('Error loading world map:', error)
      })

    return () => {
      isMountedRef.current = false
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current)
      }
    }
  }, [width, height])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
    />
  )
}

export default Globe3D

