import express from 'express';
import{getStudent,getStudentById,createStudent,deleteStudent,getStudentByEmail}from "../dataAccess/StudentDA.js";

let studentRouter=express.Router();

studentRouter.route('/student').post(async(req,res)=>{
    return res.status(201).json(await createStudent(req.body));
})

studentRouter.route('/student').get(async(req,res)=>{
    return res.json(await getStudent());
})

studentRouter.route('/student/:id').get(async(req,res)=>{
    return res.json(await getStudentById(req.params.id));
})

studentRouter.route('/student/:id').delete(async(req,res)=>{
    return res.json(await deleteStudent(req.params.id));
})

studentRouter.route('/student/email/:email').get(async (req, res) => {
    const student = await getStudentByEmail(req.params.email);
    if (student) {
        return res.json(student);
    } else {
        return res.status(404).json({ message: "Student not found with this email" });
    }
});

export default studentRouter;