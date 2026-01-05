import React, { useState, useRef, useEffect } from 'react';
import '../styles/LearnMore.css';

function LearnMore() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const CIRCLE_RADIUS = 100; // 200px diameter (100px radius)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
      }
    };

    // Track mouse movement when over the container
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="learn-more-container">
      {/* Full Screen Image Reveal Section */}
      <section className="image-reveal-section">
        {/* Image Reveal Container */}
        <div 
          className="image-reveal-container" 
          ref={containerRef}
          style={{
            '--circle-x': `${mousePos.x}px`,
            '--circle-y': `${mousePos.y}px`,
            '--radius': `${CIRCLE_RADIUS}px`,
          }}
        >
          {/* Background Image A - Always Visible */}
          <div className="image-layer image-layer-a">
            <img 
              src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1767629412/1c5345c0-9cc6-43e1-9b85-18d44502641a_o2kq9a.jpg" 
              alt="Main background"
            />
          </div>

          {/* Revealed Image B - Shows through circular cursor */}
          <div className="image-layer image-layer-b reveal-circle">
            <img 
              src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1767629412/8720407c-db5d-493b-843a-59fc9af5a387_whzail.jpg" 
              alt="Revealed background"
            />
          </div>
        </div>

        {/* Header Overlay */}
        <div className="learn-more-header">
          <h1>Explore Our Story</h1>
          <p>Hover over the image to reveal more</p>
        </div>
      </section>

      {/* Info Section */}
      <div className="learn-more-info">
        <div className="info-card">
          <h2>Cursor Magic</h2>
          <p>Move your cursor over the image above to reveal a hidden layer. This effect uses pure CSS and JavaScript for smooth, performant interactions.</p>
        </div>

        <div className="info-card">
          <h2>How It Works</h2>
          <p>The circular reveal follows your mouse cursor in real-time, creating an interactive experience. Perfect for storytelling, before/after comparisons, or product showcases.</p>
        </div>

        <div className="info-card">
          <h2>Performance</h2>
          <p>Built with no external libraries, this solution uses CSS mask-image and JavaScript event listeners for optimal performance and smooth 60fps animations.</p>
        </div>
      </div>

      {/* Cursor Indicator */}
      <div 
        className="cursor-indicator"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      ></div>
    </div>
  );
}

export default LearnMore;
