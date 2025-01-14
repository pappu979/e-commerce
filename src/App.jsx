import React, { Suspense } from "react";
import Router from "./router/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-tooltip/dist/react-tooltip.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Suspense>
      <ToastContainer />
      <Router></Router>
    </Suspense>
  );
}

export default App;
