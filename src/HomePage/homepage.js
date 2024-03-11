import React from 'react';
import { Link } from "react-router-dom";
import './homepage.css';
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <>
      <header>
        <a href="#" className="logo"><span>Travel Advisor KTM</span></a>
        <nav className="navbar">
          <a href="#">Home</a>
          <a href="#main-content">About Us</a>
          <a href="#main-content">Contact Us</a>
          <a href="#main-content">Follow Us</a>
          {isAuthenticated ? (
            <button className='login-button' onClick={() => logout({ returnTo: '/explore' })}>Log out</button>
          ) : (
            <button className='login-button' onClick={() => loginWithRedirect()}>Login/SignUp</button>
          )}
        </nav>
      </header>
    
      <div className="video-container">
        <video autoPlay muted loop>
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="center-container">
        <div className="content">
          {isAuthenticated ? (
            <button><h1 className='content'><Link to ="/explore">Explore</Link></h1></button>
          ) : (
            <button className='moody' onClick={() => loginWithRedirect()}><h1 style={{ color: 'white' }}>Explore</h1></button>
          )}
        </div>
        <div className="centered-text">
          <h2>Discover The Beauty Of Katmandu Valley</h2> 
        </div>
      </div>

      <div className="content1">
        {isAuthenticated ? (
          <button><h1 className='content1'><Link to="/Apple">Destination</Link></h1></button>
        ) : (
          <button className='moody' onClick={() => loginWithRedirect()}><h1 style={{ color: 'white' }}>Destination</h1></button>
        )}
      </div>

      
      <footer className="footer">
        <div className="ram">
          <div className="row">
            <div className="footer-col">
              <main id="main-content">
                <h4>About Us</h4>
              </main>
              <ul>
                <li><a href="#">National College Of Engineering</a></li>
                <li><a href="#">Talchikhel, Lalitpur</a></li>
                <li><a href="#">2077 Batch</a></li>
                <li><a href="#">Computer Engineering</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <main className="main-content">
                <h4>Contact Us</h4>
              </main>
              <ul>
                <li><a href="#">Er. Ashok Tamang (9808350367)</a></li>
                <li><a href="#">Er. Bibek Aryal (9846758149)</a></li>
                <li><a href="#">Er. Prerana Subedi (9860195888)</a></li>
                <li><a href="#">Er. Kapil Kc (9800774448)</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <main className="main-content">
                <h4>Follow us</h4>
              </main>
              <div className="social-links">
                <a href="https://www.facebook.com/National.College.Of.Engineering.Nepal"><ion-icon name="logo-facebook"></ion-icon></a>
                <a href="https://nce.edu.np/"><ion-icon name="logo-google"></ion-icon></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
