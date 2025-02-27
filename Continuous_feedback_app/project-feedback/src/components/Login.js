import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Adăugăm navigarea
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const linkP = "http://localhost:9000/api/profesor/email";
  const linkS = "http://localhost:9000/api/student/email";

  async function getPostByEmail(endpoint, email) {
    try {
      const response = await axios.get(`${endpoint}/${email}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found:", email);
        return null;
      }
      console.error("Error fetching user:", error.message);
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    let user = await getPostByEmail(linkS, email);

    if (!user) {
      user = await getPostByEmail(linkP, email);
    }

    if (user) {
      console.log(user);
      if (
        (user.StudentPassword === password) || 
        (user.ProfesorPassword === password)
      ) {
        console.log("Login successful!");
        if (user.ProfesorName) {
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/pagina-profesor');
        } else if (user.StudentName) {
          localStorage.setItem('userS', JSON.stringify(user));
          navigate('/pagina-student');
        } else {
          console.log("Unknown user type.");
          alert("Unknown user type.");
        }
      } else {
        console.log("Incorrect password.");
        alert("Incorrect password.");
      }
    } else {
      console.log("User not found.");
      alert("User not found.");
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="auth-container">
      <button className="home-btn" onClick={goToHome}>
        Home
      </button>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
