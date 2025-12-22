import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// AUTH0 DISABLED - Using mock hook
// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "../utils/mockAuth0";

// Constants
const CARD_WIDTH = 400;
const CARD_HEIGHT = 225;
const CARD_BORDER_RADIUS = 20;
const SCROLL_THRESHOLD = 30;
const SCROLL_DELAY = 600;

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768;

// Default items - cards with local images
const defaultItems = [
  { 
    id: 0, 
    image: "/img/projects/1.png",
    heading: "Wishes Fulfilled",
    paragraph: "Our track record of successful, lasting developments.",
    link: "/project-1"
  },
  { 
    id: 1, 
    image: "/img/projects/2.png",
    heading: "Seeds Taking Root",
    paragraph: "Active projects currently in motion and growing.",
    link: "/project-2"
  },
  { 
    id: 2, 
    image: "/img/projects/3.jpg",
    heading: "Partnerships for Impact",
    paragraph: "Collaborations building shared, sustainable potential.",
    link: "/project-3"
  },
  { 
    id: 3, 
    image: "/img/projects/4.png",
    heading: "Dreams on the Horizon",
    paragraph: "The exciting ventures we are preparing to launch.",
    link: "/project-4"
  }
];

// Position classes for vertical carousel
const getPositionClass = (offset, totalCards) => {
  if (offset === 0) return "center";
  if (offset === 1) return "down-1";
  if (offset === 2) return "down-2";
  if (offset === totalCards - 1) return "up-1";
  if (offset === totalCards - 2) return "up-2";
  return "hidden";
};

const getCardStyle = (positionClass, isMobile = false) => {
  const cardWidth = isMobile ? 280 : CARD_WIDTH;
  const cardHeight = isMobile ? 158 : CARD_HEIGHT; // Maintain aspect ratio
  
  const baseStyle = {
    position: "absolute",
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    background: "white",
    borderRadius: `${CARD_BORDER_RADIUS}px`,
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    cursor: "pointer",
  };

  switch (positionClass) {
    case "center":
      return {
        ...baseStyle,
        zIndex: 10,
        transform: "scale(1.1) translateZ(0)",
      };
    case "up-1":
      return {
        ...baseStyle,
        zIndex: 5,
        transform: isMobile 
          ? "translateY(-100px) scale(0.9) translateZ(-100px)"
          : "translateY(-150px) scale(0.9) translateZ(-100px)",
        opacity: 0.9,
      };
    case "up-2":
      return {
        ...baseStyle,
        zIndex: 1,
        transform: isMobile
          ? "translateY(-200px) scale(0.8) translateZ(-300px)"
          : "translateY(-300px) scale(0.8) translateZ(-300px)",
        opacity: 0.7,
      };
    case "down-1":
      return {
        ...baseStyle,
        zIndex: 5,
        transform: isMobile
          ? "translateY(100px) scale(0.9) translateZ(-100px)"
          : "translateY(150px) scale(0.9) translateZ(-100px)",
        opacity: 0.9,
      };
    case "down-2":
      return {
        ...baseStyle,
        zIndex: 1,
        transform: isMobile
          ? "translateY(200px) scale(0.8) translateZ(-300px)"
          : "translateY(300px) scale(0.8) translateZ(-300px)",
        opacity: 0.7,
      };
    case "hidden":
      return {
        ...baseStyle,
        opacity: 0,
        pointerEvents: "none",
      };
    default:
      return baseStyle;
  }
};

