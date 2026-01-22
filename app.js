import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./connection/connect.js";
import index from "./routes/index.routes.js";

dotenv.config();

const app = express();

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- CORS ---------- */
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------- PREFLIGHT (WORKS IN EXPRESS 4) ---------- */


/* ---------- DB ---------- */
connectDB();

/* ---------- ROUTES ---------- */
app.use("/sp", index);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
