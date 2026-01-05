import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import '../styles/hero.css';

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <section className="hero">
      {/* Animated Background Video with Parallax */}
      <div 
        className="hero-video-wrapper"
        style={{
          transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.5}px)`
        }}
      >
        <video autoPlay muted loop playsInline className="hero-video">
          <source
            src="https://res.cloudinary.com/dwcxwpn7q/video/upload/v1767538068/My_Video1_czc5ob.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div 
        className="hero-overlay"
        style={{
          opacity: Math.min(0.6 + scrollY * 0.001, 0.85)
        }}
      ></div>

      {/* Main Content */}
      <div 
        className="hero-content"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: Math.max(1 - scrollY * 0.002, 0)
        }}
      >
        <h1 className="hero-title">
          <span className="title-line">Discover Premium</span>
          <span className="title-line gradient-text">Wellness</span>
        </h1>

        <p className="hero-subtitle">
          Explore our curated collection of luxury products designed
          <br />
          for your intimate well-being and lifestyle
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={handleShopNow}>
            <span>Shop Now</span>
            <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary" onClick={handleLearnMore}>
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button className="scroll-indicator" onClick={scrollToNext}>
        <span>Scroll to explore</span>
        <ChevronDown size={24} className="scroll-icon" />
      </button>
    </section>
  );
}

export default Hero;