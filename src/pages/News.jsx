import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

// Sample news items for carousel
const latestNews = [
  {
    id: 1,
    title: 'Wish Group Expands Operations to New Markets',
    date: '2024-01-15',
    image: '/img/news/news1.jpg',
    excerpt: 'Wish Group announces strategic expansion into emerging markets, strengthening our global presence.',
  },
  {
    id: 2,
    title: 'Sustainability Initiative Launched Across All Divisions',
    date: '2024-01-10',
    image: '/img/news/news2.jpg',
    excerpt: 'Comprehensive sustainability program introduced to reduce environmental impact and promote responsible business practices.',
  },
  {
    id: 3,
    title: 'Partnership with Leading International Organizations',
    date: '2024-01-05',
    image: '/img/news/news3.jpg',
    excerpt: 'New strategic partnerships established to enhance service delivery and expand market reach.',
  },
  {
    id: 4,
    title: 'Annual Leadership Summit 2024',
    date: '2023-12-20',
    image: '/img/news/news4.jpg',
    excerpt: 'Successful completion of annual leadership summit bringing together teams from across the globe.',
  },
]

// Sample news and events
const newsAndEvents = [
  {
    id: 1,
    title: 'Q1 Business Review Meeting',
    date: '2024-02-01',
    category: 'Event',
    description: 'Quarterly business review meeting with all regional managers and department heads.',
  },
  {
    id: 2,
    title: 'New Product Launch in UAE Market',
    date: '2024-01-25',
    category: 'News',
    description: 'Exciting new product line introduced to the UAE market with positive initial reception.',
  },
  {
    id: 3,
    title: 'Corporate Social Responsibility Program',
    date: '2024-01-18',
    category: 'Event',
    description: 'Launch of new CSR initiatives focusing on education and community development.',
  },
  {
    id: 4,
    title: 'Technology Infrastructure Upgrade',
    date: '2024-01-12',
    category: 'News',
    description: 'Major technology infrastructure upgrade completed to enhance operational efficiency.',
  },
  {
    id: 5,
    title: 'Employee Recognition Awards Ceremony',
    date: '2024-01-08',
    category: 'Event',
    description: 'Annual employee recognition ceremony celebrating outstanding contributions and achievements.',
  },
  {
    id: 6,
    title: 'Market Expansion Announcement',
    date: '2024-01-03',
    category: 'News',
    description: 'Strategic expansion into new geographic markets announced with detailed roadmap.',
  },
]

// Featured article
const featuredArticle = {
  id: 1,
  title: 'Wish Group: Building a Sustainable Future Through Innovation',
  date: '2024-01-20',
  author: 'Wish Group Editorial Team',
  image: '/img/news/featured.jpg',
  excerpt: 'As we navigate the complexities of the modern business landscape, Wish Group remains committed to innovation, sustainability, and creating lasting value for our stakeholders. This comprehensive article explores our journey, vision, and the strategic initiatives that drive our continued growth.',
  content: 'In an ever-evolving global economy, Wish Group has established itself as a leader in multiple sectors, spanning across seven countries and numerous business verticals. Our commitment to excellence, combined with a forward-thinking approach, has enabled us to build strong relationships with partners, clients, and communities worldwide. Through strategic investments, innovative solutions, and a focus on sustainable practices, we continue to create opportunities and drive positive change in the markets we serve.',
}

// Gallery images for events and special occasions
const galleryImages = [
  '/img/gallery/event1.jpg',
  '/img/gallery/event2.jpg',
  '/img/gallery/event3.jpg',
  '/img/gallery/event4.jpg',
  '/img/gallery/event5.jpg',
  '/img/gallery/event6.jpg',
  '/img/gallery/event7.jpg',
  '/img/gallery/event8.jpg',
]

// Constants
const AUTO_PLAY_DELAY = 3000
const RESUME_DELAY = 3000

