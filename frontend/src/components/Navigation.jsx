// Navigation.jsx
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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state
      setScrolled(currentScrollY > 50);
      
      // Hide/show navbar logic
      if (currentScrollY < 100) {
        // Always show at top
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      <nav className={`luxury-navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`}>
        <div className="luxury-nav-container">
          {/* Left Navigation */}
          <ul className="luxury-nav-links left-nav desktop-only">
            {LINKS.slice(0, 2).map((link, idx) => (
              <li key={link.id}>
                <button
                  className={`luxury-nav-link ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => scrollToSection(link.id, idx)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <div className="luxury-logo" onClick={() => scrollToSection("hero", 0)}>
            <span className="luxury-logo-text">Eve Amoria</span>
          </div>

          {/* Right Navigation */}
          <ul className="luxury-nav-links right-nav desktop-only">
            {LINKS.slice(2, 4).map((link, idx) => (
              <li key={link.id}>
                <button
                  className={`luxury-nav-link ${activeIndex === idx + 2 ? 'active' : ''}`}
                  onClick={() => scrollToSection(link.id, idx + 2)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="luxury-menu-toggle mobile-only" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`luxury-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="luxury-mobile-nav-links">
          {LINKS.map((link, idx) => (
            <li key={link.id}>
              <button
                className={`luxury-mobile-nav-link ${activeIndex === idx ? 'active' : ''}`}
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
        <div className="luxury-mobile-backdrop" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
};

export default Navigation;