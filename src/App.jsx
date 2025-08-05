import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Concact from "./components/Concact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shampoo from "./Pages/Shampoo";
import Tratamiento from "./Pages/Tratamiento";
import FormContact from "./Pages/FormContact";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <Concact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shampoo" element={<Shampoo />} />
        <Route path="/tratamiento" element={<Tratamiento/>} />
        <Route path="/form" element={<FormContact />} />  
      </Routes>
    </Router>
  );
}

export default App;

