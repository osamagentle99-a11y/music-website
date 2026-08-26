const API_URL = "https://music-website-z7h7.onrender.com";
import playImage from "../assets/images/playk.png";
import { useState, useEffect, useRef } from "react";
import bg1 from "../assets/images/bg1.jpg";
import bg2 from "../assets/images/bg2.jpg";
import bg3 from "../assets/images/bg3.jpg";
import { getSongs, deleteSong } from "../services/songService";

function MusicCard() {
  const images = [bg1, bg2, bg3, bg2];

const [index, setIndex] = useState(0);
const [songs, setSongs] = useState([]);
const [search, setSearch] = useState("");
const [playingId, setPlayingId] = useState(null);
const [playlists, setPlaylists] = useState([]);
const [selectedPlaylist, setSelectedPlaylist] = useState(null);


const [currentSong, setCurrentSong] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const user = JSON.parse(localStorage.getItem("user"));
const loggedInUserId = user?.id;

const audioRefs = useRef({});
const playerRef = useRef(null);
useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

const fetchSongs = async () => {
  try {
    const data = await getSongs();
    console.log(data);
    setSongs(data);
  } catch (error) {
    console.log(error);
  }
};
const fetchPlaylists = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await fetch(
      "http://localhost:5000/api/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      setPlaylists(data.playlists);
    }
  } catch (error) {
    console.log("PLAYLIST ERROR:", error);
  }
};
const addToPlaylist = async (playlistId, songId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/playlists/${playlistId}/songs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          songId,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Song added to playlist 🎵");

      setSelectedPlaylist(null);

      fetchPlaylists();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("ADD TO PLAYLIST ERROR:", error);
    alert("Failed to add song to playlist ❌");
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this song?"
  );

  if (!confirmDelete) return;

  try {
    await deleteSong(id);

    alert("Song Deleted Successfully 🗑️");

    // Card list refresh
    fetchSongs();

    // Agar deleted song currently play ho raha tha
    if (currentSong?._id === id) {
      playerRef.current?.pause();
      setCurrentSong(null);
      setIsPlaying(false);
    }

  } catch (error) {
    console.log("Delete Error:", error);
    alert("Delete Failed ❌");
  }
};
const handlePlay = (id) => {
  Object.keys(audioRefs.current).forEach((key) => {
    if (key !== id && audioRefs.current[key]) {
      audioRefs.current[key].pause();
    }
  });

  setPlayingId(id);
};

useEffect(() => {
  fetchSongs();
  fetchPlaylists();
}, []);
const filteredSongs = songs.filter((song) =>
  (song.title || "").toLowerCase().includes(search.toLowerCase()) ||
  (song.artist || "").toLowerCase().includes(search.toLowerCase()) ||
  (song.album || "").toLowerCase().includes(search.toLowerCase()) ||
  (song.genre || "").toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
      <div className="col-12 text-center mt-5">
        <h1
          style={{
            fontFamily: "Lucida Handwriting, Cursive",
            color: "gold",
          }}
        >
          Explore Our Collection
        </h1>
      </div>

      {/* Banner */}
      <div
        id="banner"
        className="container text-center my-5"
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "10px solid gold",
          borderRadius: "20px",
          height: "400px",
          transition: "background-image 0.8s ease-in-out",
        }}
      >
        <img
          src={playImage}
          alt="Play"
          className="img-fluid mb-4"
          width="250"
        />

        <div className="row justify-content-center mb-5">
          <div className="col-lg-6 col-md-8 col-10">
            <div className="input-group shadow">
              <input
                    type="text"
                    className="form-control"
                    placeholder="Search your favorite music..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />

              <button className="btn btn-dark">🔍</button>
            </div>
          </div>
        </div>
      </div>
      {currentSong && (
  <div className="container mb-5">
    <div className="shadow p-4 text-center">

      <img
        src={currentSong.image}
        alt={currentSong.title}
        style={{
          width: "250px",
          height: "250px",
          objectFit: "cover",
          margin: "auto",
          borderRadius: "15px",
        }}
      />

      <h2 className="mt-3">{currentSong.title}</h2>
      <p>{currentSong.artist}</p>
        
      <button
        className="btn btn-success mb-3"
        onClick={() => {
          if (isPlaying) {
            playerRef.current.pause();
          } else {
            playerRef.current.play();
          }
        }}
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>

      <audio
        ref={playerRef}
       src={
  currentSong.audio.startsWith("http")
    ? currentSong.audio
    : `${API_URL}/uploads/songs/${currentSong.audio.split("/").pop()}`
}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() =>
          setCurrentTime(playerRef.current.currentTime)
        }
        onLoadedMetadata={() =>
          setDuration(playerRef.current.duration)
        }
      />

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={(e) => {
          playerRef.current.currentTime = e.target.value;
          setCurrentTime(e.target.value);
        }}
        style={{ width: "100%" }}
      />

      <p>
        {Math.floor(currentTime / 60)}:
        {String(Math.floor(currentTime % 60)).padStart(2, "0")}
        {" / "}
        {Math.floor(duration / 60)}:
        {String(Math.floor(duration % 60)).padStart(2, "0")}
      </p>

    </div>
  </div>
)}

      {/* Songs */}
      <div className="container my-5">
        <div className="row">
        {filteredSongs.length > 0 ? (
        filteredSongs.map((song) => (
      <div className="col-md-6 col-lg-4 mb-4" key={song._id}>
        <div
              className={`card shadow h-100 ${
              playingId === song._id ? "border border-warning border-3" : "" }`}
        >
          <img
 src={
  song.image.startsWith("http")
    ? song.image
    : `${API_URL}/uploads/images/${song.image.split("/").pop()}`
}
  alt={song.title}
  style={{
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "15px",
}}
/>

          <div className="card-body text-center">
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
            <p className="text-muted">{song.album}</p>
            <button
  className="btn btn-success mb-3"
  onClick={() => {
    console.log("SONG:", song);
    console.log("IMAGE:", song.image);
    console.log("AUDIO:", song.audio);

    setCurrentSong(song);

    setTimeout(() => {
      console.log("CURRENT AUDIO:", playerRef.current?.src);
      playerRef.current.play();
      setIsPlaying(true);
    }, 100);
  }}
>
  ▶ Play
</button>
{/* {loggedInUserId === song.uploadedBy?._id && (
  <button
    className="btn btn-danger ms-2"
    onClick={() => handleDelete(song._id)}
  >
    🗑 Delete
  </button>
)} */}
{user && (
  <div className="mt-2">

    <button
      className="btn btn-warning"
      onClick={() =>
        setSelectedPlaylist(
          selectedPlaylist === song._id
            ? null
            : song._id
        )
      }
    >
      ➕ Add to Playlist
    </button>

    {selectedPlaylist === song._id && (
      <div className="card shadow mt-2 p-2">

        <h6 className="mb-2">
          Select Playlist
        </h6>

        {playlists.length === 0 ? (
          <p className="text-muted mb-0">
            No playlists found
          </p>
        ) : (
          playlists.map((playlist) => (
            <button
              key={playlist._id}
              className="btn btn-outline-dark mb-1"
              onClick={() =>
                addToPlaylist(
                  playlist._id,
                  song._id
                )
              }
            >
              🎵 {playlist.name}
            </button>
          ))
        )}

      </div>
    )}

  </div>
)}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12 text-center mt-4">
      <h3>No Songs Found 🎵</h3>
    </div>
  )}
</div>
      </div>
    </>
  );
}

export default MusicCard;