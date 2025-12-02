import React, { useState, useRef, useCallback, useEffect } from "react";

// Constants
const CARD_COUNT = 4;
const CARD_WIDTH = 280;
const CARD_HEIGHT = 420;
const CARD_BORDER_RADIUS = 20;
const WRAPPER_SIZE = 600;
const SCROLL_THRESHOLD = 30;
const SCROLL_DELAY = 600;

// Default items - cards with local images
const defaultItems = [
  { id: 0, image: "/img/projects/1.png" },
  { id: 1, image: "/img/projects/2.png" },
  { id: 2, image: "/img/projects/3.jpg" },
  { id: 3, image: "/img/projects/4.jpg" }
];

// Position configurations
const POSITION_CONFIG = {
  "0": { zIndex: 5, opacity: 1, filter: "none" },
  "-1": { zIndex: 4, opacity: 0.7, filter: "blur(1px) grayscale(10%)", transform: "translateX(-40%) scale(.9)" },
  "1": { zIndex: 4, opacity: 0.7, filter: "blur(1px) grayscale(10%)", transform: "translateX(40%) scale(.9)" },
  "-2": { zIndex: 3, opacity: 0.4, filter: "blur(3px) grayscale(20%)", transform: "translateX(-70%) scale(.8)" },
  "2": { zIndex: 3, opacity: 0.4, filter: "blur(3px) grayscale(20%)", transform: "translateX(70%) scale(.8)" }
};

const GRADIENTS = [
  "linear-gradient(45deg,#2D35EB 0%,#904ED4 100%)",
  "linear-gradient(45deg,#2D35EB 0%,#fdbb2d 100%)",
  "linear-gradient(45deg,#2D35EB 0%,#22c1c3 100%)",
  "linear-gradient(45deg,#fdbb2d 0%,#904ED4 100%)",
  "linear-gradient(45deg,#22c1c3 0%,#904ED4 100%)"
];

