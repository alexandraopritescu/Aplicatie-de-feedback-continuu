import express from 'express';
import {
    getActivitate,
    getActivitateById,
    createActivitate,
    deleteActivitate,
    getActivitateByProfesorId,
    deleteExpiredActivitati,
    getActivitateByCod,
    incrementFeedbackField
} from "../dataAccess/ActivitateDA.js";

const activitateRouter = express.Router();

// Obține toate activitățile
activitateRouter.route('/activitate').get(async (req, res) => {
    try {
        const activitati = await getActivitate();
        return res.json(activitati);
    } catch (err) {
        console.error('Eroare la obținerea activităților:', err);
        return res.status(500).json({ error: 'Eroare la obținerea activităților!' });
    }
});

// Obține o activitate după ID
activitateRouter.route('/activitate/:id').get(async (req, res) => {
    try {
        const activitate = await getActivitateById(req.params.id);
        if (activitate) {
            return res.json(activitate);
        } else {
            return res.status(404).json({ message: "Activitate not found" });
        }
    } catch (err) {
        console.error('Eroare la obținerea activității:', err);
        return res.status(500).json({ error: 'Eroare la obținerea activității!' });
    }
});

// Obține o activitate după ProfesorID
activitateRouter.route('/activitate/profesorId/:profesorId').get(async (req, res) => {
    const profesorId = parseInt(req.params.profesorId, 10);
    if (isNaN(profesorId)) {
        return res.status(400).json({ message: "Invalid Professor Id" });
    }
    try {
        const activitate = await getActivitateByProfesorId(profesorId);
        if (activitate) {
            // Adaugă ActivitateID pentru utilizare ulterioară în frontend
            return res.json({
                ActivitateID: activitate.ActivitateID,
                NumeActivitate: activitate.NumeActivitate,
                DescriereActivitate: activitate.DescriereActivitate,
                Cod: activitate.Cod,
                DurataActivitate: activitate.DurataActivitate,
                DataInceput: activitate.DataInceput,
                ProfesorID: activitate.ProfesorID
            });
        } else {
            return res.status(404).json({ message: "Activitate not found with this Professor Id" });
        }
    } catch (err) {
        console.error('Eroare la obținerea activității:', err);
        return res.status(500).json({ error: 'Eroare la obținerea activității!' });
    }
});

// Obține activitate după Cod
activitateRouter.route('/activitate/cod/:cod').get(async (req, res) => {
    const cod = parseInt(req.params.cod, 10);
    if (isNaN(cod)) {
        return res.status(400).json({ message: "Invalid Cod" });
    }
    try {
        const activitate = await getActivitateByCod(cod);
        if (activitate) {
            return res.json(activitate);
        } else {
            return res.status(404).json({ message: "Activitate not found with this Cod" });
        }
    } catch (err) {
        console.error('Eroare la obținerea activității:', err);
        return res.status(500).json({ error: 'Eroare la obținerea activității!' });
    }
});

// Șterge o activitate după ID
activitateRouter.route('/activitate/:id').delete(async (req, res) => {
    try {
        await deleteActivitate(req.params.id);
        return res.status(204).send();
    } catch (err) {
        console.error('Eroare la ștergerea activității:', err);
        return res.status(500).json({ error: 'Eroare la ștergerea activității!' });
    }
});

// Creează o activitate
activitateRouter.route('/activitate').post(async (req, res) => {
    console.log('Cerere POST primită pe /activitate cu body:', req.body);
    try {
        const activitate = await createActivitate(req.body);
        return res.status(201).json(activitate);
    } catch (err) {
        console.error('Eroare la crearea activității:', err);
        return res.status(500).json({ error: 'Eroare la crearea activității!' });
    }
});

// Șterge activitățile expirate
activitateRouter.route('/activitate/expired').delete(async (req, res) => {
    try {
        const deletedCount = await deleteExpiredActivitati();
        res.json({ message: `${deletedCount} activități expirate au fost șterse.` });
    } catch (err) {
        console.error('Eroare la ștergerea activităților expirate:', err);
        res.status(500).json({ error: 'Eroare la ștergerea activităților expirate!' });
    }
});

// Incrementarea unui câmp specific (feedback)
activitateRouter.route('/activitate/:id/increment/:field').patch(async (req, res) => {
    const { id, field } = req.params;

    try {
        const validFields = ['FeedbackSmiley', 'FeedbackFrowny', 'FeedbackSurprised', 'FeedbackConfused'];
        if (!validFields.includes(field)) {
            return res.status(400).json({ message: "Câmp invalid pentru actualizare." });
        }

        const activitate = await incrementFeedbackField(id, field);
        if (activitate) {
            return res.status(200).json({ message: `${field} a fost incrementat cu succes.`, activitate });
        } else {
            return res.status(404).json({ message: "Activitate not found." });
        }
    } catch (err) {
        console.error('Eroare la incrementarea câmpului:', err);
        return res.status(500).json({ error: 'Eroare la incrementarea câmpului!' });
    }
});

// Obține feedback-ul pentru o activitate
activitateRouter.route('/activitate/:id/feedback').get(async (req, res) => {
    try {
        const { id } = req.params;

        const activitate = await getActivitateById(id);
        if (!activitate) {
            return res.status(404).json({ message: "Activitate not found" });
        }

        return res.json({
            FeedbackSmiley: activitate.FeedbackSmiley,
            FeedbackFrowny: activitate.FeedbackFrowny,
            FeedbackSurprised: activitate.FeedbackSurprised,
            FeedbackConfused: activitate.FeedbackConfused
        });
    } catch (err) {
        console.error('Eroare la obținerea feedback-urilor:', err);
        return res.status(500).json({ error: 'Eroare la obținerea feedback-urilor!' });
    }
});

export default activitateRouter;
