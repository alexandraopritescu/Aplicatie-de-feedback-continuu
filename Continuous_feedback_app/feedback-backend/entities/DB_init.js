import mysql from "mysql2/promise";
import env from "dotenv";
import Activitate from "./Activitate.js";
import Profesor from "./Profesor.js";
import Student from "./Student.js";
import db from "../dbConfig.js"; // Asumând că `dbConfig.js` configurează conexiunea Sequelize

env.config();

// Funcție pentru crearea bazei de date, dacă nu există
async function Create_DB() {
    let conn;
    try {
        conn = await mysql.createConnection({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });
        await conn.query('CREATE DATABASE IF NOT EXISTS Feedback');
        console.log("Baza de date 'Feedback' a fost creată sau există deja.");
    } catch (err) {
        console.warn("Eroare la crearea bazei de date:", err.stack);
    } finally {
        if (conn) {
            await conn.end();
        }
    }
}

// Funcție pentru configurarea relațiilor (Foreign Keys)
function FK_Config() {
    // Relația Profesor -> Activitate
    Profesor.hasMany(Activitate, { as: "Activitati", foreignKey: "ProfesorID" });
    Activitate.belongsTo(Profesor, { foreignKey: "ProfesorID" });

    // Adaugăm alte relații, dacă sunt necesare (ex. Student -> Activitate)
    // Exemplu: dacă studenții pot participa la activități, configurăm relația:
    // Activitate.hasMany(Student, { as: "Participanti", foreignKey: "ActivitateID" });
    // Student.belongsTo(Activitate, { foreignKey: "ActivitateID" });

    console.log("Relațiile Foreign Key au fost configurate.");
}

// Funcție pentru inițializarea bazei de date
async function DB_init() {
    // Creăm baza de date dacă nu există
    await Create_DB();

    // Configurăm relațiile Foreign Key
    FK_Config();

    // Sincronizăm modelele Sequelize cu baza de date
    try {
        await db.sync({ alter: true }); // Folosim `alter` pentru a evita pierderea datelor
        console.log("Modelele Sequelize au fost sincronizate cu baza de date.");
    } catch (err) {
        console.error("Eroare la sincronizarea modelelor Sequelize:", err.stack);
    }
}

export default DB_init;
