import React from 'react'
import Cursor from './Cursor'
import ProgressBar from './ProgressBar'
import Frame from './Frame'
import Menu from './Menu'
import Curtain from './Curtain'
import HiddenElements from './HiddenElements'

function Layout({ children }) {
  return (
    <div className="mil-wrapper" id="top">
      <Cursor />
      <ProgressBar />
      <Menu />
      <Curtain />
      <Frame />
      <div className="mil-content">
        <div className="mil-main-transition">
          {children}
        </div>
      </div>
      <HiddenElements />
    </div>
  )
}

export default Layout

