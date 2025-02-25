import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({ 
  origin: "https://itad-table-project-f4hmuk13d-patryks-projects-e3db33f8.vercel.app",  
  credentials: true 
}));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
