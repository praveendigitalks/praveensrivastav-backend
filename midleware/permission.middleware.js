import User from "./../models/user.model.js";
import Permission from "../models/permission.model.js";
import Role from "../models/role.model.js";

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
    const user = await User.findById(req.user._id).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });
    // console.log("🚀 ~ checkPermission ~ user:", user);

    const role = await Role.findById(user.role._id).populate("permissions");
    // const permission = user?.role?.permission;
    // console.log("🚀 ~ checkPermission ~ permission:", role);

    if (!user || !user.role || !role.permissions) {
      return res.status(403).json({ message: "Permission data missing" });
    }

    const hasPermission = role.permissions.some(
      (permission) =>
        permission.module === module && permission.actions.includes(action),
    );

    if (!hasPermission) {
      return res.status(401).json({ message: "Permission Denied!" });
    }

    next();
  };
};
// export const checkPermission = (module, action) => {
//   return async (req, res, next) => {
//     if (req.user.isSuperAdmin) return next();

//     const user = req.user;
//     console.log("🚀 ~ checkPermission ~ user:", user._id)

//     const role =await User.findById(req.user._id).populate(
//        "role"
//       // populate: {
//       //   path: "permissions" }
//     );
//     console.log("🚀 ~ checkPermission ~ role:", role);
//     // console.log("🚀 ~ checkPermission ~ permissions:", permissions);

//     const permission = await Permission.find(
//       p => p.module === module
//     );

//     console.log("🚀 ~ checkPermission ~ permission:", permission);

//     if (!permission || !permission.actions.includes(action)) {
//       return res.status(403).json({
//         message: "Permission denied"
//       });
//     }

//     next();
//   };
// };
