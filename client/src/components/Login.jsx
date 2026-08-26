import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://music-website-z7h7.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        // JWT token save
        localStorage.setItem("token", res.data.token);

        // User information save
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login successful ✅");

        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data || error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;