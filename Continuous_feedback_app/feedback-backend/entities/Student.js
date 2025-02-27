import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Student= db.define("Student",{
   StudentID:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    StudentName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    StudentSurname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    StudentEmail:{
        type:Sequelize.STRING,
        allowNull:false
    },
    StudentPassword:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

export default Student;