import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageForUser,
  saveLocalStorageForUser,
} from "../validation/localStorage";

const initialState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    loadUserAddresses: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      state.addresses = getLocalStorageForUser(userId, "addresses");
    },

    addAddress: (state, action) => {
      const { userId, address } = action.payload;
      if (!userId) return;

      const updateAddresses = getLocalStorageForUser(userId, "addresses");
      const newAddAddress = [...updateAddresses, address];
      state.addresses = newAddAddress;
      saveLocalStorageForUser(userId, "addresses", newAddAddress);
    },

    editAddress: (state, action) => {
      const { userId, id, updatedAddress } = action.payload;
      if (!userId) return;

      if (id < 0 || id >= state.addresses.length) {
        console.error("Invalid address ID");
        return;
      }

      state.addresses[id] = updatedAddress;

      saveLocalStorageForUser(userId, "addresses", state.addresses);
    },

    removeAddress: (state, action) => {
      const { userId, addressId } = action.payload;
      if (!userId) return;

      const addresses = getLocalStorageForUser(userId, "addresses").filter(
        (address) => address.id !== addressId
      );

      saveLocalStorageForUser(userId, "addresses", addresses);
      state.addresses = addresses;
    },

    clearAddresses: (action) => {
      const { userId } = action.payload;
      if (!userId) return;

      const userAddressKey = `addresses_${userId}`;
      localStorage.removeItem(userAddressKey);
      state.addresses = [];
    },
  },
});

export const {
  loadUserAddresses,
  addAddress,
  editAddress,
  removeAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
