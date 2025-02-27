import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DespreAplicatie.css';

const DespreAplicatie = () => {
  const navigate = useNavigate();

  return (
    <div className="despre-container">
      <button className="home-btn" onClick={() => navigate('/')}>
        Home
      </button>
      
      <div className="despre-card">
        <h1>Aplicație web pentru acordarea de feedback continuu</h1>
        
        <p>
          <strong>Obiectiv:</strong> Realizarea unei aplicații web care să permită acordarea de feedback continuu unei activități.
        </p>
        
        <p>
          <strong>Descriere:</strong> Aplicația trebuie să permită acordarea de feedback continuu la un curs sau seminariu.
        </p>
        
        <p>
          Platforma este bazată pe o aplicație web cu arhitectură de tip Single Page Application,
          accesibilă în browser de pe desktop, dispozitive mobile sau tablete (considerând
          preferințele utilizatorului).
        </p>
        
        <p>
          <strong>Funcționalități:</strong>
        </p>
        <ul>
          <li>Ca profesor pot defini o activitate la o anumită dată, cu o descriere și un cod unic de acces. Activitatea poate fi accesată pentru o durată prestabilită de timp.</li>
          <li>Ca student pot introduce un cod pentru a participa la activitate, codul fiind valabil doar în perioada respectivei activități.</li>
          <li>Ca student, odată ce am accesat o activitate, am la dispoziție o interfață împărțită în 4 cadrane, fiecare corespunzând unui emoticon (smiley face, frowny face, surprised face, confused face). Pot apăsa oricând un emoticon pentru a transmite feedback, de oricâte ori doresc.</li>
          <li>Ca profesor pot vedea feedback-ul în timp real, acesta fiind anonim. Feedback-ul rămâne disponibil și după terminarea activității până când profesorul părăsește pagina.</li>
        </ul>
      </div>
    </div>
  );
};

export default DespreAplicatie;
