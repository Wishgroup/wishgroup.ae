import React, { createContext, useContext, useState } from 'react'

const MenuContext = createContext()

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}

export const MenuProvider = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false)

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev)
  }

  return (
    <MenuContext.Provider value={{ isMenuActive, setIsMenuActive, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

