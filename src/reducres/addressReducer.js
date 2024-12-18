import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  addresses: [],
};

if (initialState.currentUser) {
  const userAddressKey = `addresses_${initialState.currentUser?.id}`;
  initialState.addresses =
    JSON.parse(localStorage.getItem(userAddressKey)) || [];
}

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));

      if (action.payload) {
        const userAddressKey = `addresses_${action.payload.id}`;
        state.addresses =
          JSON.parse(localStorage.getItem(userAddressKey)) || [];
      } else {
        state.addresses = [];
      }
    },

    addAddress: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userAddressKey = `addresses_${userId}`;
      state.addresses.push(action.payload);
      localStorage.setItem(userAddressKey, JSON.stringify(state.addresses));
    },

    editAddress: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userAddressKey = `addresses_${userId}`;
      const { id, updatedAddress } = action.payload;

      if (id < 0 || id >= state.addresses.length) {
        console.error("Invalid address ID");
        return;
      }

      state.addresses[id] = updatedAddress;

      localStorage.setItem(userAddressKey, JSON.stringify(state.addresses));
    },

    removeAddress: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userAddressKey = `addresses_${userId}`;
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      localStorage.setItem(userAddressKey, JSON.stringify(state.addresses));
    },

    clearAddresses: (state) => {
      const userId = state.currentUser?.id;
      if (!userId) return;

      const userAddressKey = `addresses_${userId}`;
      state.addresses = [];
      localStorage.removeItem(userAddressKey);
    },
  },
});

export const {
  setCurrentUser,
  addAddress,
  editAddress,
  removeAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
