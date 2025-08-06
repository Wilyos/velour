import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchProvider } from "./Pages/SearchContext.jsx";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <SearchProvider>
      <BrowserRouter>  
        <App /> 
      </BrowserRouter>
    </SearchProvider>
  </React.StrictMode>
)
