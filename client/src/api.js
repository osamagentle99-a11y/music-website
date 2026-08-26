import axios from "axios";

const api = axios.create({
  baseURL: "https://music-website-z7h7.onrender.com/api",
});

export default api;