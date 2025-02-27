import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import siglaAse from './siglaAse.png'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <img src={siglaAse} alt="Sigla ASE" className="ase-logo" /> 
        <h1>Bine ai venit la aplicația noastră!</h1>
      </header>
      <div className="button-group">
        <button onClick={() => navigate('/login')} className="home-button">
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="home-button">
          Sign Up
        </button>
        <button onClick={() => navigate('/despre-aplicatie')} className="home-button">
          About
        </button>
      </div>
      <footer className="home-footer">
        <p>&copy; Ianuarie 2025. Oprițescu Alexandra & Ionescu Tudor</p>
      </footer>
    </div>
  );
};

export default Home;
