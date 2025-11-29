import React from 'react'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Portfolio2() {
  useScrollAnimations()
  return (
    <>
      <div className="container mil-p-120-30">
        <h1>Portfolio 2 - Grid Type 2</h1>
        <p>This page is under construction.</p>
      </div>
      <Footer />
    </>
  )
}

export default Portfolio2

