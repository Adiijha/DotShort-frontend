import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/landingPage/Header";
import Footer from "./components/landingPage/Footer";
import Hero from "./components/landingPage/Hero";
import Shorten from "./components/shortenLink/Shorten";
import QRPage from "./components/qrPage/QRPage";
import bg from "./assets/bg.jpg";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
        {/* Header is always displayed */}
        <Header />

        <Routes>
          {/* Route for Landing Page */}
          <Route path="/" element={<Hero />} />

          {/* Route for Shorten Link Page */}
          <Route path="/shortenlink" element={<Shorten />} />

          <Route path="/generateqr" element={<QRPage />} />
        </Routes>

        {/* Footer is always displayed */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
