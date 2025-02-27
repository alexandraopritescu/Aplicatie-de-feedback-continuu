import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ActivitateProfesor.css';

const ActivitateProfesor = () => {
  const navigate = useNavigate();
  const [activitate, setActivitate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({
    FeedbackSmiley: 0,
    FeedbackFrowny: 0,
    FeedbackSurprised: 0,
    FeedbackConfused: 0,
  });
  const [intervalId, setIntervalId] = useState(null);

  const link = "http://localhost:9000/api/activitate/profesorId/";
  const feedbackLink = "http://localhost:9000/api/activitate/";

  const ob = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchActivitate = async () => {
      try {
        const response = await axios.get(`${link}${ob.ProfesorID}`);
        setActivitate(response.data);

        if (response.data && response.data.ActivitateID) {
          const id = setInterval(() => fetchFeedback(response.data.ActivitateID), 500);
          setIntervalId(id);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Nu există activitate asociată acestui profesor.");
        } else {
          setError("A apărut o eroare la conectarea cu serverul.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivitate();

    return () => clearInterval(intervalId);
  }, [ob.ProfesorID]);

  const fetchFeedback = async (activitateId) => {
    try {
      const response = await axios.get(`${feedbackLink}${activitateId}/feedback`);
      setFeedback(response.data);
    } catch (error) {
      console.error('Eroare la obținerea feedback-ului:', error);
    }
  };

  return (
    <div className="activitate-profesor-container">
      <button className="home-btn" onClick={() => navigate('/pagina-profesor')}>
        Home
      </button>
      <div className="activitate-profesor-content">
        <h1>Activitatea mea</h1>
        {loading && <p>Se încarcă activitatea...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {activitate && (
          <div className="activitate-wrapper">
            <div className="activitate-details">
              <h3>{activitate.NumeActivitate}</h3>
              <p><strong>Descriere:</strong> {activitate.DescriereActivitate || "N/A"}</p>
              <p><strong>Cod:</strong> {activitate.Cod}</p>
              <p><strong>Durata:</strong> {activitate.DurataActivitate} minute</p>
              <p><strong>Data de început:</strong> {new Date(activitate.DataInceput).toLocaleDateString()}</p>
            </div>
            <div className="feedback-section">
              <h3>Feedback primit:</h3>
              <ul>
                <li>😀 Smiley: <span>{feedback.FeedbackSmiley}</span></li>
                <li>😢 Frowny: <span>{feedback.FeedbackFrowny}</span></li>
                <li>😲 Surprised: <span>{feedback.FeedbackSurprised}</span></li>
                <li>😕 Confused: <span>{feedback.FeedbackConfused}</span></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitateProfesor;
