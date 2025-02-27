import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaStudent.css';
import axios from 'axios';

const PaginaStudent = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('userS'));
  const [codActivitate, setCodActivitate] = useState('');
  const link = "http://localhost:9000/api/activitate/cod";

  const handleLogout = () => {
    localStorage.removeItem('userS');
    navigate('/login'); // Navighează către pagina de login
  };

  async function getPostByCod(endpoint, cod) {
    try {
      const response = await axios.get(`${endpoint}/${cod}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Activitatea nu a fost găsită:", cod);
        return null;
      }
      console.error("Eroare la obținerea activității:", error.message);
      return null;
    }
  }

  const handleEnterActivity = async () => {
    if (!codActivitate) {
      alert('Te rugăm să introduci un cod valid!');
      return;
    }
    let activitate = await getPostByCod(link, codActivitate);

    if (!activitate) {
      alert('Nu există activitate cu codul introdus!');
      return;
    } else {
      const now = new Date();
      const startTime = new Date(activitate.DataInceput);
      if (now >= startTime) {
        localStorage.setItem('activitate', JSON.stringify(activitate));
        navigate('/activitate-student');
      } else {
        alert(`Activitatea există dar începe la ${activitate.DataInceput}!`);
        return;
      }
    }
  };

  useEffect(() => {
    if (!student) {
      navigate('/');
    }
  }, [navigate, student]);

  return (
    <div className="pagina-student-container">
      <div className="header">
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="content">
        <h1>Bine ai venit, {student?.StudentName || 'Student'}!</h1>
        <p>Dacă vrei să intri la o activitate, introdu codul mai jos:</p>
        <div className="activity-input-container">
          <input
            type="text"
            placeholder="Introdu codul activității"
            value={codActivitate}
            onChange={(e) => setCodActivitate(e.target.value)}
            className="activity-input"
          />
          <button className="enter-activity-btn" onClick={handleEnterActivity}>
            Intră la activitate
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginaStudent;
