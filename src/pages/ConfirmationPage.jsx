import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function ConfirmationPage() {
  const location = useLocation();
  const { product, productQuantity } = location?.state;
  return (
    <div className="container mt-5 text-center mb-4">
      <h1>Payment Successful!</h1>
      <p>
        Your payment for <strong>{product.title}</strong> has been processed.
      </p>
      <p>Total: ₹{product.price * productQuantity}</p>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          padding: "8px 15px",
          backgroundColor: "rgb(225, 153, 126)",
          color: "black",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
