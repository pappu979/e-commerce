import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageForUser,
  saveLocalStorageForUser,
} from "../validation/localStorage";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    loadUserWishlistItem: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      state.wishlistItems = getLocalStorageForUser(userId, "wishlistItems");
    },

    addToWishlist: (state, action) => {
      const { userId, addProduct } = action.payload;
      if (!userId) return;

      const currentWishlistItem = getLocalStorageForUser(
        userId,
        "wishlistItems"
      );
      const existingItem = currentWishlistItem.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.wishlistItems.push(addProduct);
        saveLocalStorageForUser(userId, "wishlistItems", state.wishlistItems);
      }
    },

    removeFromWishlist: (state, action) => {
      const { userId, id } = action.payload;
      if (!userId) return;

      const updateWishlist = state.wishlistItems.filter(
        (item) => item.id !== id
      );
      state.wishlistItems = updateWishlist;
      saveLocalStorageForUser(userId, "wishlistItems", state.wishlistItems);
    },

    clearWishlist: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      const userWishlistKey = `wishlistItems_${userId}`;
      state.wishlistItems = [];
      localStorage.removeItem(userWishlistKey);
    },
  },
});

export const {
  loadUserWishlistItem,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
