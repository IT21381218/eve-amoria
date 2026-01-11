import React from 'react';

const Marquee = () => {
  const items = [
    "EXCELLENCE",
    "INNOVATION",
    "PRECISION",
    "ELEGANCE",
    "CRAFTSMANSHIP",
    "SOPHISTICATION",
    "HERITAGE",
    "DISTINCTION"
  ];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <div className="marquee-content">
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className="marquee-item">
              <span className="item-text">{item}</span>
              <span className="item-dot">•</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          background: #ffffff;
          padding: 2rem 0;
          overflow: hidden;
          position: relative;
        }

        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #ffffff, transparent);
        }

        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #ffffff, transparent);
        }

        .marquee-track {
          display: flex;
        }

        .marquee-content {
          display: flex;
          animation: marquee 35s linear infinite;
          will-change: transform;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          padding: 0 2.5rem;
        }

        .item-text {
          font-family: sub;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #000000;
          text-transform: uppercase;
          position: relative;
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .item-dot {
          font-size: 1.5rem;
          color: #000000;
          margin-left: 2.5rem;
          opacity: 0.3;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .marquee-wrapper {
            padding: 2.5rem 0;
            border-width: 2px;
          }

          .marquee-wrapper::before,
          .marquee-wrapper::after {
            width: 80px;
          }

          .marquee-item {
            padding: 0 1.5rem;
          }

          .item-dot {
            margin-left: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;