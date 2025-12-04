import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Shipping from "./pages/GithubGlobe" // Import the Shipping component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Updated for v6 */}
          <Route path="/shipping" element={<Shipping />} /> {/* Updated for v6 */}
        </Routes>
      </div>
    </Router>
  )
}

export default App