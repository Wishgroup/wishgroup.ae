import { useState, useEffect } from "react";
import { RotateCcw, X } from "lucide-react";

export const OverlayUI = ({ onReset, selectedPerson, hoveredPerson }) => {
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
      {/* Top left info */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          transition: 'all 1s',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(-1rem)'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a', letterSpacing: '0.1em' }}>
          TERRAIN
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem', fontFamily: 'monospace' }}>
          procedural mountain field
        </p>
      </div>

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
      {hoveredPerson && !selectedPerson && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '0.875rem' }}>{hoveredPerson.name}</h4>
            <p style={{ color: '#dc2626', fontFamily: 'monospace', fontSize: '0.75rem' }}>{hoveredPerson.role}</p>
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

      {/* Bottom left coordinates */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          transition: 'all 1s 0.3s',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(1rem)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#666' }}>
          <span style={{ color: '#dc2626' }}>◉ SIMPLEX NOISE</span>
          <span>RES: 180×180</span>
          <span>OCTAVES: 6</span>
        </div>
      </div>

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

      {/* Top right status */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          transition: 'all 1s 0.2s',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateX(0)' : 'translateX(1rem)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#dc2626', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#666' }}>LIVE</span>
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

