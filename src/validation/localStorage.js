
export function setLocalStorageLoginUserData (authToken, user) {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("currentUserEmail", user.email);
};

export function setLocalStorageSignupUserData (existingUsers, authToken, state) {
  localStorage.setItem("userData", JSON.stringify(existingUsers));
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("currentUserEmail", state.email);
}

export function removeLogoutLocalStorage () {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentUserEmail");
}