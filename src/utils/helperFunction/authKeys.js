export const authToken = localStorage.getItem("authToken");
export const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
export const createAuthToken = Math.random().toString(36).substring(2);
export const currentUser_id = Date.now();
