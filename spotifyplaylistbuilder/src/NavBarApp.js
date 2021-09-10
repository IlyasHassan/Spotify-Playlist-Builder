import React from 'react'
import { Button, Navbar, Form, FormControl, NavDropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const NavbarApp = () => {
    
    return (
        <Navbar className="nav-wrapper grey darken-3">
          <Link to="/" className="brand-logo" id="navtitle">Hot Tracks 4U</Link>

        
      </Navbar>
    
    )
    
    }
export default NavbarApp;
