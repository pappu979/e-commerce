import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalAmount } from "../utils/helperFunction/cartCalculations";
import {
  getLocalStorageForUser,
  saveLocalStorageForUser,
} from "../utils/helperFunction/localStorage";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadUserCartItems: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      state.items = getLocalStorageForUser(userId, "cartItems");
      state.totalAmount = calculateTotalAmount(state.items);
    },

    addToCart: (state, action) => {
      const { userId, addProduct } = action.payload;
      if (!userId) return;

      const currentItems = getLocalStorageForUser(userId, "cartItems");

      const existingItem = currentItems.find(
        (item) => item.id === addProduct.id
      );

      if (existingItem) {
        const updatedItems = existingItem?.map((item) =>
          item.id === addProduct.id
            ? {
                ...item,
                productQuantity:
                  item.productQuantity + addProduct.productQuantity,
              }
            : item
        );
        state.items = updatedItems;
      } else {
        const newItems = [...state.items, addProduct];
        state.items = newItems;
      }

      state.totalAmount = calculateTotalAmount(state.items);
      saveLocalStorageForUser(userId, "cartItems", state.items);
    },

    removeFromCart: (state, action) => {
      const { userId, id } = action.payload;
      if (!userId) return;

      const updatedItems = state.items?.filter((item) => item.id !== id);
      state.items = updatedItems;

      state.totalAmount = calculateTotalAmount(state.items);
      saveLocalStorageForUser(userId, "cartItems", state.items);
    },

    updateQuantity: (state, action) => {
      const { userId, id, quantity } = action.payload;
      if (!userId) return;

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, productQuantity: quantity } : item
      );
      state.items = updatedItems;
      // console.log(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
      saveLocalStorageForUser(userId, "cartItems", state.items);
    },

    clearCart: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;
      const userCartKey = `cartItems_${userId}`;

      state.items = [];
      state.totalAmount = 0;
      localStorage.removeItem(userCartKey);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadUserCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
