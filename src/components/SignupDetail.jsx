import React from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import signupImage from "../images/sign.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SignupDetail.css";
import PasswordInput from "./PasswordInput";

function SignupDetail() {

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
    mobileNumber: "",
  });

  const { email, password, name, mobileNumber } = formData;
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const authToken = Math.random().toString(36).substring(2);

    const userData = {
      ...formData,
      token: authToken
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    localStorage.setItem("authToken", authToken);

    Swal.fire({
      icon: "success",
      title: "Form Submitted",
      text: "Data has been stored successfully!",
      confirmButtonText: "Ok",
    }).then(() => {
      setFormData({
        email: "",
        password: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
      });
    });
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo);
  };

  return (
    <>
      <div className="container">
        <div className="row my-4">
          <div className="signup-image col-md-6">
            <img src={signupImage} alt="Login"  />
          </div>
          <div className="signup-form col-md-6">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">               
                <Form.Label>Password</Form.Label>
                <PasswordInput
                name="password"
                value={password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                ></PasswordInput>
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  value={mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                />
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
              Already have an account? <Link to="/login" style={{textDecoration: "none"}}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupDetail;
