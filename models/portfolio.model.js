import mongoose from "mongoose";
const portfolioSchema = new mongoose.Schema({

    projectName : {
        type : String
    },
    projectDescription:{
        type : String
    },
    category : {
        type : String
    },
    projectImage : {
        type : String
    },
    projectUrl : {
        type : String
    }
});

export default mongoose.model("Portfolio", portfolioSchema);