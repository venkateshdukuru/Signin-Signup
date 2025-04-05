import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // For navigation after login

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess("Login successful! Redirecting...");
        
        // Store token (if backend sends JWT or session token)
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="addUser1">
      <h3>Sign in</h3>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <div className="forgot-password">
            <p>
              <Link to="/forgot-password" className="btn btn-link">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </form>

      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;