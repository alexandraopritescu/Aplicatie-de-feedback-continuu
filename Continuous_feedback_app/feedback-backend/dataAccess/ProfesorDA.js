import Profesor from "../entities/Profesor.js";

async function getProfesor() {
    return await Profesor.findAll();
}

async function getProfesorById(id) {
    return await Profesor.findByPk(id);
}

async function getProfesorByEmail(email) {
    return await Profesor.findOne({
        where: {
            ProfesorEmail: email // Câmpul din baza de date care corespunde email-ului
        }
    });
}


async function createProfesor(profesor) {
    try{
    return await Profesor.create(profesor);
    }catch(e){
        if(e.message== "notNull Violation: Profesor.ProfesorName cannot be null")
            throw new Error("Mesajul meu");
        else
            throw e;
    }
}

async function deleteProfesor(id) {
    let deleteElem=await Profesor.findByPk(id);

    if(!deleteElem){
        console.log("Elementul u exista");
        return;
    }
    else{
    return await deleteElem.destroy();}
}

export{
    getProfesor,
    getProfesorById,
    createProfesor,
    deleteProfesor,
    getProfesorByEmail
}