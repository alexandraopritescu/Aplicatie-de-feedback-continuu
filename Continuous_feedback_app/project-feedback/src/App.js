
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import './App.css';
import PaginaProfesor from './components/PaginaProfesor';
import CreareActivitate from './components/CreareActivitate';
import PaginaStudent from './components/PaginaStudent';
import DespreAplicatie from './components/DespreAplicatie';
import ActivitateProfesor from './components/ActivitateProfesor';
import ActivitateStudent from './components/ActivitateStudent';

function App() {
  return (
    <div className="App">
      
      <Router>
        {/* Definește rutele */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/despre-aplicatie" element={<DespreAplicatie />} />
          <Route path="/pagina-profesor" element={<PaginaProfesor />} />
          <Route path="/creare-activitate" element={<CreareActivitate />} />
          <Route path="/pagina-student" element={<PaginaStudent />} />
          <Route path="/activitate-profesor" element={<ActivitateProfesor />} />
          <Route path="/activitate-student" element={<ActivitateStudent />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
