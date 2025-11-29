import React from 'react'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Project1() {
  useScrollAnimations()
  return (
    <>
      <div className="container mil-p-120-30">
        <h1>Project 1 - Interior design studio</h1>
        <p>This page is under construction.</p>
      </div>
      <Footer />
    </>
  )
}

export default Project1

