import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Concact from "./components/Concact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shampoo from "./Pages/Shampoo";
import Tratamiento from "./Pages/Tratamiento";
import FormContact from "./Pages/FormContact";
import SearchResults from "./Pages/SearchResults";
import { useState } from "react";



function HomePage() {

   const [searchTerm, setSearchTerm] = useState(""); 
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Hero />
      <AboutUs searchTerm={searchTerm}/>
      <Concact searchTerm={searchTerm}/>
      <Footer />
    </>
  );
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shampoo" element={<Shampoo />} />
        <Route path="/tratamiento" element={<Tratamiento/>} />
        <Route path="/form" element={<FormContact />} />
        <Route path="/search" element={<SearchResults />} />  
      </Routes>
    
  );
}

export default App;

