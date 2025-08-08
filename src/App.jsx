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
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import ConfirmSubscription from "./Pages/ConfirmSubscription";
import { AuthProvider } from "./contexts/AuthContext";
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
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shampoo" element={<Shampoo />} />
        <Route path="/tratamiento" element={<Tratamiento/>} />
        <Route path="/form" element={<FormContact />} />
        <Route path="/search" element={<SearchResults />} />  
        <Route path="/confirm-subscription/:token" element={<ConfirmSubscription />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

