
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import "../styles/navigation.css"

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "bestsellers", label: "Shop" },
  { id: "why-us", label: "About" },
  { id: "trust", label: "Contact" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, idx) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveIndex(idx);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-glass">
          <div className="navbar-glow"></div>
        </div>
        
        <div className="nav-container">
          {/* Left Navigation */}
          <ul className="nav-links left-links desktop-only">
            {LINKS.slice(0, 2).map((link, idx) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => scrollToSection(link.id, idx)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <div className="logo" onClick={() => scrollToSection("hero", 0)}>
            <span className="logo-text">Eve Amoria</span>
          </div>

          {/* Right Navigation */}
          <ul className="nav-links right-links desktop-only">
            {LINKS.slice(2, 4).map((link, idx) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeIndex === idx + 2 ? 'active' : ''}`}
                  onClick={() => scrollToSection(link.id, idx + 2)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="menu-toggle mobile-only" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-glass"></div>
        <ul className="mobile-nav-links">
          {LINKS.map((link, idx) => (
            <li key={link.id}>
              <button
                className={`mobile-nav-link ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id, idx)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
};

export default Navigation;