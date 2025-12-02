import React from 'react'
import Footer from '../components/Footer'
import PortfolioCards from '../components/sections/PortfolioCards'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Portfolio3() {
  useScrollAnimations()
  return (
    <>
      <PortfolioCards />
      <Footer />
    </>
  )
}

export default Portfolio3

