import React from 'react'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Services() {
  useScrollAnimations()
  return (
    <>
      <div className="container mil-p-120-30">
        <h1>Services</h1>
        <p>This page is under construction.</p>
      </div>
      <Footer />
    </>
  )
}

export default Services

