import mongoose from "mongoose";

const contactScehma = new mongoose.Schema({

    name : {
        type : String
    },
    email : {
        type: String
    },
    subject : {
        type : String
    },
    message : {
        type : String
    }
});

export default mongoose.model("Contact", contactScehma)