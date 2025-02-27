import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaProfesor.css';

const PaginaProfesor = () => {
  const navigate = useNavigate();
  const profesor = JSON.parse(localStorage.getItem('user'));
  console.log(profesor);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    if (!profesor) {
      navigate('/');
    }
  }, [navigate, profesor]);

  const handleAddActivity = () => {
    if (!profesor) {
      console.error('Profesor ID is missing or invalid!');
      return;
    }

    navigate('/creare-activitate');
  };

  const handleActivity = () => {
    if (!profesor) {
      console.error('Profesor ID is missing or invalid!');
      return;
    }

    navigate('/activitate-profesor');
  };

  return (
    <div className="pagina-profesor-container">
      <div className="header">
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="content">
        <h1>Bine ai venit, {profesor?.ProfesorName || 'Profesor'}!</h1>
        <p>Ești pregătit/ă de o nouă activitate?</p>
        <div className="button-group">
          <button className="action-btn" onClick={handleAddActivity}>
            Adaugă activitate!
          </button>
          <button className="action-btn" onClick={handleActivity}>
            Activitatea mea
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginaProfesor;
