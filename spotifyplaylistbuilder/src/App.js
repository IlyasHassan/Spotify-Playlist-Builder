import React, {Component} from "react";
import Navbar from "./NavBarApp"
import {BrowserRouter} from "react-router-dom"
import Dropdown from "./Dropdown"

function App() {
  return (

<BrowserRouter>
    <div className="App">
    <Dropdown  />
    
    <Navbar />

    
    
    
      
    </div>
    </BrowserRouter>

  );
}

export default App;
