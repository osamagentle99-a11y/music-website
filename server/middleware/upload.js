import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server folder
const serverRoot = path.join(__dirname, "..");

// Upload folders
const imagePath = path.join(serverRoot, "uploads", "images");
const audioPath = path.join(serverRoot, "uploads", "songs");

// Folders automatically create ho jayenge
fs.mkdirSync(imagePath, { recursive: true });
fs.mkdirSync(audioPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, imagePath);
    } else if (file.fieldname === "audio") {
      cb(null, audioPath);
    } else {
      cb(new Error("Invalid file field"));
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname.replace(/\s+/g, "_")
    );
  },
});

const upload = multer({ storage });

export default upload;