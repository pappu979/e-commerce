import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Swal from "sweetalert2";
import { Card, CardContent } from "@mui/material";
import PasswordInput from "../components/PasswordInput";
import { setCurrentUser } from "../reducres/userReducer";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location?.state;

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (newPassword === "") {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Please enter a new password.",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please try again.",
        confirmButtonText: "Ok",
      });
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const userIndex = userData.findIndex((user) => user.email === email);
    const currentUpdateUser = userData.find((user) => user.email === email);

    if (userIndex !== -1) {
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
    }

    userData[userIndex].password = newPassword;
    currentUpdateUser.password = newPassword;
    dispatch(setCurrentUser(currentUpdateUser));
    localStorage.setItem("userData", JSON.stringify(userData));

    Swal.fire({
      icon: "success",
      title: "Password Updated",
      text: "Your password has been updated successfully!",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Card sx={{ boxShadow: "4" }}>
          <CardContent sx={{ m: 3 }}>
            <Avatar
              sx={{
                m: "auto",
                bgcolor: "primary.main",
              }}
            >
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
              Reset Password
            </Typography>

            <Box
              component="form"
              onSubmit={handleUpdatePassword}
              sx={{ mt: 1 }}
            >
              <PasswordInput
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New PassWord"
              ></PasswordInput>
              {error && <span style={{ color: "rebeccapurple" }}>{error}</span>}
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                <PasswordInput
                  name="password"
                  value={confirmPassword}
                  placeholder="Confirm PassWord"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></PasswordInput>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResetPassword;
