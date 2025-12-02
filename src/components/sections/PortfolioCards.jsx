import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PortfolioCards() {
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = [
    {
      id: 1,
      title: 'TRADE CENTRE',
      description: 'TRADE CENTRE IS A MAIN LAND IN THE MALDIVES SRI LANKA AND THE HAWAI ISLANDS.',
      link: '/project-1',
      gradient: 'linear-gradient(45deg, rgb(45, 53, 235) 0%, rgb(144, 78, 212) 100%)',
    },
    {
      id: 2,
      title: 'INTERIOR DESIGN STUDIO',
      description: 'A MODERN INTERIOR DESIGN STUDIO SPECIALIZING IN LUXURY RESIDENTIAL AND COMMERCIAL SPACES.',
      link: '/project-2',
      gradient: 'linear-gradient(45deg, rgb(45, 53, 235) 0%, rgb(253, 187, 45) 100%)',
    },
    {
      id: 3,
      title: 'HOME SECURITY CAMERA',
      description: 'ADVANCED HOME SECURITY SOLUTIONS WITH AI-POWERED MONITORING AND REAL-TIME ALERTS.',
      link: '/project-3',
      gradient: 'linear-gradient(45deg, rgb(253, 187, 45) 0%, rgb(144, 78, 212) 100%)',
    },
    {
      id: 4,
      title: 'KEMIA HONEST SKINCARE',
      description: 'NATURAL AND ORGANIC SKINCARE PRODUCTS MADE WITH PREMIUM INGREDIENTS FOR HEALTHY GLOWING SKIN.',
      link: '/project-4',
      gradient: 'linear-gradient(45deg, rgb(45, 53, 235) 0%, rgb(34, 193, 195) 100%)',
    },
    {
      id: 5,
      title: 'CASCADE OF LAVA',
      description: 'AN IMMERSIVE DIGITAL EXPERIENCE SHOWCASING THE RAW POWER AND BEAUTY OF VOLCANIC FORMATIONS.',
      link: '/project-5',
      gradient: 'linear-gradient(45deg, rgb(34, 193, 195) 0%, rgb(144, 78, 212) 100%)',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [projects.length])

  const getCardStyle = (index) => {
    const position = index - activeIndex
    const isActive = position === 0

    let transform = ''
    let opacity = 1
    let filter = 'none'
    let scale = 1
    let zIndex = 5

    if (position === -2) {
      transform = 'translateX(-70%)'
      scale = 0.8
      opacity = 0.4
      filter = 'blur(3px) grayscale(20%)'
      zIndex = 3
    } else if (position === -1) {
      transform = 'translateX(-40%)'
      scale = 0.9
      opacity = 0.7
      filter = 'blur(1px) grayscale(10%)'
      zIndex = 4
    } else if (position === 0) {
      transform = ''
      scale = 1
      opacity = 1
      filter = 'none'
      zIndex = 5
    } else if (position === 1) {
      transform = 'translateX(40%)'
      scale = 0.9
      opacity = 0.7
      filter = 'blur(1px) grayscale(10%)'
      zIndex = 4
    } else if (position === 2) {
      transform = 'translateX(70%)'
      scale = 0.8
      opacity = 0.4
      filter = 'blur(3px) grayscale(20%)'
      zIndex = 3
    }

    return {
      width: '250px',
      height: '400px',
      borderRadius: '20px',
      boxShadow: 'rgba(50, 50, 50, 0.5) 0px 4px 16px',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: '0.3s ease-in',
      transformOrigin: 'center center',
      transform: `${transform} scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      filter: filter,
      background: projects[index].gradient,
      cursor: 'pointer',
      padding: '20px',
    }
  }

  return (
    <section className="mil-portfolio-cards-section" style={{ 
      position: 'relative', 
      padding: '120px 0',
      overflow: 'hidden',
      background: '#fff'
    }}>
      <div className="container">
        <div className="mil-about-photo mil-mb-90">
          <div className="mil-lines-place"></div>
          <div className="mil-up" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              
              <div 
                className="rotated-carousel-wrapper" 
                style={{
                  width: '600px',
                  height: '600px',
                  transform: 'rotate(-90deg)',
                  perspective: '1000px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ul 
                  className="rotated-carousel-list" 
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    margin: '0px',
                    padding: '0px',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '500px'
                  }}
                >
                  {projects.map((project, index) => {
                    const position = index - activeIndex
                    const isActive = position === 0

                    return (
                      <li
                        key={project.id}
                        role="button"
                        aria-pressed={isActive}
                        data-pos={position}
                        className="rotated-carousel-item"
                        onClick={() => setActiveIndex(index)}
                        style={getCardStyle(index)}
                      >
                        {isActive ? (
                          
                          <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            transform: 'rotate(90deg)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                          }}>
                            <div 
                              className="rounded-[2.1rem] h-[22.6rem] w-[35.9rem] relative bg-[#ff2424]"
                              style={{
                                borderRadius: '2.1rem',
                                height: '22.6rem',
                                width: '35.9rem',
                                position: 'relative',
                                background: '#ff2424'
                              }}
                            >
                              <h2 
                                className="absolute left-28 top-[1.3rem]"
                                style={{
                                  textAlign: 'left',
                                  position: 'absolute',
                                  left: '7rem',
                                  top: '1.3rem',
                                  color: 'white',
                                  fontFamily: 'Arial, sans-serif',
                                  fontSize: '20px',
                                  fontWeight: 'bold',
                                  margin: 0
                                }}
                              >
                                {project.title}
                              </h2>

                              <p 
                                className="absolute left-28 top-[6.1rem]"
                                style={{
                                  textAlign: 'left',
                                  position: 'absolute',
                                  left: '7rem',
                                  top: '6.1rem',
                                  color: 'white',
                                  fontFamily: 'Arial, sans-serif',
                                  fontSize: '12px',
                                  lineHeight: '1.4',
                                  opacity: 0.9,
                                  margin: 0
                                }}
                              >
                                {project.description}
                              </p>

                              <div 
                                className="absolute left-28 top-[10.9rem]"
                                style={{
                                  textAlign: 'left',
                                  position: 'absolute',
                                  left: '7rem',
                                  top: '10.9rem',
                                  color: 'white',
                                  fontFamily: 'Arial, sans-serif',
                                  fontSize: '14px',
                                  fontWeight: 'bold',
                                  margin: 0,
                                  padding: 0
                                }}
                              >
                                <Link 
                                  to={project.link}
                                  style={{
                                    color: 'white',
                                    textDecoration: 'none'
                                  }}
                                >
                                  VIEW PROJECT
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          
                          <div style={{
                            transform: 'rotate(90deg)',
                            fontSize: '48px',
                            color: 'rgb(255, 255, 255)',
                            fontFamily: 'Arial',
                            fontWeight: 'bold'
                          }}>
                            {project.id}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

       
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '60px',
          zIndex: 200,
          position: 'relative'
        }}>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: index === activeIndex ? '40px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                background: index === activeIndex ? '#ff2424' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioCards
