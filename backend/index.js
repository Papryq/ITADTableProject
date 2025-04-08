import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
// import { fs } from "fs";
// import { path } from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// const loadDataFromFile = () => {
//   try {
//     const filePath = path.join(__dirname, "dumb-data", "dumb-data.json");
//     const rawData = fs.readfileSync(filePath, 'utf-8');
//     const data = JSON.parse(rawData);
//     return data
//   } catch (error) {
//     console.error('Błąd przy wczytywaniu pliku:', err);
//     return [];
//   }
// }

const allowedOrigins = [
  "https://itad-table-project.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.options("*", cors()); 
// app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
