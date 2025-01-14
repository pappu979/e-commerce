import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginImg from "../assets/images/login[1].svg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import PasswordInput from "./PasswordInput";
import { validateLoginForm } from "../utils/validationUtilis";
import { useSelector, useDispatch } from "react-redux";
import {
  updateLoginField,
  setLoginErrors,
  resetLoginForm,
} from "../reducres/authReducer";
import { setCurrentUser } from "../reducres/userReducer";
import { API_URL } from "../config";
import { ROUTES } from "../constants/routes";
import { CONSTANTS } from "../constants";
import "../assets/styles/Login.css";

export default function LoginDetails() {
  const loginState = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeLoginField = (e) => {
    const { name, value } = e.target;
    dispatch(updateLoginField({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL);
      const users = await response.json();

      const user = users.find(
        (user) =>
          user.email === loginState.email &&
          user.password === loginState.password
      );

      if (user) {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const errors = validateLoginForm(loginState);

        if (Object.keys(errors).length > 0) {
          dispatch(setLoginErrors(errors));
          return;
        }
        dispatch(setCurrentUser(user));
        dispatch(resetLoginForm());
        const redirectTo = location.state?.from || ROUTES.DEFAULT_PATH;
        navigate(redirectTo);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Please check your email and password.",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No Account Found",
        text: "No account found with the provided credentials. Please sign up first.",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate(ROUTES.SIGN_UP, { state: { from: location.pathname } });
      });
    }
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
              <label>{CONSTANTS.EMAIL_ADDRESS}</label>
              <input
                type="email"
                className="form-control mt-1"
                name="email"
                value={loginState.email}
                onChange={handleChangeLoginField}
              />
              {loginState.errors.email && (
                <span className="error-message">{loginState.errors.email}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label>{CONSTANTS.PASSWORD}</label>
              <PasswordInput
                type="password"
                name="password"
                value={loginState.password}
                onChange={handleChangeLoginField}
              ></PasswordInput>
              {loginState.errors.password && (
                <span className="error-message">
                  {loginState.errors.password}
                </span>
              )}
              <p className="forgot-password text-right mt-2">
                <Link
                  to={ROUTES.FORGOT_PAAWORD}
                  style={{ textDecoration: "none" }}
                >
                  {CONSTANTS.FORGOT_PASSWORD}
                </Link>
              </p>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn"
                style={{
                  background: " #e1997e",
                  color: "white",
                  fontWeight: "800",
                }}
              >
                {CONSTANTS.LOGIN}
              </button>
            </div>
            <p
              className="forgot-password text-right mt-2"
              style={{ color: "#e1997e" }}
            >
              {CONSTANTS.DONT_ACCOUNT}
              <Link
                to={ROUTES.SIGN_UP}
                style={{
                  textDecoration: "none",
                  marginLeft: "8px",
                }}
              >
                {CONSTANTS.SIGN_UP}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
