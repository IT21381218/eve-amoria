// Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import '../styles/hero.css';

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleShopNow = () => {
    navigate('/product');
  };

  const handleLearnMore = () => {
    navigate('/learn-more');
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="luxury-hero">
      {/* Animated Background Video */}
      <div 
        className="luxury-video-wrapper"
        style={{
          transform: `scale(${1.1 + scrollY * 0.0002}) translateY(${scrollY * 0.4}px)`
        }}
      >
        <video autoPlay muted loop playsInline className="luxury-video">
          <source
            src="https://res.cloudinary.com/dwcxwpn7q/video/upload/v1767538068/My_Video1_czc5ob.mp4"
            type="video/mp4"
          />
        </video>
        <div className="luxury-video-overlay"></div>
      </div>

      {/* Floating Orbs */}
      <div 
        className="floating-orb orb-1"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      ></div>
      <div 
        className="floating-orb orb-2"
        style={{
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
        }}
      ></div>

      {/* Main Content - Left Aligned */}
      <div 
        className="luxury-content-left"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: Math.max(1 - scrollY * 0.0015, 0)
        }}
      >
        {/* Main Headline */}
        <h1 className="luxury-title-left">
          <span className="title-line-1">Discover</span>
          <span className="title-line-2">Premium Wellness</span>
        </h1>

        {/* Divider Line */}
        <div className="luxury-divider-left"></div>

        {/* Subtitle */}
        <p className="luxury-subtitle-left">
          Explore our curated collection of luxury products<br />
          designed for your intimate well-being and lifestyle
        </p>

        {/* CTA Buttons */}
        <div className="luxury-buttons-left">
          <button className="luxury-btn luxury-btn-primary" onClick={handleShopNow}>
            <span>Shop Now</span>
            <ArrowRight size={20} />
          </button>
          <button className="luxury-btn luxury-btn-secondary" onClick={handleLearnMore}>
            <span>Learn More</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button className="luxury-scroll-indicator" onClick={scrollToNext}>
        <span className="scroll-text">Explore</span>
        <div className="scroll-line"></div>
        <ChevronDown size={20} className="scroll-chevron" />
      </button>

      {/* Decorative Corner Elements */}
      <div className="corner-decoration corner-top-left"></div>
      <div className="corner-decoration corner-top-right"></div>
      <div className="corner-decoration corner-bottom-left"></div>
      <div className="corner-decoration corner-bottom-right"></div>


    </section>
  );
}

export default Hero;
