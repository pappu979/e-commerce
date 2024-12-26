export const authToken = localStorage.getItem("authToken");
export const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
export const createAuthToken = Math.random().toString(36).substring(2);
export const currentUser_id = Date.now();
export const API_URL =
  "https://6765379052b2a7619f5ecdb1.mockapi.io/login/users";
