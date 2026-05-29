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
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Faqs from './pages/Faqs'
import Privacy from './pages/Privacy'
import Pricing from './pages/Pricing'
import Delivery from './pages/Delivery'
import Refundpolicy from './pages/Refundpolicy'
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/refund-policy" element={<Refundpolicy />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}
export default App
