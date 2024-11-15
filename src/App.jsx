import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/route";
import { CartProvider } from "./provider/CartProvider";
import { WishlistProvider } from "./provider/WishlistProvider";
import { ToastContainer } from 'react-toastify';
import { SaveForLaterProvider } from "./provider/SaveForLaterProvider";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <SaveForLaterProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </SaveForLaterProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
