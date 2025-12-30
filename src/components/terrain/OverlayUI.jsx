import { useState, useEffect } from "react";
import { RotateCcw, X, ChevronDown } from "lucide-react";
import { useMenu } from "../../contexts/MenuContext";

export const OverlayUI = ({ onReset, selectedPerson, hoveredPerson }) => {
  const { isMenuActive } = useMenu();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* Reset button */}
      {selectedPerson && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '50%',
            transform: `translateX(-50%) ${loaded ? 'translateY(0)' : 'translateY(-1rem)'}`,
            transition: 'all 0.5s',
            opacity: loaded ? 1 : 0
          }}
        >
          <button
            onClick={onReset}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid rgba(220, 38, 38, 0.5)',
              borderRadius: '9999px',
              color: '#dc2626',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <RotateCcw size={16} />
            RESET VIEW
          </button>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredPerson && !selectedPerson && hoveredPerson.name && hoveredPerson.role && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '0.875rem' }}>{hoveredPerson.name || 'Unknown'}</h4>
            <p style={{ color: '#dc2626', fontFamily: 'monospace', fontSize: '0.75rem' }}>{hoveredPerson.role || 'Unknown Role'}</p>
          </div>
        </div>
      )}

      {/* Person Info Card */}
      {selectedPerson && (
        <div
          style={{
            position: 'absolute',
            bottom: '6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'auto'
          }}
        >
          <div style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            minWidth: '300px',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Close button */}
            <button
              onClick={onReset}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                color: '#666',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1a1a1a'}
              onMouseLeave={(e) => e.target.style.color = '#666'}
            >
              <X size={18} />
            </button>
            
            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>{selectedPerson.name}</h3>
                <p style={{ color: '#dc2626', fontFamily: 'monospace', fontSize: '0.875rem' }}>{selectedPerson.role}</p>
              </div>
              
              <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.5), transparent)' }} />
              
              <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.5' }}>
                {selectedPerson.description}
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(220, 38, 38, 0.2)',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: '#dc2626'
                }}>
                  ID: {selectedPerson.id.toString().padStart(3, '0')}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(59, 130, 246, 0.2)',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: '#3b82f6'
                }}>
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom right instructions */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          textAlign: 'right',
          transition: 'all 1s 0.5s',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(1rem)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#666' }}>
          <span>DRAG TO ROTATE</span>
          <span>SCROLL TO ZOOM</span>
          <span>CLICK PERSON TO FOCUS</span>
        </div>
      </div>

      {/* Scroll down button - right middle - Floating Button */}
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: `translateY(-50%) ${loaded ? 'translateX(0)' : 'translateX(1rem)'}`,
          transition: 'all 1s 0.7s',
          opacity: loaded && !isMenuActive ? 1 : 0,
          visibility: loaded && !isMenuActive ? 'visible' : 'hidden',
          pointerEvents: loaded && !isMenuActive ? 'auto' : 'none',
          cursor: 'pointer',
          zIndex: 20
        }}
        onClick={() => {
          // Find the terrain section (new-section)
          const terrainSection = document.getElementById('new-section');
          if (terrainSection) {
            // Get the terrain section's position
            const terrainRect = terrainSection.getBoundingClientRect();
            const terrainBottom = window.scrollY + terrainRect.bottom;
            
            // Find the next element that comes after the terrain section
            // Look for sections, divs, or other block elements
            const allElements = Array.from(document.querySelectorAll('section, div[class*="mil-"], main, article'));
            let nextElement = null;
            
            for (const element of allElements) {
              const elementRect = element.getBoundingClientRect();
              const elementTop = window.scrollY + elementRect.top;
              
              // Find the first element that starts after the terrain section ends
              if (elementTop > terrainBottom + 50) { // 50px buffer
                nextElement = element;
                break;
              }
            }
            
            if (nextElement) {
              nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              // Fallback: scroll down by viewport height
              window.scrollBy({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              });
            }
          } else {
            // Fallback: try to find services section or scroll down
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollBy({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              });
            }
          }
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) translateX(0) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `translateY(-50%) ${loaded ? 'translateX(0)' : 'translateX(1rem)'} scale(1)`;
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s ease'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <ChevronDown 
              size={28} 
              color="#1a1a1a" 
              style={{ 
                animation: 'pulse 2s infinite',
                transition: 'transform 0.3s'
              }}
            />
          </div>
          <span style={{ 
            fontSize: '0.75rem', 
            fontFamily: 'monospace', 
            color: '#ffffff',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Scroll down
          </span>
        </div>
      </div>

      {/* Center loading indicator */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f0e8',
          transition: 'opacity 1s',
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? 'none' : 'auto'
        }}
      >
        <div style={{ color: '#dc2626', fontSize: '1.5rem', fontFamily: 'monospace', animation: 'pulse 2s infinite' }}>
          GENERATING TERRAIN...
        </div>
      </div>
    </div>
    </>
  );
};

