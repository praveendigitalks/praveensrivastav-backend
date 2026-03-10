import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/tenant"); // match your folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const allowed = ["image/png","image/jpeg","image/jpg","image/webp","image/x-icon"];

const fileFilter = (req, file, cb) => {
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

export const uploadTenantImage = multer({
  storage,
  fileFilter,
});
