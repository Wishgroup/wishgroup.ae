import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/sections/Banner'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Team from '../components/sections/Team'
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
      <About />
      <Services />
      <Team />
      <Reviews />
      <Partners />
      <Blog />
      <Footer />
    </>
  )
}

export default Home

