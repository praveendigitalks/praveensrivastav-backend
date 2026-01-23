import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({

    position : {
        type : String,
        require : true
    },
    description : {
        type : String,
    },
    dob : {
        type : Date,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    state : {
        type : String,
        require : true
    },
    country : {
        type : String,
        require : true
    },
    degree : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
});

export default mongoose.model("About", aboutSchema)