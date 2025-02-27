import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ActivitateStudent.css'; // Stilizare

const ActivitateStudent = () => {
  const navigate = useNavigate();

  // Obținem activitatea din localStorage
  const activitate = JSON.parse(localStorage.getItem('activitate'));

  // Funcție pentru gestionarea reacțiilor
  const handleReaction = async (reaction) => {
    if (!activitate) {
      alert('Activitatea nu a fost găsită.');
      return;
    }

    try {
      // Trimitem cererea PATCH către backend pentru a incrementa câmpul specific
      const response = await axios.patch(`http://localhost:9000/api/activitate/${activitate.ActivitateID}/increment/${reaction}`);
      console.log(`Reacția ${reaction} a fost procesată cu succes.`, response.data);
    } catch (error) {
      console.error('Eroare la procesarea reacției:', error);
      alert('Activitatea a luat sfarsit.');
      navigate('/pagina-student');
    }
  };

  return (
    <div className="activitate-student-container">
      {/* Buton de ieșire */}
      <button className="exit-button" onClick={() => navigate('/pagina-student')}>
        Ieșire
      </button>

      {/* Mesaj de întâmpinare */}
      <h1>Bine ai venit la activitate!</h1>
      <p>Reactionează apăsând unul dintre butoanele de mai jos:</p>

      {/* Cadranele cu emoticoane */}
      <div className="reaction-buttons">
        <button
          className="reaction-button"
          onClick={() => handleReaction('FeedbackSmiley')}
        >
          😀
        </button>
        <button
          className="reaction-button"
          onClick={() => handleReaction('FeedbackFrowny')}
        >
          😢
        </button>
        <button
          className="reaction-button"
          onClick={() => handleReaction('FeedbackSurprised')}
        >
          😲
        </button>
        <button
          className="reaction-button"
          onClick={() => handleReaction('FeedbackConfused')}
        >
          😕
        </button>
      </div>
    </div>
  );
};

export default ActivitateStudent;
