import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Shipping from "./pages/GithubGlobe"
import ProductList from "./pages/ProductListing"
import LearnMore from "./pages/LearnMore"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
