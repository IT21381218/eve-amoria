import "../styles/hero.css"
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  const handleLearnMore = () => {
    navigate('/shipping')
  }

  return (
    <section className="hero">
      {/* Background Video */}
      <video autoPlay muted loop className="hero-video" poster="/elegant-background.jpg">
        <source src="https://res.cloudinary.com/dwcxwpn7q/video/upload/v1762095103/machine/kling_20251102_Text_to_Video_Transition_4280_0_ueg7n0.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">Discover Premium Wellness</h1>
        <p className="hero-subtitle">
          Explore our curated collection of luxury products designed for your intimate well-being
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary">Shop Now</button>
          <button className="btn btn-secondary" onClick={handleLearnMore}>Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default Hero