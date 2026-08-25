import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.fieldname === "image") {
      cb(null, "uploads/images");
    } else if (file.fieldname === "audio") {
      cb(null, "uploads/songs");
    }

  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
    );
  },
});

const upload = multer({ storage });

export default upload;