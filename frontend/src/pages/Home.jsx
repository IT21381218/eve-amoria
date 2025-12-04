import Navigation from "../components/Navigation"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import ScrollVideo from "../components/ScrollVideo"
import About from "../components/aboutus"
import "../styles/home.css"

const Home = () => {
  return (
    <div className="home-container">
      <Navigation />
      <section id="hero">
        <Hero />
      </section>
      {/* Scroll Video Section */}
      <section id="scroll-video-section">
        <ScrollVideo />
      </section>

      <section id="about">
        <About />
      </section>

      <Footer />
    </div>
  )
}

export default Home
