import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { API_URL } from "../utils/authKeys";

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const getResponse = await fetch(API_URL);
      const users = await getResponse.json();

      const user = users.find((user) => user.email === email);

      // Simulate sending a reset link
      if (user) {
        toast.success("Check your email for the password reset link.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Navigate after toast is shown
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 3000);

        setEmail("");
      } else {
        toast.error("Please enter a valid email address.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      alert("Error while creating user:", error);
    }
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
              Forgot Password
            </Typography>

            <Box component="form" onSubmit={handleReset} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
            <Box>
              <Typography></Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
