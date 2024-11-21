import React, { createContext, useContext } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = React.useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });













  
  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, productQuantity: item.productQuantity + product.productQuantity }
            : item
        );
      } else {

        return [...prevItems, product];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, productQuantity: quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your item has been removed from the cart.",
          icon: "success"
        });
      }
    });
  };

  const clearCart = () => {    
    Swal.fire({
      title: "Cart Emptied",
      text: "Your cart is now empty. Log in to save your favorite items or start shopping to add more!",
      icon: "info",
      confirmButtonText: "Start Shopping",
    });
    setCartItems([]);
  };
  

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.productQuantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, updateQuantity, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

