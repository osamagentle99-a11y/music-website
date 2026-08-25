import api from "../api";

export const getSongs = async () => {
  const res = await api.get("/songs");
  return res.data;
};

export const addSong = async (songData) => {
  const res = await api.post("/songs", songData);
  return res.data;
};

export const deleteSong = async (id) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/songs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};