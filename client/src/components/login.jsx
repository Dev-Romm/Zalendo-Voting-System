import { Link, useNavigate } from "react-router-dom";
import Register from "./register";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ElectionContext } from "../contexts/Globalcontext";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(ElectionContext);
 

  async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = event.target.email.value;
    const password = event.target.password.value;
    const category = event.target.category.value;

    try {
      const response = await axios.get(`http://localhost:5002/api/${category}`);
      const users = response.data?.users || [];

      const authenticateUser = (users, role) => {
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === email && users[i].password === password) {
            setUserDetails(users[i]); // Set user details in context
            toast.success(
              `${role} login successful! Redirecting to the ${role} dashboard.`
            );
            navigate(`/${role}`); // Redirect to user dashboard
            return true;
          }
        }
        return false;
      };


      // Redirect to the appropriate page based on the category
      if (category === "admin") {
        if (!authenticateUser(users, "Admin")) {
          alert("Invalid admin email or password. Please try again!");
        }
      } else if (category === "voter") {
        if (!authenticateUser(users, "Voter")) {
          alert("Invalid voter email or password. Please try again!");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img src="218557985.png" alt="Logo" className="logo" />
      </div>
      <div className="login-details-container">
        <h2>Welcome to the Campus Voting System</h2>
        <p>Your one-stop solution for secure and efficient voting.</p>
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-group">
            <label htmlFor="login-email">Email</label>
            <input type="email" id="loginemail" name="email" required />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="loginpassword"
              name="password"
              required
            />
          </div>
          <div className="login-form-group">
            <span>Category:</span>
            <label htmlFor="admin">Admin</label>
            <input
              type="radio"
              id="admin"
              name="category"
              value="admin"
              required
            />
            <label htmlFor="voter">Voter</label>
            <input
              type="radio"
              id="voter"
              name="category"
              value="voter"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
