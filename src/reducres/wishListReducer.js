import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  items: [],
};

if (initialState.currentUser) {
  const userWishlistKey = `wishlistItems_${initialState.currentUser?.id}`;
  initialState.items = JSON.parse(localStorage.getItem(userWishlistKey)) || [];
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));

      if (action.payload) {
        const userWishlistKey = `wishlistItems_${action.payload.id}`;
        state.items = JSON.parse(localStorage.getItem(userWishlistKey)) || [];
      } else {
        state.items = [];
      }
    },

    addToWishlist: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userWishlistKey = `wishlistItems_${userId}`;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push(action.payload);
        localStorage.setItem(userWishlistKey, JSON.stringify(state.items));
      }
    },

    removeFromWishlist: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userWishlistKey = `wishlistItems_${userId}`;
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem(userWishlistKey, JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userWishlistKey = `wishlistItems_${userId}`;
      state.items = [];
      localStorage.removeItem(userWishlistKey);
    },
  },
});

export const {
  setCurrentUser,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
