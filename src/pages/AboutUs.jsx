import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function AboutUs() {
  useScrollAnimations()
  const [activeIndex, setActiveIndex] = useState(0)
  const [flowerPosition, setFlowerPosition] = useState(0)
  const timelineRef = useRef(null)
  const milestonesRef = useRef([])

  const values = [
    {
      title: 'Respect',
      description: 'We treat everyone with dignity and respect, valuing diverse perspectives and fostering an inclusive environment where all voices are heard and appreciated.'
    },
    {
      title: 'Service',
      description: 'We are committed to serving our clients, partners, and communities with dedication, going above and beyond to deliver exceptional value and support.'
    },
    {
      title: 'Integrity',
      description: 'We conduct our business with the highest ethical standards, ensuring transparency and honesty in all our dealings.'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, continuously improving our processes and delivering superior quality.'
    }
  ]

  const visionaries = [
    {
      name: 'Leadership Team',
      role: 'Strategic Vision',
      description: 'Our leadership team brings decades of combined experience in international trade, business development, and strategic planning.'
    },
    {
      name: 'Expert Advisors',
      role: 'Industry Expertise',
      description: 'Our advisory board consists of industry veterans who provide invaluable insights and guidance for our growth.'
    },
    {
      name: 'Global Network',
      role: 'Worldwide Reach',
      description: 'We leverage our extensive global network to connect markets and create opportunities across continents.'
    }
  ]

  // Scroll tracking for timeline animation
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!timelineRef.current) {
            ticking = false
            return
          }

          const timeline = timelineRef.current
          const timelineRect = timeline.getBoundingClientRect()
          const timelineTop = timelineRect.top + window.scrollY
          const timelineHeight = timelineRect.height
          const viewportCenter = window.scrollY + window.innerHeight / 2

          // Calculate relative position within timeline
          const relativePosition = viewportCenter - timelineTop
          const percentage = Math.max(0, Math.min(100, (relativePosition / timelineHeight) * 100))

          // Update flower position (clamped to timeline bounds)
          const clampedPosition = Math.max(20, Math.min(timelineHeight - 20, (percentage / 100) * timelineHeight))
          setFlowerPosition(clampedPosition)

          // Find active milestone based on scroll position
          const milestones = milestonesRef.current
          if (milestones && milestones.length > 0) {
            let activeIdx = 0
            let minDistance = Infinity

            milestones.forEach((milestone, idx) => {
              const milestoneRect = milestone.getBoundingClientRect()
              const milestoneCenter = milestoneRect.top + window.scrollY + milestoneRect.height / 2
              const distance = Math.abs(viewportCenter - milestoneCenter)

              if (distance < minDistance) {
                minDistance = distance
                activeIdx = idx
              }
            })

            // Use percentage as additional check
            if (relativePosition >= 0 && relativePosition <= timelineHeight) {
              const percentageBasedIndex = Math.round((percentage / 100) * (milestones.length - 1))
              if (percentageBasedIndex >= 0 && percentageBasedIndex < milestones.length) {
                const percentageDistance = Math.abs(percentage - (percentageBasedIndex / (milestones.length - 1)) * 100)
                if (percentageDistance < 20) {
                  activeIdx = percentageBasedIndex
                }
              }
            }

            setActiveIndex(Math.max(0, Math.min(milestones.length - 1, activeIdx)))
          }

          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Banner Section */}
      <div className="mil-inner-banner mil-p-0-120">
        <div className="mil-banner-content mil-up">
          <div className="mil-animation-frame">
            <div className="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="6" data-value-2="1.4"></div>
          </div>
          <div className="container">
            <ul className="mil-breadcrumbs mil-mb-60">
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>About Us</li>
            </ul>
            {/* <h1 className="mil-mb-60">
              About <span className="mil-thin">Us</span>
            </h1>
            <p className="mil-text mil-up" style={{ maxWidth: '600px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8 }}>
              Discover our journey, values, and the vision that drives us forward in creating meaningful impact across global markets.
            </p> */}
          </div>
        </div>
      </div>

      {/* History Section - Horizontal Timeline */}
      <section id="history" className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>FROM ASPIRATION TO GLOBAL FOUNDATION</span>
            <h2 className="mil-up mil-mb-60">
              Our <span className="mil-thin">History</span>
            </h2>
            <p className="mil-text mil-up" style={{ 
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              fontStyle: 'italic'
            }}>
              The journey of Wish Group is not just a corporate timeline; it is a story of how a single aspiration was nurtured and allowed to flourish. It is the history of purposeful steps taken to ensure that capital is always connected with compassion.Our story began not with a ledger, but with a vision of possibility—a belief that global connections could be built on shared human values.
            </p>
          </div>

          {/* Vertical Timeline Container */}
          <div 
            ref={timelineRef}
            style={{
              position: 'relative',
              padding: '20px 0',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {/* Vertical Timeline Line - Center */}
            <div style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '5px',
              background: 'rgba(166, 3, 63, 0.25)',
              zIndex: 1
            }} />

            {/* Animated Flower - Moves along timeline */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: `${flowerPosition}px`,
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              zIndex: 5,
              transition: 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              dropShadow: '0 4px 12px rgba(166, 3, 63, 0.4)'
            }}>
              <img 
                src="/img/flower/Dandelion.png" 
                alt="Dandelion" 
                className="floating-flower"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(166, 3, 63, 0.4))'
                }}
              />
            </div>

            {/* Timeline Items Container */}
            <div 
              ref={(el) => {
                if (el) milestonesRef.current = Array.from(el.children)
              }}
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
              }}
            >
              {[
                {
                  year: '2012',
                  title: 'The Founding Aspiration',
                  description: 'The concept was first planted in Sri Lanka: an intent to create a new kind of global enterprise, rooted in long-term human impact.'
                },
                {
                  year: '2014',
                  title: 'The First Seeds of Growth',
                  description: 'The first trading operations began, establishing the foundational pathways for global resource exchange—always prioritizing ethical sourcing and reliable partnerships.'
                },
                {
                  year: '2017',
                  title: 'A Home for the Vision',
                  description: 'The vision found its global launchpad with the official registration and expansion into the United Arab Emirates. This marked our commitment to the Middle East as a central hub for cross-continental connection.'
                },
                {
                  year: '2019',
                  title: 'Building the Future, Sustainably',
                  description: 'We began transforming our investment strategy into physical spaces, initiating mixed-use project development and major real estate ventures that focused on community and enduring value.'
                },
                {
                  year: '2021',
                  title: 'Pioneering Innovation',
                  description: 'Innovation took physical form with the launch of the Wish Island Project and the initiation of floating villa concepts—redefining aspirational living through sustainable engineering.'
                },
                {
                  year: '2023',
                  title: 'Expanding the Human Network',
                  description: 'The promise of opportunity was extended into Europe, while programs like the Wish I Club and Prime Bond were launched to solidify exclusive, trusted relationships with our growing global client base.'
                },
                {
                  year: 'Today',
                  title: 'Every Move Aligned',
                  description: 'As we look toward 2025 and beyond, we stand as a unified global force—a family of 20+ registered companies built on cross-continental partnerships and a deep commitment to social responsibility (CSR projects). Every year, every endeavor, and every new territory we enter is driven by a single, unwavering purpose: to fulfill the wish for a unified, more equitable global future.'
                }
              ].map((milestone, index) => {
                const isLeft = index % 2 === 0 // Alternate: even index = left, odd index = right
                return (
                  <div
                    key={index}
                    className="mil-up"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isLeft ? 'flex-end' : 'flex-start',
                      paddingRight: isLeft ? '0' : '50%',
                      paddingLeft: isLeft ? '50%' : '0'
                    }}
                  >

                    {/* Card Container */}
                    <div
                      style={{
                        width: 'calc(50% - 10px)',
                        maxWidth: '400px',
                        position: 'relative'
                      }}
                    >
                      {/* Minimal Card - Uniform Size */}
                      <div
                        className="timeline-card"
                        data-index={index}
                        style={{
                          position: 'relative',
                          width: '100%',
                          minHeight: '160px',
                          borderRadius: '12px',
                          background: activeIndex === index ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: activeIndex === index ? '2px solid rgba(166, 3, 63, 0.4)' : '1px solid rgba(133, 150, 166, 0.15)',
                          transition: 'all 0.4s ease',
                          padding: '20px',
                          cursor: 'default',
                          display: 'flex',
                          flexDirection: 'column',
                          transform: activeIndex === index ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                          boxShadow: activeIndex === index ? '0 12px 40px rgba(166, 3, 63, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.05)'
                        }}
                        onMouseEnter={(e) => {
                          if (activeIndex !== index) {
                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
                            e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.3)'
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeIndex !== index) {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)'
                            e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.15)'
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                          }
                        }}
                      >
                        {/* Minimal Year */}
                        <div style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#A6033F',
                          letterSpacing: '1.5px',
                          marginBottom: '10px',
                          textTransform: 'uppercase',
                          flexShrink: 0
                        }}>
                          {milestone.year}
                        </div>

                        {/* Minimal Title */}
                        <h3 style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#3C4C59',
                          margin: '0 0 8px 0',
                          lineHeight: '1.4',
                          flexShrink: 0
                        }}>
                          {milestone.title}
                        </h3>

                        {/* Minimal Description */}
                        <p style={{
                          fontSize: '12px',
                          lineHeight: '1.6',
                          color: '#3C4C59',
                          margin: 0,
                          opacity: 0.75,
                          flex: 1
                        }}>
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CSS Animations */}
          <style>{`
            @keyframes float {
              0%, 100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-8px) rotate(5deg);
              }
            }
            .floating-flower {
              animation: float 3s ease-in-out infinite;
            }
          `}</style>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section id="vision-mission" className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>OUR FOUNDATION</span>
            <h2 className="mil-up mil-mb-60">
              Vision & <span className="mil-thin">Mission</span>
            </h2>
          </div>

          <div className="row" style={{ gap: '40px', justifyContent: 'center' }}>
            {/* Vision Card */}
            <div className="col-12 col-lg-5" style={{ position: 'relative' }}>
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    width: '4px',
                    height: '40px',
                    background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                    borderRadius: '2px'
                  }} />
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#3C4C59',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    Our <span style={{ fontWeight: 300 }}>Vision</span>
                  </h3>
                </div>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  margin: 0,
                  opacity: 0.8,
                  textAlign: 'justify'
                }}>
                  To transform wishes into global opportunities.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="col-12 col-lg-5" style={{ position: 'relative' }}>
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    width: '4px',
                    height: '40px',
                    background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                    borderRadius: '2px'
                  }} />
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#3C4C59',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    Our <span style={{ fontWeight: 300 }}>Mission</span>
                  </h3>
                </div>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  margin: 0,
                  opacity: 0.8,
                  textAlign: 'justify'
                }}>
                  To be the most trusted partner for sustainable growth and human impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section id="values" className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>OUR PRINCIPLES</span>
            <h2 className="mil-up mil-mb-60">
              Our <span className="mil-thin">Values</span>
            </h2>
          </div>

          <div className="row" style={{ gap: '30px', justifyContent: 'center' }}>
            {values.map((value, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4" style={{ position: 'relative' }}>
                <div
                  className="mil-up"
                  style={{
                    position: 'relative',
                    height: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(133, 150, 166, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    padding: '40px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '40px',
                      background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                      borderRadius: '2px'
                    }} />
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#3C4C59',
                      margin: 0,
                      lineHeight: '1.2'
                    }}>
                      {value.title}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.7',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8
                  }}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/* Chairman's Message Section */}
       <section id="chairman-message" className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mil-mb-60">
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
                  letterSpacing: '4px',
                  fontSize: '11px',
                  opacity: 0.8
                }}>CHAIRMAN'S MESSAGE</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Chairman's <span className="mil-thin">Message</span>
                </h2>
                <p className="mil-text mil-up" style={{ 
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  fontStyle: 'italic',
                  marginBottom: '20px'
                }}>
                  "At Wish Group, we believe that success is not just measured by financial achievements, but by the positive impact we create in the lives of our stakeholders and the communities we serve. Our journey has been built on a foundation of integrity, excellence, and unwavering commitment to delivering value."
                </p>
                <p className="mil-text mil-up" style={{ 
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  fontStyle: 'italic'
                }}>
                  "As we continue to expand our global footprint, we remain dedicated to maintaining the highest standards of quality and ethics. Our vision extends beyond business growth—we are committed to building a legacy of sustainable success that benefits generations to come."
                </p>
                <div style={{
                  marginTop: '30px',
                  paddingTop: '30px',
                  borderTop: '1px solid rgba(133, 150, 166, 0.1)'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#A6033F',
                    marginBottom: '4px'
                  }}>Chairman</div>
                  <div style={{
                    fontSize: '12px',
                    color: '#8596A6',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>Wish Group</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mil-mb-60">
              <div className="mil-up" style={{ position: 'relative' }}>
                <img 
                  src="/Terrain/chairman.png" 
                  alt="Chairman" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CEO Message Section */}
      <section id="ceo-message" className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mil-mb-60 order-lg-2">
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
                  letterSpacing: '4px',
                  fontSize: '11px',
                  opacity: 0.8
                }}>CEO'S MESSAGE</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  CEO's <span className="mil-thin">Message</span>
                </h2>
                <p className="mil-text mil-up" style={{ 
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  fontStyle: 'italic',
                  marginBottom: '20px'
                }}>
                  "Innovation and adaptability are at the heart of our operations. In an ever-changing global landscape, we continuously evolve our strategies to meet the dynamic needs of our clients while maintaining our core values of quality and integrity."
                </p>
                <p className="mil-text mil-up" style={{ 
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  fontStyle: 'italic'
                }}>
                  "Our team's dedication and expertise drive our success. Together, we are building a future where Wish Group stands as a beacon of excellence in international trade, creating opportunities and delivering value that transcends borders."
                </p>
                <div style={{
                  marginTop: '30px',
                  paddingTop: '30px',
                  borderTop: '1px solid rgba(133, 150, 166, 0.1)'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#A6033F',
                    marginBottom: '4px'
                  }}>Chief Executive Officer</div>
                  <div style={{
                    fontSize: '12px',
                    color: '#8596A6',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>Wish Group</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mil-mb-60 order-lg-1">
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{
                  fontSize: '120px',
                  color: 'rgba(166, 3, 63, 0.1)',
                  fontWeight: 300
                }}>"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutUs

