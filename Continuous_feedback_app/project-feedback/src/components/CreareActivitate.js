import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CreareActivitate.css';
import { useNavigate } from 'react-router-dom';

const CreareActivitate = () => {
  const [numeActivitate, setNumeActivitate] = useState('');
  const [descriereActivitate, setDescriereActivitate] = useState('');
  const [codActivitate, setCodActivitate] = useState('');
  const [durataActivitate, setDurataActivitate] = useState('');
  const [dataInceput, setDataInceput] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const ob = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!ob || !ob.ProfesorID) {
      console.error('Profesor ID is missing in CreareActivitate!');
      alert('Nu există un ID valid pentru profesor! Vei fi redirecționat.');
      navigate('/pagina-profesor');
    }
  }, [ob, navigate]);

  const link = "http://localhost:9000/api/activitate";
  const objHeaders = {
    headers: {
      "Content-Type": 'application/json'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ob || !ob.ProfesorID) {
      alert('Nu există un ID valid pentru profesor!');
      return;
    }

    setLoading(true);

    const activitateData = {
      NumeActivitate: numeActivitate,
      DescriereActivitate: descriereActivitate,
      Cod: codActivitate,
      DurataActivitate: durataActivitate,
      DataInceput: dataInceput.toISOString(), // Convertire în format ISO 8601
      ProfesorID: ob.ProfesorID
    };

    console.log('Activitate trimisă:', activitateData);

    try {
      const response = await axios.post(link, activitateData, objHeaders);
      console.log('Răspuns backend:', response.data);
      alert('Activitate creată cu succes!');
      navigate('/activitate-profesor');
    } catch (error) {
      console.error('Eroare creând activitatea:', error.response?.data || error.message);
      alert('Există deja o activitate!\nPoți crea alta când activitatea în curs ia sfârșit!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="creare-activitate-container">
      <h1>Crează o activitate</h1>
      <form onSubmit={handleSubmit} className="creare-activitate-form">
        <label>
          Nume Activitate
          <input
            type="text"
            value={numeActivitate}
            onChange={(e) => setNumeActivitate(e.target.value)}
            required
          />
        </label>

        <label>
          Descriere Activitate
          <textarea
            value={descriereActivitate}
            onChange={(e) => setDescriereActivitate(e.target.value)}
            required
          />
        </label>

        <label>
          Cod Activitate
          <input
            type="text"
            value={codActivitate}
            onChange={(e) => setCodActivitate(e.target.value)}
            required
          />
        </label>

        <label>
          Durată Activitate (în minute)
          <input
            type="number"
            value={durataActivitate}
            onChange={(e) => setDurataActivitate(e.target.value)}
            required
          />
        </label>

        <label>
          Data și Ora Început
          <DatePicker
            selected={dataInceput}
            onChange={(date) => setDataInceput(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="Pp"
            required
          />
        </label>

        <button type="submit" className="creare-activitate-btn" disabled={loading}>
          {loading ? 'Creare în curs...' : 'Creează Activitate'}
        </button>
      </form>
    </div>
  );
};

export default CreareActivitate;
