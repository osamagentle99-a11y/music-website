import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import songRoutes from "./routes/songRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectDB();

const app = express();

// ES module mein __dirname banane ke liye
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Song routes
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on `);
});