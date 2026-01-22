import mongoose from "mongoose";


const webskillScehma = new mongoose.Schema({

    technologyname : {
        type : String,
        require : true
    },
    abilityfskill : {
        type : String,
        require : true
    }
});

export default  mongoose.Schema("Webskill", webskillScehma)