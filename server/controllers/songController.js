import Song from "../models/Song.js";

// Get all songs
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(songs);
  } catch (error) {
    console.log("GET SONGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get logged-in user's uploaded songs
export const getMySongs = async (req, res) => {
  try {
    const songs = await Song.find({
      uploadedBy: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      songs,
    });
  } catch (error) {
    console.log("MY UPLOADS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Add new song
export const addSong = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.files?.image?.[0] || !req.files?.audio?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Image and audio are required",
      });
    }

    const imageFile = req.files.image[0];
    const audioFile = req.files.audio[0];

    const imageUrl =
      `http://localhost:5000/uploads/images/${imageFile.filename}`;

    const audioUrl =
      `http://localhost:5000/uploads/songs/${audioFile.filename}`;

    const song = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album || "",
      genre: req.body.genre || "",
      duration: req.body.duration || "",
      image: imageUrl,
      audio: audioUrl,
      uploadedBy: req.user.userId,
    });

    console.log("SONG SAVED:", song);

    res.status(201).json({
      success: true,
      song,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete song
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Check song owner
    if (song.uploadedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own songs",
      });
    }

    await Song.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Song Deleted Successfully",
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};