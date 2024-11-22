import React from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import signupImage from "../images/sign.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignupDetail.css";
import PasswordInput from "./PasswordInput";
import { signupReducer, intialState } from "../reducer/signupReducer";

function SignupDetail() {
  const [state, dispatch] = React.useReducer(signupReducer, intialState);

  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeSignupField = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!state.username) errors.username = "Username is required";
    if (!state.email.includes('@')) errors.email = "Email is invalid";
    if (state.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (state.mobileNumber.length < 10) errors.mobileNumber = "MobileNumber must be at least 10 characters";

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    const authToken = Math.random().toString(36).substring(2);

    const userData = {
      ...state,
      token: authToken
    };

    const rawData = localStorage.getItem("userData");
    let existingUsers = [];

    if (rawData) {
      try {
        const parsedData = JSON.parse(rawData);
        existingUsers = Array.isArray(parsedData) ? parsedData : [];
      } catch (error) {
        console.error("Failed to parse user data:", error);
        existingUsers = [];
      }
    }
    const userIndex = existingUsers.findIndex((user) => user.email === state.email);

    if (userIndex !== -1) {
      // Update existing user
      existingUsers[userIndex] = userData;
    } else {
      // Add new user
      existingUsers.push(userData);
    }

    localStorage.setItem("userData", JSON.stringify(existingUsers));
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("currentUserEmail", state.email);
    localStorage.setItem("currentUser", JSON.stringify(state));

    Swal.fire({
      icon: "success",
      title: "Form Submitted",
      text: "Data has been stored successfully!",
      confirmButtonText: "Ok",
    }).then(() => {
      dispatch({ type: "RESET_FORM" });
    });
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo);
  };


  return (
    <>
      <div className="container">
        <div className="row my-4">
          <div className="signup-image col-md-6">
            <img src={signupImage} alt="Login" />
          </div>
          <div className="signup-form col-md-6">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={state.username}
                  onChange={handleChangeSignupField}
                />
                {state.errors.username && <span className="error-message">{state.errors.username}</span>}
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChangeSignupField}
                />
                {state.errors.email && <span className="error-message">{state.errors.email}</span>}
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <PasswordInput
                  type="number"
                  name="password"
                  value={state.password}
                  onChange={handleChangeSignupField}
                ></PasswordInput>
                {state.errors.password && <span className="error-message">{state.errors.password}</span>}
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="number"
                  name="mobileNumber"
                  value={state.mobileNumber}
                  onChange={handleChangeSignupField}
                />
                {state.errors.mobileNumber && <span className="error-message">{state.errors.mobileNumber}</span>}
              </Form.Group>

              <div style={{ marginTop: "20px" }}>
                <Form.Group controlId="formGridCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
              </div>

              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Form>

            <p className="sign-up">
              Already have an account? <Link to="/login" style={{ textDecoration: "none", marginLeft: "6px" }}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupDetail;
