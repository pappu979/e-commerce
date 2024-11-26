// import React, { createContext, useContext } from "react";
// import Swal from "sweetalert2";
// import { toast } from 'react-toastify';
// import { removeLogoutLocalStorage } from "../validation/localStorage";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   // State for current user
//   const [currentUser, setCurrentUser] = React.useState(() => {
//     return JSON.parse(localStorage.getItem("currentUser")) || null;
//   });

//   // State for cart items
//   const [cartItems, setCartItems] = React.useState(() => {
//     const savedCartItems = currentUser
//       ? JSON.parse(localStorage.getItem(`cartItems_${currentUser.id}`)) || []
//       : [];
//     return savedCartItems;
//   });

//    // Persist cart items to localStorage for the current user
//    React.useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem(`cartItems_${currentUser.id}`, JSON.stringify(cartItems));
//     }
//   }, [cartItems, currentUser]);

//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);

//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, productQuantity: item.productQuantity + product.productQuantity }
//             : item
//         );
//       } else {

//         return [...prevItems, product];
//       }
//     });
//   };

//   const updateQuantity = (id, quantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, productQuantity: quantity } : item
//       )
//     );
//   };

//   const removeFromCart = (productId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setCartItems((prevItems) =>
//           prevItems.filter((item) => item.id !== productId)
//         );

//         Swal.fire({
//           title: "Deleted!",
//           text: "Your item has been removed from the cart.",
//           icon: "success"
//         });
//       }
//     });
//   };

//   const clearCart = () => {    
//     Swal.fire({
//       title: "Cart Emptied",
//       text: "Your cart is now empty. Log in to save your favorite items or start shopping to add more!",
//       icon: "info",
//       confirmButtonText: "Start Shopping",
//     });
//     setCartItems([]);
//   };

// const logout = (navigate) => {
//   const authToken = localStorage.getItem("authToken");
//   if (!authToken) {
//     // Show info toast for already logged out
//     toast.info('You are already logged out.', {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });

//     // Navigate to login page after a short delay
//     setTimeout(() => {
//       navigate('/login');
//     }, 3000);
//   } else {
//     // Remove the token 
//     removeLogoutLocalStorage();

//     // Show success toast for logged out
//     toast.success('You have been successfully logged out.', {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });

//     setCurrentUser(null);
//     // Navigate to login page after a short delay
//     setTimeout(() => {
//       navigate('/login');
//     }, 3000);
//   }
// };

//   const totalAmount = cartItems.reduce((total, item) => total + item.price * item.productQuantity, 0);

//   return (
//     <CartContext.Provider 
//     value={{ 
//       cartItems, 
//       addToCart, 
//       clearCart, 
//       removeFromCart, 
//       updateQuantity, 
//       totalAmount, 
//       logout,  
//       }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

