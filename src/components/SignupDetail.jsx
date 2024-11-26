import React from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import signupImage from "../images/sign.png";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { createAuthToken } from "../utils/authKeys";
import { validateForm } from "../validation/validation";
import { storeUserData } from "../utils/authKeys";
import { setLocalStorageSignupUserData } from "../validation/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { updateSignupField, resetSignupForm, setSignupErrors } from "../features/authslice";
import { setCurrentUser } from "../features/userSlice";
import "../styles/SignupDetail.css";

function SignupDetail() {
  const signupState = useSelector((state) => state.auth.signup);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeSignupField = (e) => {
    const { name, value } = e.target;
    dispatch(updateSignupField({field: name, value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      ...signupState,
      token: createAuthToken
    };
    const errors = validateForm(signupState);
    let existingUsers = [];

    if (Object.keys(errors).length > 0) {
      dispatch(setSignupErrors(errors));
      return;
    }

    if (storeUserData) {
      try {
        existingUsers = Array.isArray(storeUserData) ? storeUserData : [];
      } catch (error) {
        console.error("Failed to parse user data:", error);
        existingUsers = [];
      }
    }
    const userIndex = existingUsers.findIndex((user) => user.email === signupState.email);

    if (userIndex !== -1) {
      // Update existing user
      existingUsers[userIndex] = userData;
    } else {
      // Add new user
      existingUsers.push(userData);
    }
    setLocalStorageSignupUserData(existingUsers, createAuthToken, signupState);
    dispatch(setCurrentUser(signupState))

    Swal.fire({
      icon: "success",
      title: "Form Submitted",
      text: "Data has been stored successfully!",
      confirmButtonText: "Ok",
    }).then(() => {
      dispatch(resetSignupForm());
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
                  value={signupState.username}
                  onChange={handleChangeSignupField}
                />
                {signupState.errors.username && <span className="error-message">{signupState.errors.username}</span>}
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={signupState.email}
                  onChange={handleChangeSignupField}
                />
                {signupState.errors.email && <span className="error-message">{signupState.errors.email}</span>}
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <PasswordInput
                  type="number"
                  name="password"
                  value={signupState.password}
                  onChange={handleChangeSignupField}
                ></PasswordInput>
                {signupState.errors.password && <span className="error-message">{signupState.errors.password}</span>}
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="number"
                  name="mobileNumber"
                  value={signupState.mobileNumber}
                  onChange={handleChangeSignupField}
                />
                {signupState.errors.mobileNumber && <span className="error-message">{signupState.errors.mobileNumber}</span>}
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
