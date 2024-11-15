import { toast } from 'react-toastify';

// Create a reusable logout function
export const logout = (navigate) => {
  const isLoggedIn = localStorage.getItem("authToken");

  if (!isLoggedIn) {
    // Show info toast for already logged out
    toast.info('You are already logged out.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Navigate to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  } else {
    // Remove the token and user data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Show success toast for logged out
    toast.success('You have been successfully logged out.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Navigate to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }
};
