import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>LUXE Wellness</h4>
          <p>Premium intimate products for confidence and pleasure.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#/">About Us</a>
            </li>
            <li>
              <a href="#/">Shop</a>
            </li>
            <li>
              <a href="#/">Contact</a>
            </li>
            <li>
              <a href="#/">Blog</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Policies</h4>
          <ul>
            <li>
              <a href="#/">Privacy Policy</a>
            </li>
            <li>
              <a href="#/">Shipping Info</a>
            </li>
            <li>
              <a href="#/">Returns</a>
            </li>
            <li>
              <a href="#/">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Get exclusive offers and wellness tips</p>
          <input type="email" placeholder="Enter your email" className="newsletter-input" />
          <button className="newsletter-btn">Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 LUXE Wellness. All rights reserved. | 18+ Only</p>
        <div className="social-links">
          <a href="#/">Instagram</a>
          <a href="#/">Twitter</a>
          <a href="#/">TikTok</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
