
export function setLocalStorageLoginUserData (authToken) {
  localStorage.setItem("authToken", JSON.stringify(authToken));
};

export function setLocalStorageSignupUserData (existingUsers, authToken) {
  localStorage.setItem("userData", JSON.stringify(existingUsers));
  localStorage.setItem("authToken", authToken);
}

export function removeLogoutLocalStorage () {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
}