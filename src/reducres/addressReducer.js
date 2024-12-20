import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
};

const getAddressesForUser = (userId) => {
  const userAddressKey = `addresses_${userId}`;
  return JSON.parse(localStorage.getItem(userAddressKey)) || [];
};

const saveAddressesForUser = (userId, addresses) => {
  const userAddressKey = `addresses_${userId}`;
  localStorage.setItem(userAddressKey, JSON.stringify(addresses));
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    loadUserAddresses: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      state.addresses = getAddressesForUser(userId);
    },

    addAddress: (state, action) => {
      const { userId, address } = action.payload;
      if (!userId) return;

      const updateAddresses = getAddressesForUser(userId);
      updateAddresses.push(address);
      state.addresses = updateAddresses;
      saveAddressesForUser(userId, updateAddresses);
    },

    editAddress: (state, action) => {
      const { userId, id, updatedAddress } = action.payload;
      if (!userId) return;

      if (id < 0 || id >= state.addresses.length) {
        console.error("Invalid address ID");
        return;
      }

      state.addresses[id] = updatedAddress;

      saveAddressesForUser(userId, state.addresses);
    },

    removeAddress: (state, action) => {
      const { userId, addressId } = action.payload;
      if (!userId) return;

      const addresses = getAddressesForUser(userId).filter(
        (address) => address.id !== addressId
      );

      saveAddressesForUser(userId, addresses);
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
