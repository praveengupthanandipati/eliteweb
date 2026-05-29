import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Productslist from './pages/Productslist'
import Productdetail from './pages/Productdetail'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <Router>
      <div className="App">
        <Toast />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<Productslist />} />
            <Route path="/product/:slug" element={<Productdetail />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}
export default App
