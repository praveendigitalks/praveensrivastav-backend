

import User from "./../models/user.model"

export const checkPermission = (module, action) => {

    return async (req,res,next) => {
 

        const user = await User.findById(req.user.id)
        .populate({
            path : "role",
            populate : { path : "permission"}
        });

        const hasResponse = User.role.permission.some(
            (perm) => perm.module === module && perm.action.includes(action)
        );

        if (!hasResponse){
            return res.status(401).json({message: "Permission Denied !"})
        }

        next()

    }
}