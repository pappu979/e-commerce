import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/route";
import { ToastContainer } from 'react-toastify';
import { Tooltip as ReactTooltip } from "react-tooltip";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-tooltip/dist/react-tooltip.css";


function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
