// ...existing code...
"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/navigation.css"

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "bestsellers", label: "Shop" },
  { id: "why-us", label: "About" },
  { id: "trust", label: "Trust" },
]

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const linksRef = useRef([])
  const listRef = useRef(null)
  const blobRef = useRef(null)

  const toggleMenu = () => setIsMenuOpen((s) => !s)
  const toggleSearch = () => setShowSearch((s) => !s)

  const positionBlob = (index = activeIndex) => {
    const el = linksRef.current[index]
    const list = listRef.current
    const blob = blobRef.current
    if (!el || !list || !blob) return
    const rect = el.getBoundingClientRect()
    const parent = list.getBoundingClientRect()
    const left = rect.left - parent.left
    blob.style.transform = `translateX(${left}px)`
    blob.style.width = `${rect.width}px`
  }

  useEffect(() => {
    positionBlob()
    const onResize = () => positionBlob(activeIndex)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeIndex])

  const scrollToSection = (id, idx) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setActiveIndex(idx)
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => scrollToSection("hero", 0)} role="button" tabIndex={0}>
          <div className="logo-text-wrap">
            <span className="logo-text">EveAmoria</span>
          </div>
        </div>

        <button
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`} ref={listRef}>
          <span className="link-blob" ref={blobRef} aria-hidden="true" />
          {LINKS.map((link, idx) => (
            <li key={link.id}>
              <button
                className={`nav-link ${activeIndex === idx ? "active" : ""}`}
                onClick={() => scrollToSection(link.id, idx)}
                ref={(el) => (linksRef.current[idx] = el)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="search-btn" onClick={toggleSearch} aria-label="Search">
            🔍
          </button>
          <button className="cart-btn" aria-label="Cart">
            🛍️ <span className="cart-count">0</span>
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="search-overlay" role="dialog" aria-modal="true">
          <div className="search-box">
            <input autoFocus placeholder="Search products, e.g. face oil..." />
            <button onClick={toggleSearch} aria-label="Close search">✕</button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
// ...existing code...