export default function RotatedCarousel({ items = defaultItems }) {
  // Check if there's a stored carousel index from navigation
  const storedIndex = sessionStorage.getItem('carousel_index');
  let initialIndex = 0;
  
  if (storedIndex) {
    const parsedIndex = parseInt(storedIndex, 10);
    // Validate index is within bounds
    if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < items.length) {
      initialIndex = parsedIndex;
    }
    // Clear the stored index after using it
    sessionStorage.removeItem('carousel_index');
  }

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateCarousel = useCallback((newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const normalizedIndex = ((newIndex % items.length) + items.length) % items.length;
    setCurrentIndex(normalizedIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [items.length, isAnimating]);

  // Handle scroll
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    scrollAccumulatorRef.current += Math.abs(e.deltaY);
    
    if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) return;
    if (isScrollingRef.current) {
      scrollAccumulatorRef.current = 0;
      return;
    }
    
    isScrollingRef.current = true;
    scrollAccumulatorRef.current = 0;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    updateCarousel(currentIndex + direction);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, SCROLL_DELAY);
  }, [currentIndex, updateCarousel]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        updateCarousel(currentIndex - 1);
      } else if (e.key === "ArrowDown") {
        updateCarousel(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, updateCarousel]);

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.changedTouches[0].screenY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    touchEndY.current = e.changedTouches[0].screenY;
    const swipeThreshold = 50;
    const diff = touchStartY.current - touchEndY.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
  }, [currentIndex, updateCarousel]);

  // Prevent page scroll on carousel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd]);

  const cardWidth = isMobile ? 280 : CARD_WIDTH;
  const cardHeight = isMobile ? 158 : CARD_HEIGHT;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
        overflow: "visible",
        padding: isMobile ? "0 30px" : "0 20px",
      }}
    >
      <div
        style={{
          width: isMobile ? `${cardWidth + 60}px` : `${CARD_WIDTH + 120}px`,
          height: isMobile ? "60vh" : "70vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
          padding: isMobile ? "0 20px" : "0 60px",
        }}
      >
        {items.map((item, index) => {
          const offset = ((index - currentIndex + items.length) % items.length);
          const positionClass = getPositionClass(offset, items.length);
          const cardStyle = getCardStyle(positionClass, isMobile);

          return (
            <div
              key={item.id !== undefined ? item.id : index}
              onClick={(e) => {
                // Don't navigate carousel if clicking on button or text
                if (e.target.closest('a') || e.target.closest('button')) {
                  return;
                }
                // If card is centered, check authentication before navigating
                if (positionClass === "center" && item.link) {
                  const projectPath = item.link;
                  if (isAuthenticated) {
                    navigate(projectPath, { replace: false });
                  } else {
                    // Store the returnTo path and redirect to Auth0 login
                    sessionStorage.setItem('auth0_returnTo', projectPath);
                    loginWithRedirect({
                      appState: {
                        returnTo: projectPath,
                      },
                    });
                  }
                  return;
                }
                // Otherwise, update carousel
                updateCarousel(index);
              }}
              style={cardStyle}
            >
              {item.image ? (
                <>
                  <img
                    src={item.image}
                    alt={`Card ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: positionClass === "center" 
                        ? "blur(1px)" 
                        : "grayscale(100%) blur(1px)",
                      transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", item.image);
                      e.target.style.display = "none";
                    }}
                  />
                  {/* Dark overlay for better text readability */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: positionClass === "center" 
                        ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%)"
                        : "transparent",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />
                  {/* Overlay with heading and paragraph */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      right: "20px",
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        padding: "16px 20px",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          marginBottom: "8px",
                          fontSize: isMobile ? "18px" : "24px",
                          fontWeight: "bold",
                          color: "#fff",
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                          lineHeight: "1.2",
                          textAlign: "left",
                        }}
                      >
                        {item.heading || `Project ${index + 1}`}
                      </h3>
                      {positionClass === "center" && (
                        <p
                          style={{
                            margin: 0,
                            fontSize: isMobile ? "12px" : "14px",
                            color: "#fff",
                            textShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
                            lineHeight: "1.4",
                            maxWidth: "90%",
                            textAlign: "left",
                          }}
                        >
                          {item.paragraph || `Description for project ${index + 1}`}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Center button - only show when card is centered */}
                  {positionClass === "center" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "75%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 3,
                        pointerEvents: "auto",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          // Navigate to the project page based on item.link
                          const projectPath = item.link || `/project-${index + 1}`;
                          if (isAuthenticated) {
                            navigate(projectPath, { replace: false });
                          } else {
                            // Store the returnTo path and redirect to Auth0 login
                            sessionStorage.setItem('auth0_returnTo', projectPath);
                            loginWithRedirect({
                              appState: {
                                returnTo: projectPath,
                              },
                            });
                          }
                        }}
                        style={{
                          display: "inline-block",
                          padding: isMobile ? "10px 20px" : "12px 28px",
                          backgroundColor: "transparent",
                          color: "#fff",
                          textDecoration: "none",
                          borderRadius: "8px",
                          fontSize: isMobile ? "12px" : "14px",
                          fontWeight: "bold",
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          border: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        View Project
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Image {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
