import mongoose from "mongoose";

const roleScehma = new mongoose.schema({

    roleName : {
        type : String,
        require : true
    },
    permission : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Permission"
    }
})

export default mongoose.schema("Role", roleScehma)