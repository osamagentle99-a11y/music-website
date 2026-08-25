import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";

// Create Playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Playlist name is required",
      });
    }

    const playlist = await Playlist.create({
      name: name.trim(),
      description: description || "",
      createdBy: req.user.userId,
      songs: [],
    });

    res.status(201).json({
      success: true,
      message: "Playlist created successfully 🎵",
      playlist,
    });
  } catch (error) {
    console.log("CREATE PLAYLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get My Playlists
export const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({
      createdBy: req.user.userId,
    })
      .populate("songs")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      playlists,
    });
  } catch (error) {
    console.log("GET PLAYLISTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Add Song to Playlist
export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({
        success: false,
        message: "Song ID is required",
      });
    }

    const playlist = await Playlist.findOne({
      _id: playlistId,
      createdBy: req.user.userId,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Check duplicate song
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song already exists in this playlist",
      });
    }

    playlist.songs.push(songId);

    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Song added to playlist 🎵",
      playlist,
    });
  } catch (error) {
    console.log("ADD SONG PLAYLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Remove Song from Playlist
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findOne({
      _id: playlistId,
      createdBy: req.user.userId,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );

    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Song removed from playlist",
      playlist,
    });
  } catch (error) {
    console.log("REMOVE SONG ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Playlist
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    await Playlist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    console.log("DELETE PLAYLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};