import Song from "../models/Song.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

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

    // =========================
    // Cloudinary Upload Function
    // =========================
    const uploadToCloudinary = (file, resourceType, folder) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: resourceType,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        Readable.from(file.buffer).pipe(stream);
      });
    };

    // =========================
    // Upload Image
    // =========================
    const imageResult = await uploadToCloudinary(
      imageFile,
      "image",
      "music-website/images"
    );

    console.log("CLOUDINARY IMAGE:", imageResult.secure_url);

    // =========================
    // Upload Audio
    // =========================
    const audioResult = await uploadToCloudinary(
      audioFile,
      "video",
      "music-website/songs"
    );

    console.log("CLOUDINARY AUDIO:", audioResult.secure_url);

    // =========================
    // Save Song in MongoDB
    // =========================
    const song = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album || "",
      genre: req.body.genre || "",
      duration: req.body.duration || "",

      image: imageResult.secure_url,
      audio: audioResult.secure_url,

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