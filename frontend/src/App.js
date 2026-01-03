import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Shipping from "./pages/GithubGlobe"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
