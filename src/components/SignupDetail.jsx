import React from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import signupImage from "../assets/images/sign.png";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { validateForm } from "../utils/validationUtilis";
import { useDispatch } from "react-redux";
import {
  updateSignupField,
  resetSignupForm,
  setSignupErrors,
} from "../reducres/authReducer";
import { setCurrentUser } from "../reducres/userReducer";
import { connect } from "react-redux";
import { API_URL } from "../config";
import { ROUTES } from "../constants/routes";
import { CONSTANTS } from "../constants";
import "../assets/styles/SignupDetail.css";

function SignupDetail({ signupState }) {
  const [isChecked, setIsChecked] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeSignupField = (e) => {
    const { name, value } = e.target;
    dispatch(updateSignupField({ field: name, value }));
  };

  const handleCheckBoxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const getResponse = await fetch(API_URL);
      const users = await getResponse.json();

      const isEmailAlreadyTaken = users.some(
        (user) => user.email === signupState.email
      );
      if (isEmailAlreadyTaken) {
        alert(CONSTANTS.REGISTRED_EMAIL);
        return;
      }

      const errors = validateForm(signupState);

      if (Object.keys(errors).length > 0) {
        dispatch(setSignupErrors(errors));
        return;
      }

      const postResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupState),
      });

      if (postResponse.ok) {
        const newUser = await postResponse.json();
        dispatch(setCurrentUser(newUser));
        Swal.fire({
          icon: "success",
          title: "Form Submitted",
          text: "Data has been stored successfully!",
          confirmButtonText: "Ok",
        }).then(() => {
          dispatch(resetSignupForm());
          const redirectTo = location.state?.from || ROUTES.DEFAULT_PATH;
          navigate(redirectTo);
        });
      } else {
        alert("Failed to create user", response.statusText);
      }
    } catch (error) {
      alert("Error while creating user:", error);
    }
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
                <Form.Label>{CONSTANTS.NAME}</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={signupState.username}
                  onChange={handleChangeSignupField}
                />
                {signupState.errors.username && (
                  <span className="error-message">
                    {signupState.errors.username}
                  </span>
                )}
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>{CONSTANTS.EMAIL}</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={signupState.email}
                  onChange={handleChangeSignupField}
                />
                {signupState.errors.email && (
                  <span className="error-message">
                    {signupState.errors.email}
                  </span>
                )}
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>{CONSTANTS.PASSWORD}</Form.Label>
                <PasswordInput
                  type="number"
                  name="password"
                  value={signupState.password}
                  onChange={handleChangeSignupField}
                ></PasswordInput>
                {signupState.errors.password && (
                  <span className="error-message">
                    {signupState.errors.password}
                  </span>
                )}
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>{CONSTANTS.MOBILE_NUMBER}</Form.Label>
                <Form.Control
                  type="number"
                  name="mobileNumber"
                  value={signupState.mobileNumber}
                  onChange={handleChangeSignupField}
                />
                {signupState.errors.mobileNumber && (
                  <span className="error-message">
                    {signupState.errors.mobileNumber}
                  </span>
                )}
              </Form.Group>

              <div style={{ marginTop: "20px" }}>
                <Form.Group controlId="formGridCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Check me out"
                    onChange={handleCheckBoxChange}
                  />
                </Form.Group>
              </div>

              <Button
                variant="primary"
                type="submit"
                style={{ fontWeight: "800" }}
                disabled={!isChecked}
              >
                {CONSTANTS.SIGN_UP}
              </Button>
            </Form>

            <p className="sign-up">
              {CONSTANTS.ALREADY_ACCOUNT}{" "}
              <Link
                to={ROUTES.LOGIN}
                style={{
                  textDecoration: "none",
                  marginLeft: "6px",
                  color: "#007BFF",
                }}
              >
                {CONSTANTS.LOGIN}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const mapToProps = (state) => ({
  signupState: state.auth.signup,
});

export default connect(mapToProps, {})(SignupDetail);
