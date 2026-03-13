// import User from "./../models/user.model.js";
// import Permission from "../models/permission.model.js";
// import Role from "../models/role.model.js";

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

// export const checkPermission = (module, action) => {
//   return async (req, res, next) => {
//     const user = await User.findById(req.user._id).populate({
//       path: "role",
//       populate: {
//         path: "permissions",
//       },
//     });
//     // console.log("🚀 ~ checkPermission ~ user:", user);

//     const role = await Role.findById(user.role._id).populate("permissions");
//     // const permission = user?.role?.permission;
//     // console.log("🚀 ~ checkPermission ~ permission:", role);

//     if (!user || !user.role || !role.permissions) {
//       return res.status(403).json({ message: "Permission data missing" });
//     }

//     const hasPermission = role.permissions.some(
//       (permission) =>
//         permission.module === module && permission.actions.includes(action),
//     );

//     if (!hasPermission) {
//       return res.status(401).json({ message: "Permission Denied!" });
//     }

//     next();
//   };
// };
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
// middleware/permission.middleware.js
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

// already have: export const protect = ...

export const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      // safety: ensure protect has run
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: no user on request' });
      }

      // load fresh user with role + permissions (if needed)
      const user = await User.findById(req.user._id)
        .populate({
          path: 'role',
          populate: { path: 'permissions' },
        })
        .populate({
          path: 'tenantId', // root tenant doc
          populate: {
            path: 'subscription.planId',
          },
        });

      if (!user) {
        return res.status(401).json({ message: 'Invalid session' });
      }

      const norm = (v) => (v || '').toString().trim().toUpperCase();

      const check = (perms, label) => {
        if (!Array.isArray(perms)) return false;
        const entry = perms.find((p) => norm(p.module) === norm(module));
        return (
          !!entry &&
          Array.isArray(entry.actions) &&
          entry.actions.map(norm).includes(norm(action))
        );
      };

      // 1) Plan‑level (tenant subscription plan modulePermissions)
      const tenant = user.tenantId; // populated above
      const planPerms = tenant?.subscription?.planId?.modulePermissions;
      if (check(planPerms, 'plan.modulePermissions')) {
        return next();
      }

      // 2) Role‑level
      const rolePerms = user.role?.permissions || [];
      if (check(rolePerms, 'role.permissions')) {
        return next();
      }

      // 3) User‑level (direct user permissions)
      const userPerms = user.permissions || [];
      if (check(userPerms, 'user.permissions')) {
        return next();
      }

      return res.status(401).json({ message: 'Permission Denied!' });
    } catch (err) {
      console.error('checkPermission error:', err);
      return res.status(500).json({ message: 'Permission check failed' });
    }
  };
};
