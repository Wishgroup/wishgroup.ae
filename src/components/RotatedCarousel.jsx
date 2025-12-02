import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

// Default items
const defaultItems = [
  { heading: "WORLD TRADE CENTRE", paragraph: "WORLD TRADE CENTRE IS A MAIN LAND IN THE MALDIVES SRI LANKA AND THE HAWAI ISLANDS.", link: "/project-1" },
  { heading: "INTERIOR DESIGN STUDIO", paragraph: "A MODERN INTERIOR DESIGN STUDIO SPECIALIZING IN LUXURY RESIDENTIAL AND COMMERCIAL SPACES.", link: "/project-2" },
  { heading: "HOME SECURITY CAMERA", paragraph: "ADVANCED HOME SECURITY SOLUTIONS WITH AI-POWERED MONITORING AND REAL-TIME ALERTS.", link: "/project-3" },
  { heading: "KEMIA HONEST SKINCARE", paragraph: "NATURAL AND ORGANIC SKINCARE PRODUCTS MADE WITH PREMIUM INGREDIENTS FOR HEALTHY GLOWING SKIN.", link: "/project-4" },
  { heading: "CASCADE OF LAVA", paragraph: "AN IMMERSIVE DIGITAL EXPERIENCE SHOWCASING THE RAW POWER AND BEAUTY OF VOLCANIC FORMATIONS.", link: "/project-5" },
];

