import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/sections/Banner'
import IntroSection from '../components/sections/world'
import About from '../components/sections/About'
import NewSection from '../components/sections/NewSection'
import Services from '../components/sections/Services'
import Reviews from '../components/sections/Reviews'
import Partners from '../components/sections/Partners'
import Blog from '../components/sections/Blog'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Home() {
  useScrollAnimations()

  return (
    <>
      <Banner />
      <IntroSection />
      <About />
      <NewSection />
      <Services />
      <Partners />
      <Reviews />
      
      <Blog />
      <Footer />
    </>
  )
}

export default Home

