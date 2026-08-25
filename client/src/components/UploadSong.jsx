import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadSong() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    duration: "",
  });

  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!formData.title.trim()) {
      alert("Please enter song title");
      return;
    }

    if (!formData.artist.trim()) {
      alert("Please enter artist name");
      return;
    }

    if (!image) {
      alert("Please select song image");
      return;
    }

    if (!audio) {
      alert("Please select MP3 file");
      return;
    }

    console.log("FORM DATA:", formData);
    console.log("IMAGE:", image);
    console.log("AUDIO:", audio);

    const data = new FormData();
    const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  return;
}

    data.append("title", formData.title);
    data.append("artist", formData.artist);
    data.append("album", formData.album);
    data.append("genre", formData.genre);
    data.append("duration", formData.duration);

    data.append("image", image);
    data.append("audio", audio);

    try {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  const res = await axios.post(
    "http://localhost:5000/api/songs",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Song Uploaded Successfully 🎵");

  console.log(res.data);

  navigate("/");
} catch (err) {
  console.log("UPLOAD ERROR:", err.response?.data || err);

  alert(
    err.response?.data?.message || "Upload Failed"
  );
}
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Upload Song
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Title */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              {/* Artist */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
              />

              {/* Album */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Album"
                name="album"
                value={formData.album}
                onChange={handleChange}
              />

              {/* Genre */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />

              {/* Duration */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />

              {/* Image */}
              <label className="mb-2">
                Song Image
              </label>

              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />

              {/* Audio */}
              <label className="mb-2">
                MP3 File
              </label>

              <input
                type="file"
                className="form-control mb-4"
                accept="audio/mpeg,.mp3"
                onChange={(e) => {
                  setAudio(e.target.files[0]);
                }}
              />

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Upload Song
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default UploadSong;