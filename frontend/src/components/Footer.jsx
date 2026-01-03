import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Luxe</h4>
          <p>
            Discover premium wellness products curated for your lifestyle and well-being. Experience seductive luxury
            and elegance.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#shop">Shop</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <a href="#returns">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#shipping">Shipping Info</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#instagram" title="Instagram">
              ◌
            </a>
            <a href="#twitter" title="Twitter">
              ◇
            </a>
            <a href="#facebook" title="Facebook">
              ◆
            </a>
            <a href="#pinterest" title="Pinterest">
              ◎
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Luxe Wellness. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
