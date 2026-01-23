

import User from "./../models/user.model.js"

// export const checkPermission = (module, action) => {

//     return async (req,res,next) => {
 

//         const user = await User.findById(req.user.id)
//         .populate({
//             path : "role",
//             populate : { path : "permission"}
//         });

//         const hasResponse = User.role.permission.some(
//             (perm) => perm.module === module && perm.action.includes(action)
//         );

//         if (!hasResponse){
//             return res.status(401).json({message: "Permission Denied !"})
//         }

//         next()

//     }
// }


export const checkPermission = (module, action) => {
  return async (req, res, next) => {

    const user = await User.findById(req.user.id)
      .populate({
        path: "role",
        populate: { path: "permission" }
      });

    if (!user || !user.role || !user.role.permission) {
      return res.status(403).json({ message: "Permission data missing" });
    }

    const permission = user.role.permission;

    const hasPermission =
      permission.module === module &&
      permission.actions.includes(action);

    if (!hasPermission) {
      return res.status(401).json({ message: "Permission Denied!" });
    }

    next();
  };
};
