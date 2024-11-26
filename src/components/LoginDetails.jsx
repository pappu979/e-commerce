import React from "react";
import "../styles/Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginImg from "../images/login[1].svg";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import PasswordInput from "./PasswordInput";
import { storeUserData, createAuthToken } from "../utils/authKeys";
import { setLocalStorageLoginUserData } from "../validation/localStorage";
import { validateLoginForm } from "../validation/validation";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginField, setLoginErrors, resetLoginForm } from "../features/authslice";
import { setCurrentUser } from "../features/userSlice";

export default function LoginDetails() {
  const loginState = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeLoginField = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginField({field: name, value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateLoginForm(loginState);

    if (Object.keys(errors).length > 0) {
      dispatch(setLoginErrors(errors));
      return;
    }

    if (storeUserData) {  
      const user = storeUserData.find((user) => user.email === loginState.email && user.password === loginState.password);
      if (user) {
        setLocalStorageLoginUserData(createAuthToken, user);
        dispatch(setCurrentUser(user))
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

    dispatch(resetLoginForm());
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
                value={loginState.email}
                onChange={handleChangeLoginField}
              />
              {loginState.errors.email && <span className="error-message">{loginState.errors.email}</span>}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <PasswordInput
                type="password"
                name="password"
                value={loginState.password}
                onChange={handleChangeLoginField}
              >
              </PasswordInput>
              {loginState.errors.password && <span className="error-message">{loginState.errors.password}</span>}
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
