import { useEffect, useRef, useState } from "react";

const API_URL = "https://music-website-z7h7.onrender.com";
const getMediaUrl = (url, type) => {
  if (!url) return "";

  // Old localhost URL ko Render URL mein convert
  if (url.startsWith("http://localhost:5000")) {
    return url.replace(
      "http://localhost:5000",
      API_URL
    );
  }

  // Agar sirf filename/path hai
  if (!url.startsWith("http")) {
    return `${API_URL}/uploads/${type}/${url.split("/").pop()}`;
  }

  return url;
};
function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
const [playlistName, setPlaylistName] = useState("");
const [playlistDescription, setPlaylistDescription] = useState("");

  const playerRef = useRef(null);

  // =========================
  // GET MY PLAYLISTS
  // =========================
  const fetchPlaylists = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (!token) {
      console.log("TOKEN NOT FOUND");
      setLoading(false);
      return;
    }

    const res = await fetch(`${API_URL}/api/playlists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("PLAYLIST STATUS:", res.status);

    const data = await res.json();

    console.log("PLAYLIST RESPONSE:", data);

    if (data.success) {
      setPlaylists(data.playlists || []);
    } else {
      console.log("PLAYLIST ERROR:", data.message);
      setPlaylists([]);
    }
  } catch (error) {
    console.log("MY PLAYLISTS ERROR:", error);
    setPlaylists([]);
  } finally {
    setLoading(false);
  }
};

const createPlaylist = async () => {
  if (!playlistName.trim()) {
    alert("Playlist name enter karo");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://music-website-z7h7.onrender.com/api/playlists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Playlist created successfully 🎵");

      setPlaylistName("");
      setPlaylistDescription("");
      setShowCreateForm(false);

      fetchPlaylists();
    } else {
      alert(data.message || "Playlist create nahi hui");
    }
  } catch (error) {
    console.log("CREATE PLAYLIST ERROR:", error);
    alert("Playlist create nahi hui ❌");
  }
};

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // =========================
  // GET ALL SONGS
  // =========================
  const getAllSongs = () => {
    const songs = [];

    playlists.forEach((playlist) => {
      playlist.songs?.forEach((song) => {
        if (!songs.some((item) => item._id === song._id)) {
          songs.push(song);
        }
      });
    });

    return songs;
  };

  // =========================
  // PLAY SONG
  // =========================
  const handlePlay = (song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  };

  // =========================
  // PLAY CURRENT SONG
  // =========================
  useEffect(() => {
    if (!currentSong || !playerRef.current) return;

    const audio = playerRef.current;

    audio.load();

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("PLAY ERROR:", error);
        setIsPlaying(false);
      }
    };

    playAudio();
  }, [currentSong]);

  // =========================
  // PLAY / PAUSE
  // =========================
  const togglePlay = async () => {
    if (!playerRef.current || !currentSong) return;

    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await playerRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("PLAY ERROR:", error);
      }
    }
  };

  // =========================
  // PREVIOUS
  // =========================
  const handlePrevious = () => {
    const songs = getAllSongs();

    if (!currentSong || songs.length === 0) return;

    const currentIndex = songs.findIndex(
      (song) => song._id === currentSong._id
    );

    const previousIndex =
      currentIndex <= 0
        ? songs.length - 1
        : currentIndex - 1;

    setCurrentSong(songs[previousIndex]);
  };

  // =========================
  // NEXT
  // =========================
  const handleNext = () => {
    const songs = getAllSongs();

    if (!currentSong || songs.length === 0) return;

    const currentIndex = songs.findIndex(
      (song) => song._id === currentSong._id
    );

    const nextIndex =
      currentIndex === songs.length - 1
        ? 0
        : currentIndex + 1;

    setCurrentSong(songs[nextIndex]);
  };

  // =========================
  // REMOVE SONG
  // =========================
  const handleRemoveSong = async (playlistId, songId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this song from playlist?"
    );

    if (!confirmRemove) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/playlists/${playlistId}/songs/${songId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Song removed from playlist ❌");

        if (currentSong?._id === songId) {
          playerRef.current?.pause();
          setCurrentSong(null);
          setIsPlaying(false);
          setCurrentTime(0);
          setDuration(0);
        }

        fetchPlaylists();
      } else {
        alert(data.message || "Failed to remove song");
      }
    } catch (error) {
      console.log("REMOVE SONG ERROR:", error);
      alert("Failed to remove song ❌");
    }
  };

  // =========================
  // FORMAT TIME
  // =========================
  const formatTime = (time) => {
    if (!time || isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="container text-center mt-5 pt-5">
        <h3>Loading Playlists... 🎵</h3>
      </div>
    );
  }

  return (
 <div className="container mt-5 pt-5 playlist-page">

    

    <div className="row">

      {/* ================= PLAYER ================= */}
      <div className="col-lg-4 col-md-5 playlist-player-wrapper">

       <div className="card shadow p-4 text-center playlist-player">

          {currentSong ? (
            <>
             <img
  src={getMediaUrl(currentSong.image, "images")}
  alt={currentSong.title}
  style={{
    width: "250px",
    height: "200px",
    objectFit: "cover",
    margin: "auto",
    borderRadius: "15px",
  }}
/>

              <h2 className="mt-3">
                {currentSong.title}
              </h2>

              <p className="text-muted">
                {currentSong.artist}
              </p>

              {/* Controls */}
              <div className="d-flex justify-content-center gap-2 mt-3">

                <button
                  className="btn btn-dark"
                  onClick={handlePrevious}
                >
                  ⏮
                </button>

                <button
                  className="btn btn-success"
                  onClick={togglePlay}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  className="btn btn-dark"
                  onClick={handleNext}
                >
                  ⏭
                </button>

              </div>

              {/* Progress */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  if (playerRef.current) {
                    playerRef.current.currentTime =
                      Number(e.target.value);

                    setCurrentTime(
                      Number(e.target.value)
                    );
                  }
                }}
                className="form-range mt-3"
              />

              <div className="d-flex justify-content-between">
                <small>
                  {formatTime(currentTime)}
                </small>

                <small>
                  {formatTime(duration)}
                </small>
              </div>

              <audio
                ref={playerRef}
                src={getMediaUrl(currentSong.audio, "songs")}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() => {
                  if (playerRef.current) {
                    setCurrentTime(
                      playerRef.current.currentTime
                    );
                  }
                }}
                onLoadedMetadata={() => {
                  if (playerRef.current) {
                    setDuration(
                      playerRef.current.duration
                    );
                  }
                }}
                onEnded={handleNext}
              />

            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: "60px",
                  color: "#6f5aa8",
                }}
              >
                🎵
              </div>

              <h5 className="mt-3">
                Select a song
              </h5>

              <p className="text-muted">
                Choose a song from your playlist to
                start playing.
              </p>
            </>
          )}

        </div>

      </div>


     {/* ================= PLAYLISTS ================= */}
<div className="col-12 col-lg-8 order-2 order-lg-1 playlist-list">

  {/* Heading + Create Button */}
  <div className="d-flex justify-content-between align-items-center mb-4">
   
    <button
      className="btn btn-warning"
      onClick={() => setShowCreateForm(!showCreateForm)}
    >
      ➕ Create Playlist
    </button>

  </div>

  {/* Create Playlist Form */}
  {showCreateForm && (
    <div className="card shadow p-4 mb-4">

      <h4>Create New Playlist 🎵</h4>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Description"
        value={playlistDescription}
        onChange={(e) =>
          setPlaylistDescription(e.target.value)
        }
      />

      <button
        className="btn btn-success"
        onClick={createPlaylist}
      >
        Create Playlist
      </button>

    </div>
  )}

  {/* YAHAN tumhara existing playlists.length wala code rahega */}

        {playlists.length === 0 ? (

          <div className="text-center">
            <h3>No playlists found</h3>

            <p className="text-muted">
              Create your first playlist to get started.
            </p>
          </div>

        ) : (

          playlists.map((playlist) => (

            <div
              className="card shadow mb-4"
              key={playlist._id}
            >

              <div className="card-body">

                <h4 className="card-title">
                  🎵 {playlist.name}
                </h4>

                <p className="text-muted">
                  {playlist.description ||
                    "No description"}
                </p>

                <hr />

                <h6>
                  Songs: {playlist.songs?.length || 0}
                </h6>


                {/* Songs */}
                {playlist.songs?.length > 0 ? (

                  playlist.songs.map((song) => (

                    <div
                      key={song._id}
                      className="border rounded p-3 mb-3"
                    >

                      <strong>
                        {song.title}
                      </strong>

                      <br />

                      <small className="text-muted">
                        {song.artist}
                      </small>

                      <div className="mt-3">

                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handlePlay(song)
                          }
                        >
                          ▶ Play
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleRemoveSong(
                              playlist._id,
                              song._id
                            )
                          }
                        >
                          ❌ Remove
                        </button>

                      </div>

                    </div>

                  ))

                ) : (

                  <p className="text-muted mt-3">
                    No songs in this playlist.
                  </p>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  </div>
);
}

export default MyPlaylists;