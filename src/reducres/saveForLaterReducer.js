import { createSlice } from "@reduxjs/toolkit";
// import Swal from 'sweetalert2';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  saveItems: [],
};

if (initialState.currentUser) {
  const userSaveitemKey = `saveForLaterItem_${initialState.currentUser?.id}`;
  initialState.saveItems =
    JSON.parse(localStorage.getItem(userSaveitemKey)) || [];
}

const saveForLaterSlice = createSlice({
  name: "saveForLater",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));

      if (action.payload) {
        const userSaveitemKey = `saveForLaterItem_${action.payload.id}`;
        state.saveItems =
          JSON.parse(localStorage.getItem(userSaveitemKey)) || [];
      } else {
        state.saveItems = [];
      }
    },

    addSaveforLater: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userSaveitemKey = `saveForLaterItem_${userId}`;
      const existingItem = state.saveItems.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.saveItems.push(action.payload);
        localStorage.setItem(userSaveitemKey, JSON.stringify(state.saveItems));
      }
    },

    removeForSaveLater: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userSaveitemKey = `saveForLaterItem_${userId}`;
      state.saveItems = state.saveItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(userSaveitemKey, JSON.stringify(state.saveItems));
    },

    clearSaveForLater: (state) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userSaveitemKey = `saveForLaterItem_${userId}`;
      state.items = [];
      localStorage.removeItem(userSaveitemKey);
    },
  },
});

export const {
  addSaveforLater,
  removeForSaveLater,
  clearSaveForLater,
  setCurrentUser,
} = saveForLaterSlice.actions;

export default saveForLaterSlice.reducer;
