import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageForUser,
  saveLocalStorageForUser,
} from "../utils/helperFunction/localStorage";

const initialState = {
  saveItems: [],
};

const saveForLaterSlice = createSlice({
  name: "saveForLater",
  initialState,
  reducers: {
    loadUserSaveItems: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      state.saveItems = getLocalStorageForUser(userId, "saveForLaterItem");
    },

    addSaveforLater: (state, action) => {
      const { userId, saveProduct } = action.payload;
      if (!userId) return;

      const currentSaveItems = getLocalStorageForUser(
        userId,
        "saveForLaterItem"
      );
      const existingItem = currentSaveItems.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.saveItems.push(saveProduct);
        saveLocalStorageForUser(userId, "saveForLaterItem", state.saveItems);
      }
    },

    removeForSaveLater: (state, action) => {
      const { userId, id } = action.payload;
      if (!userId) return;

      const updateSaveItem = state.saveItems.filter((item) => item.id !== id);
      state.saveItems = updateSaveItem;
      saveLocalStorageForUser(userId, "saveForLaterItem", state.saveItems);
    },

    clearSaveForLater: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      const userSaveitemKey = `saveForLaterItem_${userId}`;
      state.items = [];
      localStorage.removeItem(userSaveitemKey);
    },
  },
});

export const {
  loadUserSaveItems,
  addSaveforLater,
  removeForSaveLater,
  clearSaveForLater,
} = saveForLaterSlice.actions;

export default saveForLaterSlice.reducer;
