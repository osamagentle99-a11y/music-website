import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSongs,
  getMySongs,
  addSong,
  deleteSong,
} from "../controllers/songController.js";


const router = express.Router();

// Get all songs
router.get("/", getSongs);

// Get logged-in user's songs
router.get("/my", authMiddleware, getMySongs);

// Add new song
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong
);


// Delete song
router.delete("/:id", authMiddleware, deleteSong);

export default router;