import express from 'express';
import{getProfesor,getProfesorById,createProfesor,deleteProfesor,getProfesorByEmail} from "../dataAccess/ProfesorDA.js";


let profesorRouter=express.Router();

profesorRouter.route('/profesor').post(async(req,res)=>{
    return res.status(201).json(await createProfesor(req.body));
})

profesorRouter.route('/profesor').get(async(req,res)=>{
    return res.json(await getProfesor());
})

profesorRouter.route('/profesor/:id').get(async(req,res)=>{
    return res.json(await getProfesorById(req.params.id));
})

profesorRouter.route('/profesor/:id').delete(async(req,res)=>{
    return res.json(await deleteProfesor(req.params.id));
})

profesorRouter.route('/profesor/email/:email').get(async (req, res) => {
    const profesor = await getProfesorByEmail(req.params.email);
    if (profesor) {
        return res.json(profesor);
    } else {
        return res.status(404).json({ message: "Profesor not found with this email" });
    }
});


export default profesorRouter;