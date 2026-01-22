import mongoose from "mongoose";

const roleScehma = new mongoose.Schema({

    roleName : {
        type : String,
        require : true
    },
    permission : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Permission"
    }
})

    export default mongoose.model("Role", roleScehma)