import { useEffect } from 'react'

/**
 * Hook to inject arrow SVG icons into elements with mil-arrow-place class
 * The arrow SVG is defined in HiddenElements component
 */
export function useArrowIcons() {
  useEffect(() => {
    const injectArrowIcons = () => {
      // Get the arrow SVG template from HiddenElements
      const arrowTemplate = document.querySelector('.mil-arrow')
      if (!arrowTemplate) return

      // Find all elements that need arrow icons
      const arrowPlaceholders = document.querySelectorAll('.mil-arrow-place:not(.mil-arrow-injected)')
      
      arrowPlaceholders.forEach((element) => {
        // Skip if already has an arrow SVG
        if (element.querySelector('svg.mil-arrow-clone')) {
          element.classList.add('mil-arrow-injected')
          return
        }

        // Clone the arrow SVG
        const arrowClone = arrowTemplate.cloneNode(true)
        arrowClone.classList.remove('mil-arrow')
        arrowClone.classList.add('mil-arrow-clone')
        
        // Mark as injected to avoid duplicates
        element.classList.add('mil-arrow-injected')
        
        // Append the arrow to the element
        element.appendChild(arrowClone)
      })
    }

    // Wait for HiddenElements to be rendered, then inject arrows
    const checkAndInject = () => {
      const arrowTemplate = document.querySelector('.mil-arrow')
      if (arrowTemplate) {
        injectArrowIcons()
      } else {
        // Retry after a short delay if arrow template not found
        setTimeout(checkAndInject, 50)
      }
    }

    // Initial injection attempt
    checkAndInject()

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      // Debounce to avoid too many calls
      clearTimeout(observer.timeoutId)
      observer.timeoutId = setTimeout(() => {
        injectArrowIcons()
      }, 50)
    })

    // Observe the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Also use intervals to catch elements added after initial render
    const intervalId = setInterval(() => {
      injectArrowIcons()
    }, 200)

    return () => {
      observer.disconnect()
      clearInterval(intervalId)
      if (observer.timeoutId) {
        clearTimeout(observer.timeoutId)
      }
    }
  }, [])
}