export default function RotatedCarousel({ items = defaultItems }) {
  const displayItems = items.slice(0, CARD_COUNT);
  
  const initial = displayItems.map((item, i) => ({
    id: item.id !== undefined ? item.id : i,
    pos: (i - 2).toString(),
  }));

  const [elems, setElems] = useState(initial);
  const wrapperRef = useRef(null);
  const [hoverRotate, setHoverRotate] = useState(0);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);
  const containerRef = useRef(null);

  // Calculate new position with wrapping
  const calculatePosition = (diff) => {
    let newPos = diff;
    if (newPos > 1) newPos = newPos - CARD_COUNT;
    if (newPos < -2) newPos = newPos + CARD_COUNT;
    return newPos.toString();
  };

  // Rotate carousel
  const rotateCarousel = useCallback((direction) => {
    setElems((prev) => {
      const activeItem = prev.find(item => item.pos === "0");
      if (!activeItem) return prev;
      
      const activeIndex = prev.findIndex(item => item.id === activeItem.id);
      let newActiveIndex = activeIndex + direction;
      
      if (newActiveIndex < 0) newActiveIndex = CARD_COUNT - 1;
      if (newActiveIndex >= CARD_COUNT) newActiveIndex = 0;
      
      return prev.map((item, idx) => {
        const diff = idx - newActiveIndex;
        return {
          ...item,
          pos: calculatePosition(diff),
        };
      });
    });
  }, []);

  // Handle card click
  const handleCardClick = useCallback((clickedPos) => {
    setElems((prev) => {
      const clickedItem = prev.find(item => item.pos === clickedPos);
      if (!clickedItem) return prev;
      
      const clickedIndex = prev.findIndex(p => p.id === clickedItem.id);
      
      return prev.map((item) => {
        const currentIndex = prev.findIndex(p => p.id === item.id);
        const diff = currentIndex - clickedIndex;
        return {
          ...item,
          pos: calculatePosition(diff),
        };
      });
    });
  }, []);

  // Handle scroll
  const handleScroll = useCallback((e) => {
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
    rotateCarousel(direction);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, SCROLL_DELAY);
  }, [rotateCarousel]);

  // Handle mouse move for 3D tilt
  const handleMouseMove = useCallback((e) => {
    if (!wrapperRef.current) return;
    
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    
    setHoverRotate(x * 8);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverRotate(0);
  }, []);

  // Prevent page scroll on carousel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventPageScroll = (e) => {
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
      rotateCarousel(direction);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, SCROLL_DELAY);
    };

    container.addEventListener('wheel', preventPageScroll, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', preventPageScroll);
    };
  }, [rotateCarousel]);

  // Base card styles
  const getBaseCardStyle = () => ({
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
    boxShadow: "0 4px 16px rgba(50,50,50,0.5)",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    transformOrigin: "center",
    cursor: "pointer",
    overflow: "hidden",
  });

  // Get card style based on position
  const getCardStyle = (pos, idx) => {
    const config = POSITION_CONFIG[pos] || POSITION_CONFIG["0"];
    const baseStyle = getBaseCardStyle();
    
    return {
      ...baseStyle,
      zIndex: config.zIndex,
      opacity: config.opacity,
      filter: config.filter,
      transform: config.transform || "",
      background: pos === "0" ? "transparent" : GRADIENTS[idx % GRADIENTS.length],
      ...(pos === "0" && {
        boxShadow: "0 0 20px rgba(79,195,247,0.5), 0 4px 16px rgba(50,50,50,0.5)",
      }),
    };
  };


  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: WRAPPER_SIZE,
          height: WRAPPER_SIZE,
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
            height: "500px",
          }}
        >
          {elems.map((item, idx) => {
            const pos = item.pos;
            const cardStyle = getCardStyle(pos, idx);

            return (
              <li
                key={item.id}
                onClick={() => handleCardClick(pos)}
                role="button"
                aria-pressed={pos === "0"}
                style={cardStyle}
                data-pos={pos}
                onMouseEnter={(e) => {
                  if (pos !== "0") {
                    const config = POSITION_CONFIG[pos];
                    const scale = pos === "1" || pos === "-1" ? 0.95 : 0.85;
                    e.currentTarget.style.transform = `${config.transform || ""} scale(${scale})`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (pos !== "0") {
                    const config = POSITION_CONFIG[pos];
                    e.currentTarget.style.transform = config.transform || "";
                  }
                }}
              >
                <div
                  style={{
                    transform: "rotate(90deg)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: pos === "0" ? "flex-start" : "center",
                    justifyContent: pos === "0" ? "flex-start" : "center",
                    width: "100%",
                    height: "100%",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {/* Local Image */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`Card ${idx + 1}`}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: `${CARD_WIDTH}px`,
                          height: `${CARD_HEIGHT}px`,
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: `${CARD_BORDER_RADIUS}px`,
                          zIndex: 10,
                          opacity: pos === "0" ? 1 : 0.5,
                          display: "block",
                        }}
                        onError={(e) => {
                          console.error("Image failed to load:", item.image, e);
                          // Fallback if image fails to load
                          e.target.style.display = "none";
                          const placeholder = e.target.parentElement?.querySelector('.image-placeholder');
                          if (placeholder) {
                            placeholder.style.display = "flex";
                            placeholder.style.zIndex = "10";
                          }
                        }}
                        onLoad={() => {
                          console.log("Image loaded successfully:", item.image);
                        }}
                      />
                    ) : null}
                    {/* Fallback placeholder if image fails or doesn't exist */}
                    <div
                      className="image-placeholder"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: `${CARD_WIDTH}px`,
                        height: `${CARD_HEIGHT}px`,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: `${CARD_BORDER_RADIUS}px`,
                        zIndex: 5,
                        opacity: pos === "0" ? 1 : 0.5,
                        display: item.image ? "none" : "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Image {idx + 1}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
