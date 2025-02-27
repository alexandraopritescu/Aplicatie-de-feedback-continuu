import Student from "../entities/Student.js";

async function getStudent() {
    return await Student.findAll();
}

async function getStudentById(id) {
    return await Student.findByPk(id);
}
async function getStudentByEmail(email) {
    return await Student.findOne({
        where: {
            StudentEmail: email // Câmpul din baza de date care corespunde email-ului
        }
    });
}

async function createStudent(student) {
    try{
    return await Student.create(student);
    }catch(e){
        if(e.message== "notNull Violation: Student.StudentName cannot be null")
            throw new Error("Mesajul meu");
        else
            throw e;
    }
}

async function deleteStudent(id) {
    let deleteElem=await Student.findByPk(id);

    if(!deleteElem){
        console.log("Elementul nu exista");
        return;
    }
    else{
    return await deleteElem.destroy();}
}

export{
    getStudent,
    getStudentById,
    createStudent,
    deleteStudent,
    getStudentByEmail
}