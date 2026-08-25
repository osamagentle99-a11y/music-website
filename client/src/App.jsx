import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MusicCard from "./components/MusicCard";
import Trending from "./components/Trending";
import AlbumSection from "./components/AlbumSection";
import Footer from "./components/Footer";
import UploadSong from "./components/UploadSong";
import Login from "./components/Login";
import Register from "./components/Register";
import MyUploads from "./components/MyUploads";
import MyPlaylists from "./components/MyPlaylists";


function GuestRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Home() {
  return (
    <>
      <Hero />
      <MusicCard />
      <Trending />
      <AlbumSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/upload"
            element={
        <ProtectedRoute>
            <UploadSong />
        </ProtectedRoute>
        }
        />
        <Route
  path="/login"
  element={
    <GuestRoute>
      <Login />
    </GuestRoute>
  }
/>

<Route
  path="/register"
  element={
    <GuestRoute>
      <Register />
    </GuestRoute>
  }
/>
<Route
  path="/my-playlists"
  element={<MyPlaylists />}
/>
<Route
  path="/my-uploads"
  element={
    <ProtectedRoute>
      <MyUploads />
    </ProtectedRoute>
  }
/>
      </Routes>
    </>
  );
}

export default App;