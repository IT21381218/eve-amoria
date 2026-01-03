import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Shipping from "./pages/GithubGlobe"
import ProductList from "./pages/ProductListing"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/product" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
