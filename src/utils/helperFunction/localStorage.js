export function removeLogoutLocalStorage() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
}

export const getLocalStorageForUser = (userId, set) => {
  const userKey = `${set}_${userId}`;
  return JSON.parse(localStorage.getItem(userKey)) || [];
};

export const saveLocalStorageForUser = (userId, set, Item) => {
  const userKey = `${set}_${userId}`;
  localStorage.setItem(userKey, JSON.stringify(Item));
};
