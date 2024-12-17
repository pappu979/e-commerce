import React from "react";
import {
  totalSavingAmountCashOnDelivery,
  totalPayableAmountCashOnDelivery,
} from "../utils/cartCalculations";

export default function PriceDetails({
  selectedOption,
  product,
  productQuantity,
  platformFee,
}) {
  const savIngPrice = (
    (product?.price * productQuantity * product?.discountPercentage) /
    100
  ).toFixed(2);

  // console.log(platformFee);
  const totalSavingsAmount = totalSavingAmountCashOnDelivery(
    selectedOption,
    savIngPrice,
    platformFee
  );

  const payAbleAmount = totalPayableAmountCashOnDelivery(
    selectedOption,
    product,
    platformFee,
    productQuantity
  );

  return (
    <div className="price-details-section col-md-4">
      <h3 className="section-title">PRICE DETAILS</h3>
      <div className="price-breakdown">
        <div className="price-item">
          <span>Price (1 item)</span>
          <span>₹{(product.price * productQuantity).toFixed(2)}</span>
        </div>
        <div className="price-item">
          <span>Delivery Charges</span>
          <span>
            <span
              className="free-charge"
              style={{
                textDecoration: "line-through",
                color: "#888",
                marginRight: "8px",
              }}
            >
              ₹80
            </span>
            <span style={{ color: "green", fontWeight: "600" }}>FREE</span>
          </span>
        </div>
        <div className="price-item">
          <span>Platform Fee</span>
          <span>₹{platformFee}</span>
        </div>

        {selectedOption === "CashOnDelivery" && (
          <div className="price-item">
            <span>Payment Handling Fee</span>
            <span>₹7</span>
          </div>
        )}
        <div className="price-item total-payable">
          <span>Amount Payable</span>
          <span>₹{payAbleAmount.toFixed(2)}</span>
        </div>
        <div className="price-item savings">
          <span>Your Total Savings on this order</span>
          <span>₹{totalSavingsAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
