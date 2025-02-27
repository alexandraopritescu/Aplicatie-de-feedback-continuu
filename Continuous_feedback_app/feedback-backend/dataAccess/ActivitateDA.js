import Activitate from "../entities/Activitate.js"
//import Profesor from "../entities/Profesor.js";

async function getActivitate() {
    return await Activitate.findAll();
}

async function getActivitateById(id) {
    return await Activitate.findByPk(id);
}

async function createActivitate(activitate) {
    try {
        return await Activitate.create(activitate);
    } catch (e) {
        if(e.message=="notNull Violation: Profesor.ProfesorName cannot be null")
            throw new Error("Msg meu");
        else
            throw e;
    }
}


async function deleteActivitate(id) {
    let deleteElem=await Activitate.findByPk(id);

    if(!deleteElem){
        console.log("Elementul nu exista");
        return;
    }
    else{
    return await deleteElem.destroy();}
}

async function getActivitateByProfesorId(profesorId) {
    return await Activitate.findOne({
        where: {
            ProfesorID: profesorId
        }
    });
}

async function getActivitateByCod(cod) {
    return await Activitate.findOne({
        where: {
            Cod: cod
        }
    });
}
async function incrementFeedbackField(id, field) {
    const activitate = await Activitate.findByPk(id);
    if (!activitate) {
        return null;
    }

    activitate[field] = activitate[field] + 1;
    await activitate.save();
    return activitate;
}
async function deleteExpiredActivitati() {
    try {
        const activitati = await Activitate.findAll();
        const now = new Date();
        let deletedCount = 0;

        for (const activitate of activitati) {
            const startTime = new Date(activitate.DataInceput);
            const endTime = new Date(startTime.getTime() + activitate.DurataActivitate * 60 * 1000);

            if (endTime < now) {
                await Activitate.destroy({ where: { ActivitateID: activitate.ActivitateID } });
                deletedCount++;
            }
        }

        console.log(`${deletedCount} activități expirate au fost șterse.`);
        return deletedCount;
    } catch (err) {
        console.error("Eroare la ștergerea activităților expirate:", err);
        throw err;
    }
}

export{
    getActivitate,
    getActivitateById,
    createActivitate,
    deleteActivitate,
    getActivitateByProfesorId,
    deleteExpiredActivitati,
    getActivitateByCod,
    incrementFeedbackField
}