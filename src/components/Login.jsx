import React, { useState } from "react";
/* import { useNavigate } from "react-router-dom"; */

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  /* const navigate = useNavigate(); */

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        /* navigate("/dashboard"); */ // Redirect after successful login
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-row gap-4 mt-4 mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-lg w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <button
          /* onClick={() => navigate("/register")} */
          className="mt-4 text-blue-500 underline w-full text-center"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