function News() {
  useScrollAnimations()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Refs for intervals and timeouts
  const autoPlayIntervalRef = useRef(null)
  const resumeTimeoutRef = useRef(null)

  // Optimized auto-play effect
  useEffect(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
      autoPlayIntervalRef.current = null
    }

    if (!isAutoPlaying || latestNews.length === 0) return
    
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % latestNews.length)
    }, AUTO_PLAY_DELAY)

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
        autoPlayIntervalRef.current = null
      }
    }
  }, [isAutoPlaying])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [])

  // Memoized handlers
  const pauseAndResume = useCallback(() => {
    setIsAutoPlaying(false)
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, RESUME_DELAY)
  }, [])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
    pauseAndResume()
  }, [pauseAndResume])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + latestNews.length) % latestNews.length)
    pauseAndResume()
  }, [pauseAndResume])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % latestNews.length)
    pauseAndResume()
  }, [pauseAndResume])

  const handleMouseEnterCarousel = useCallback(() => setIsAutoPlaying(false), [])
  const handleMouseLeaveCarousel = useCallback(() => setIsAutoPlaying(true), [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

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
              <li>News</li>
            </ul>
            <h1 className="mil-mb-60">
              News & <span className="mil-thin">Updates</span>
            </h1>
            <p className="mil-text mil-up" style={{ maxWidth: '1200px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Stay informed about the latest developments, events, and achievements at Wish Group. From strategic initiatives to community engagement, discover what's happening across our global network.
            </p>
          </div>
        </div>
      </div>

      {/* Latest News Carousel Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Latest Updates</span>
            <h2 className="mil-up mil-mb-30">
              Latest <span className="mil-thin">News</span>
            </h2>
          </div>

          {/* Carousel Container */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              padding: '20px 0 0 0'
            }}
            onMouseEnter={handleMouseEnterCarousel}
            onMouseLeave={handleMouseLeaveCarousel}
          >
            {/* Carousel Track */}
            <div style={{
              display: 'flex',
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform'
            }}>
              {latestNews.map((news, index) => (
                <div
                  key={news.id}
                  style={{
                    minWidth: '100%',
                    width: '100%',
                    padding: '0 20px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div
                    className="mil-cover-frame mil-up"
                    style={{
                      width: '100%',
                      maxWidth: '900px',
                      margin: '0 auto',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(133, 150, 166, 0.2)',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'center center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '400px',
                      background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <img
                        src={news.image}
                        alt={news.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        padding: '40px',
                        color: 'white'
                      }}>
                        <div style={{
                          fontSize: '14px',
                          opacity: 0.9,
                          marginBottom: '12px'
                        }}>
                          {formatDate(news.date)}
                        </div>
                        <h3 style={{
                          fontSize: '28px',
                          fontWeight: 600,
                          margin: '0 0 12px 0',
                          lineHeight: '1.3'
                        }}>
                          {news.title}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          opacity: 0.9,
                          margin: 0
                        }}>
                          {news.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
              aria-label="Previous news"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
              aria-label="Next news"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          {/* Indicators/Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '40px'
          }}>
            {latestNews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: currentIndex === index ? '32px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: currentIndex === index ? '#A6033F' : 'rgba(133, 150, 166, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Stay Informed</span>
            <h2 className="mil-up mil-mb-30">
              News & <span className="mil-thin">Events</span>
            </h2>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {newsAndEvents.map((item, index) => (
              <div
                key={item.id}
                className="mil-up"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  borderRadius: '24px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.5)'
                  e.currentTarget.style.boxShadow = '0 24px 64px rgba(166, 3, 63, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    background: item.category === 'Event' ? 'rgba(166, 3, 63, 0.1)' : 'rgba(60, 76, 89, 0.1)',
                    color: item.category === 'Event' ? '#A6033F' : '#3C4C59',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {item.category}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: '#8596A6'
                  }}>
                    {formatDate(item.date)}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: '#8596A6',
                  margin: 0
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="mil-center mil-mb-60">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Featured</span>
            <h2 className="mil-up mil-mb-30">
              Featured <span className="mil-thin">Article</span>
            </h2>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(133, 150, 166, 0.2)',
              borderRadius: '24px',
              overflow: 'hidden',
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.5)'
              e.currentTarget.style.boxShadow = '0 24px 64px rgba(166, 3, 63, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)',
              position: 'relative'
            }}>
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
            <div style={{ padding: '50px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#8596A6'
                }}>
                  {formatDate(featuredArticle.date)}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  fontStyle: 'italic'
                }}>
                  By {featuredArticle.author}
                </span>
              </div>
              <h3 style={{
                fontSize: '32px',
                fontWeight: 600,
                color: '#3C4C59',
                margin: '0 0 20px 0',
                lineHeight: '1.3'
              }}>
                {featuredArticle.title}
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#8596A6',
                margin: '0 0 20px 0'
              }}>
                {featuredArticle.excerpt}
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#8596A6',
                margin: 0
              }}>
                {featuredArticle.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Visual Memories</span>
            <h2 className="mil-up mil-mb-30">
              Events & <span className="mil-thin">Gallery</span>
            </h2>
            <p className="mil-text mil-up" style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.8 }}>
              Capturing moments from our events, special occasions, and corporate gatherings
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="mil-up"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 24px 64px rgba(166, 3, 63, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img
                  src={image}
                  alt={`Wish Group Event ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default News

