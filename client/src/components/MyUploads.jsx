import { useEffect, useState } from "react";
import axios from "axios";

function MyUploads() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyUploads();
  }, []);

  const fetchMyUploads = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/songs/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setSongs(res.data.songs);
      }
    } catch (error) {
      console.log(
        "MY UPLOADS ERROR:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete song
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this song?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/songs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Song deleted successfully 🗑️");

        // Card ko immediately remove karo
        setSongs((prevSongs) =>
          prevSongs.filter((song) => song._id !== id)
        );
      }
    } catch (error) {
      console.log(
        "DELETE ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete song"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <h3>Loading your uploads... 🎵</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">

      <h2 className="text-center mb-4">
        My Uploads 🎵
      </h2>

      {songs.length === 0 ? (
        <div className="text-center">
          <p>You haven't uploaded any songs yet.</p>

          <a
            href="/upload"
            className="btn btn-success"
          >
            Upload Your First Song
          </a>
        </div>
      ) : (
        <div className="row g-4">

          {songs.map((song) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={song._id}
            >
              <div className="card shadow h-100">

                <img
                  src={song.image}
                  className="card-img-top"
                  alt={song.title}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h5 className="card-title">
                    {song.title}
                  </h5>

                  <p className="card-text mb-1">
                    <strong>Artist:</strong>{" "}
                    {song.artist}
                  </p>

                  <p className="card-text mb-1">
                    <strong>Album:</strong>{" "}
                    {song.album || "N/A"}
                  </p>

                  <p className="card-text mb-3">
                    <strong>Genre:</strong>{" "}
                    {song.genre || "N/A"}
                  </p>

                  <audio
                    controls
                    className="w-100 mb-3"
                    src={song.audio}
                  />

                  {/* Delete Button */}
                  <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                      handleDelete(song._id)
                    }
                  >
                    🗑️ Delete Song
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyUploads;