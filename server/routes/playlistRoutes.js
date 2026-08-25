import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPlaylist,
  getMyPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

// Create playlist
router.post(
  "/",
  authMiddleware,
  createPlaylist
);

// Get my playlists
router.get(
  "/",
  authMiddleware,
  getMyPlaylists
);

// Add song to playlist
router.post(
  "/:playlistId/songs",
  authMiddleware,
  addSongToPlaylist
);

// Remove song from playlist
router.delete(
  "/:playlistId/songs/:songId",
  authMiddleware,
  removeSongFromPlaylist
);

// Delete playlist
router.delete(
  "/:id",
  authMiddleware,
  deletePlaylist
);

export default router;