export default function RotatedCarousel({ items = defaultItems }) {
  const initial = items.map((item, i) => ({
    id: i,
    ...item,
    pos: (i - 2).toString(),
  }));

  const [elems, setElems] = useState(initial);
  const wrapperRef = useRef(null);
  const [hoverRotate, setHoverRotate] = useState(0);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);

  const getPos = (current, active) => {
    const cur = Number(current);
    const act = Number(active);
    const diff = cur - act;

    if (Math.abs(diff) > 2) return (-cur).toString();
    return diff.toString();
  };

  const update = useCallback((clickedPos) => {
    setElems((prev) =>
      prev.map((item) => ({
        ...item,
        pos: getPos(item.pos, clickedPos),
      }))
    );
  }, []);

  // 🌀 SMOOTH SCROLL TO ROTATE CARDS (SLOW)
  const handleScroll = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent page scrolling
    
    // Accumulate scroll delta - require more scroll before changing
    const scrollThreshold = 30; // Higher = slower scrolling
    scrollAccumulatorRef.current += Math.abs(e.deltaY);
    
    // Only trigger if threshold is reached
    if (scrollAccumulatorRef.current < scrollThreshold) {
      return;
    }
    
    // Prevent rapid scrolling
    if (isScrollingRef.current) {
      scrollAccumulatorRef.current = 0; // Reset accumulator
      return;
    }
    
    isScrollingRef.current = true;
    scrollAccumulatorRef.current = 0; // Reset accumulator
    
    const direction = e.deltaY > 0 ? 1 : -1;
    
    setElems((prev) => {
      return prev.map((item) => ({
        ...item,
        pos: getPos(item.pos, direction),
      }));
    });

    // Reset scroll lock after animation (longer delay for slower feel)
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600); // Increased from 300 to 600ms for slower response
  }, []);

  // 🌀 SMOOTH 3D HOVER ROTATION (tilt)
  const handleMouseMove = useCallback((e) => {
    if (!wrapperRef.current) return;
    
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    // Smooth tilt effect with reduced intensity
    setHoverRotate(x * 8); // Reduced from 0.05 to 8 degrees max
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverRotate(0);
  }, []);

  // Prevent page scrolling when mouse is over carousel
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventPageScroll = (e) => {
      // Prevent page scrolling
      e.preventDefault();
      e.stopPropagation();
      
      // Handle carousel scroll
      const scrollThreshold = 50;
      scrollAccumulatorRef.current += Math.abs(e.deltaY);
      
      if (scrollAccumulatorRef.current < scrollThreshold) {
        return;
      }
      
      if (isScrollingRef.current) {
        scrollAccumulatorRef.current = 0;
        return;
      }
      
      isScrollingRef.current = true;
      scrollAccumulatorRef.current = 0;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      
      setElems((prev) => {
        return prev.map((item) => ({
          ...item,
          pos: getPos(item.pos, direction),
        }));
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    // Add wheel event listener to prevent page scroll on entire container
    container.addEventListener('wheel', preventPageScroll, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', preventPageScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      {/* FULL ROTATION WRAPPER */}
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: 600,
          height: 600,
          transform: `rotate(-90deg) rotateY(${hoverRotate}deg)`,
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          perspective: "1000px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            position: "absolute",
            inset: 0,
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 500,
          }}
        >
          {elems.map((item, idx) => {
            const pos = item.pos;

            let baseStyle = {
              width: 250,
              height: 400,
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(50,50,50,0.5)",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transformOrigin: "center",
              cursor: "pointer",
            };

            let extra = {};
            let zIndex = 1;
            let opacity = 1;
            let filter = "none";

            switch (pos) {
              case "0":
                zIndex = 5;
                break;
              case "-1":
                extra.transform = "translateX(-40%) scale(.9)";
                zIndex = 4;
                opacity = 0.7;
                filter = "blur(1px) grayscale(10%)";
                break;
              case "1":
                extra.transform = "translateX(40%) scale(.9)";
                zIndex = 4;
                opacity = 0.7;
                filter = "blur(1px) grayscale(10%)";
                break;
              case "-2":
                extra.transform = "translateX(-70%) scale(.8)";
                zIndex = 3;
                opacity = 0.4;
                filter = "blur(3px) grayscale(20%)";
                break;
              case "2":
                extra.transform = "translateX(70%) scale(.8)";
                zIndex = 3;
                opacity = 0.4;
                filter = "blur(3px) grayscale(20%)";
                break;
              default:
                break;
            }

            const gradients = [
              "linear-gradient(45deg,#2D35EB 0%,#904ED4 100%)",
              "linear-gradient(45deg,#2D35EB 0%,#fdbb2d 100%)",
              "linear-gradient(45deg,#2D35EB 0%,#22c1c3 100%)",
              "linear-gradient(45deg,#fdbb2d 0%,#904ED4 100%)",
              "linear-gradient(45deg,#22c1c3 0%,#904ED4 100%)",
            ];

            const style = {
              ...baseStyle,
              ...extra,
              zIndex,
              opacity,
              filter,
              background:
                pos === "0"
                  ? "#ff2424"
                  : gradients[idx % gradients.length],
              ...(pos === "0"
                ? {
                    border: "2px solid #4FC3F7",
                    boxShadow:
                      "0 0 20px rgba(79,195,247,0.5), 0 4px 16px rgba(50,50,50,0.5)",
                  }
                : {}),
            };

            return (
              <li
                key={item.id}
                onClick={() => update(item.pos)}
                role="button"
                aria-pressed={item.pos === "0"}
                style={style}
                data-pos={item.pos}
                onMouseEnter={(e) => {
                  if (pos !== "0") {
                    e.currentTarget.style.transform = `${extra.transform || ""} scale(${pos === "0" ? 1 : pos === "1" || pos === "-1" ? 0.95 : 0.85})`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (pos !== "0") {
                    e.currentTarget.style.transform = extra.transform || "";
                  }
                }}
              >
                <div
                  style={{
                    transform: "rotate(90deg)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      pos === "0" ? "flex-start" : "center",
                    justifyContent:
                      pos === "0" ? "flex-start" : "center",
                    padding: "20px",
                    textAlign:
                      pos === "0" ? "left" : "center",
                    width: "100%",
                    height: "100%",
                    transition: "all 0.3s ease",
                  }}
                >
                  {pos === "0" ? (
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                      <h3
                        style={{
                          fontSize: 20,
                          color: "#fff",
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          position: "absolute",
                          left: "7rem",
                          top: "1.3rem",
                          margin: 0,
                          padding: 0,
                          textTransform: "uppercase",
                          width: "max-content",
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        {item.heading}
                      </h3>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#fff",
                          fontFamily: "Arial",
                          position: "absolute",
                          left: "7rem",
                          top: "6.1rem",
                          margin: 0,
                          padding: 0,
                          lineHeight: "1.4",
                          textTransform: "uppercase",
                          opacity: 0.9,
                          width: "max-content",
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        {item.paragraph}
                      </p>
                      <Link
                        to={item.link || "#"}
                        style={{
                          fontSize: 14,
                          color: "#fff",
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          textDecoration: "none",
                          textTransform: "uppercase",
                          position: "absolute",
                          left: "7rem",
                          top: "10.9rem",
                          margin: 0,
                          padding: 0,
                          width: "max-content",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.8";
                          e.currentTarget.style.transform = "translateX(5px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        VIEW PROJECT
                      </Link>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: 48,
                        color: "#fff",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      {idx + 1}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
