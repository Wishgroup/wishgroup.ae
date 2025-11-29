import React from 'react'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Publication() {
  useScrollAnimations()
  return (
    <>
      <div className="container mil-p-120-30">
        <h1>Publication</h1>
        <p>This page is under construction.</p>
      </div>
      <Footer />
    </>
  )
}

export default Publication

