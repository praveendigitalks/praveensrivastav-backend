import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connection/connect.js";
import index from "./routes/index.routes.js"

const app = express();
app.use(express.json());
  
connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });
app.use("/sp", index );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app ;