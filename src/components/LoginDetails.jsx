import React from "react";
import "../styles/Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginImg from "../images/login[1].svg";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import PasswordInput from "./PasswordInput";

export default function LoginDetails() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUserData = localStorage.getItem("userData");
    const authToken = Math.random().toString(36).substring(2);

    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);

      if (email === parsedUserData.email && password === parsedUserData.password) {
        localStorage.setItem("authToken", JSON.stringify(authToken));
        toast.info("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
        })
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);

      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Please check your email and password.",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Account Found",
        text: "No account found with the provided credentials. Please sign up first.",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/signup", { state: { from: location.pathname } });
      });
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="img">
        <img src={LoginImg} />
      </div>
      <div className="form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <PasswordInput
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </PasswordInput>
              <p className="forgot-password text-right mt-2">
                <Link to="/forgot-password"
                  style={{ textDecoration: "none" }}
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn"
                style={{ background: " #e1997e" }}
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Don't have an account?
              <Link to="/SignUp" style={{ textDecoration: "none", marginLeft: "6px" }}>SignUp</Link>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}
