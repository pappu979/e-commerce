import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const calculateTotalAmount = (items) => {
  return items.reduce(
    (total, item) => total + item?.price * item?.productQuantity,
    0
  );
};

const getCartItemForUser = (userId) => {
  const userCartItemKey = `cartItems_${userId}`;
  return JSON.parse(localStorage.getItem(userCartItemKey)) || [];
};

const saveCartItemForUser = (userId, cartItem) => {
  const userCartItemKey = `cartItems_${userId}`;
  localStorage.setItem(userCartItemKey, JSON.stringify(cartItem));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadUserCartItems: (state, action) => {
      const { userId } = action.payload;
      if (!userId) return;

      state.items = getCartItemForUser(userId);
      state.totalAmount = calculateTotalAmount(state.items);
    },

    addToCart: (state, action) => {
      const { userId, addProduct } = action.payload;
      if (!userId) return;

      const currentItems = getCartItemForUser(userId);

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
      saveCartItemForUser(userId, state.items);
    },

    removeFromCart: (state, action) => {
      const { userId, id } = action.payload;
      if (!userId) return;

      const updatedItems = state.items?.filter((item) => item.id !== id);
      state.items = updatedItems;

      state.totalAmount = calculateTotalAmount(state.items);
      saveCartItemForUser(userId, state.items);
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
      saveCartItemForUser(userId, state.items);
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
