import db from "../dbConfig.js";
import { Sequelize } from "sequelize";


const Activitate= db.define("Activitate",{
    ActivitateID:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    NumeActivitate:{
        type:Sequelize.STRING,
        allowNull:false
    },
    DescriereActivitate:{
        type:Sequelize.STRING,
        allowNull:true
    },
    Cod:{
        type:Sequelize.STRING,
        allowNull:false
    },
    DurataActivitate:{
        type:Sequelize.STRING,
        allowNull:false
    },
    DataInceput:{
        type:Sequelize.DATE,
        allowNull:false
    },
    ProfesorID:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    FeedbackSmiley: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    FeedbackFrowny: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    FeedbackSurprised: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    FeedbackConfused: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
})

export default Activitate;