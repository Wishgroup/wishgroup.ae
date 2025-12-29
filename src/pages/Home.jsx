import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/sections/Banner'
import IntroSection from '../components/sections/world'
import About from '../components/sections/About'
import NewSection from '../components/sections/NewSection'
import Reviews from '../components/sections/Reviews'
import Partners from '../components/sections/Partners'
import Blog from '../components/sections/Blog'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Home() {
  useScrollAnimations()

  useEffect(() => {
    // Restore scroll position if it exists
    const savedScrollPosition = sessionStorage.getItem('homepage_scroll_position')
    if (savedScrollPosition) {
      // Wait for page to render, then restore scroll
      const timer = setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'auto'
        })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Banner />
      <IntroSection />
      <About />
      <NewSection />
      <Partners />
      <Reviews />
      
      <Blog />
      <Footer />
    </>
  )
}

export default Home

