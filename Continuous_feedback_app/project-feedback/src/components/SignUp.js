import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const linkP = "http://localhost:9000/api/profesor";
  const linkS = "http://localhost:9000/api/student";

  const objHeaders = {
    headers: {
      "Content-Type": 'application/json'
    }
  };

  const navigate = useNavigate(); // Pentru redirecționare

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!role) {
      alert('Please select a role!');
      return;
    }

    if (role === 'Profesor') {
      const post = {
        ProfesorName: name,
        ProfesorSurname: surname,
        ProfesorEmail: email,
        ProfesorPassword: password
      };
      await createPostP(post);
    }

    if (role === 'Student') {
      const post = {
        StudentName: name,
        StudentSurname: surname,
        StudentEmail: email,
        StudentPassword: password
      };
      await createPostS(post);
    }
  };

  const createPostP = async (post) => {
    console.log("Sending POST request with:", post);
    try {
      const response = await axios.post(linkP, post, objHeaders);
      console.log("Response from server:", response.data);
      //alert('Account created successfully!');
      navigate('/login'); // Redirecționare la pagina de log in
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      alert("Failed to create post. Please check your backend or input data.");
    }
  };

  const createPostS = async (post) => {
    console.log("Sending POST request with:", post);
    try {
      const response = await axios.post(linkS, post, objHeaders);
      console.log("Response from server:", response.data);
      alert('Account created successfully!');
      navigate('/login'); // Redirecționare la pagina de log in
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      alert("Failed to create post. Please check your backend or input data.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Surname</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="Profesor">Profesor</option>
          <option value="Student">Student</option>
        </select>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
