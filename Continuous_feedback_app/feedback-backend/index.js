import express from 'express';
import env from 'dotenv';
import DB_init from './entities/DB_init.js';
import createDbRouter from './routes/createDbRoute.js';
import profesorRouter from './routes/ProfesorRouter.js';
import studentRouter from './routes/StudentRouter.js';
import activitateRouter from './routes/ActivitateRouter.js';
import { deleteExpiredActivitati } from './dataAccess/ActivitateDA.js';
import cors from 'cors';

env.config();
let app=express();


//const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Domeniul frontend-ului tău
  methods: ['GET', 'POST', 'PUT','PATCH','DELETE'], // Metodele permise
  credentials: true // Permite trimiterea de cookie-uri, dacă e nevoie
}));





app.use(express.json());
app.use(express.urlencoded({
        extended:true
    }));

DB_init();

app.use("/api", createDbRouter);
app.use("/api", profesorRouter);
app.use("/api", studentRouter);
app.use("/api", activitateRouter);

setInterval(async () => {
  try {
      await deleteExpiredActivitati();
  } catch (err) {
      console.error("Eroare în procesul periodic:", err);
  }
}, 1 * 60 * 1000); // Rulează la fiecare 5 minute



let port=process.env.PORT || 8001;
//app.listen(port);
//console.log('Merge la ' + port);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }).on('error', (err) => {
    console.error(`Failed to start server: ${err.message}`);
  });
  

