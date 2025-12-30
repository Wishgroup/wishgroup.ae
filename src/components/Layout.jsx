import React from 'react'
import Cursor from './Cursor'
import ProgressBar from './ProgressBar'
import Frame from './Frame'
import Menu from './Menu'
import Curtain from './Curtain'
import HiddenElements from './HiddenElements'
import Chatbot from './Chatbot'
import { useArrowIcons } from '../hooks/useArrowIcons'
import { MenuProvider } from '../contexts/MenuContext'

function Layout({ children }) {
  useArrowIcons()
  
  return (
    <MenuProvider>
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
        <Chatbot />
      </div>
    </MenuProvider>
  )
}

export default Layout

