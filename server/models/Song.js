import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Song", songSchema);