import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Profesor= db.define("Profesor",{
    ProfesorID:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    ProfesorName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ProfesorSurname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ProfesorEmail:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ProfesorPassword:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

export default Profesor;