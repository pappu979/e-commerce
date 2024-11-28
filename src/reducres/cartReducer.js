import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  items: [],
  totalAmount: 0,
};

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.productQuantity, 0);
};

if(initialState.currentUser){
 const userCartKey = `cartItems_${initialState.currentUser?.id}`;
 initialState.items = JSON.parse(localStorage.getItem(userCartKey)) || [];
 initialState.totalAmount = calculateTotalAmount(initialState.items);
}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    addToCart: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;
      const userCartKey = `cartItems_${userId}`;

      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        const updatedItems = state.items?.map((item) =>
          item.id === action.payload.id
            ? { ...item, productQuantity: item.productQuantity + action.payload.productQuantity }
            : item
        );
        state.items = updatedItems;
      } else {
        const newItems = [...state.items, action.payload];
        state.items = newItems;
      }

      state.totalAmount = calculateTotalAmount(state.items); 
      localStorage.setItem(userCartKey, JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;
      const userCartKey = `cartItems_${userId}`;

      const updatedItems = state.items?.filter((item) => item.id !== action.payload);
      state.items = updatedItems;

      state.totalAmount = calculateTotalAmount(state.items);
      localStorage.setItem(userCartKey, JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const userId = state.currentUser?.id;
      if (!userId) return;
      const userCartKey = `cartItems_${userId}`;

     const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, productQuantity: action.payload.quantity }
          : item
      );
      state.items = updatedItems;

      state.totalAmount = calculateTotalAmount(state.items);
      localStorage.setItem(userCartKey, JSON.stringify(state.items));
    },

    clearCart: (state) => {
      const userId = state.currentUser?.id;
      if (!userId) return;
      const userCartKey = `cartItems_${userId}`;

      state.items = [];
      state.totalAmount = 0; 
      // Clear localStorage
      localStorage.removeItem(userCartKey);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
