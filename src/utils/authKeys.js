export const storeUserData = JSON.parse(localStorage.getItem("userData")) || [];
export const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
export const currentUserEmail = localStorage.getItem("currentUserEmail") || ''; 
export const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
export const currentUser = storeUserData.find((user) => user.email === currentUserEmail);
export const authToken = Math.random().toString(36).substring(2);