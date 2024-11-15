import React from "react";

export default function PriceDetails ({selectedOption, product, productQuantity, platformFee, savePrice})  {
    return (
        <div className="price-details-section col-md-4">
          <h3 className="section-title">PRICE DETAILS</h3>
          <div className="price-breakdown">
            <div className="price-item">
              <span>Price (1 item)</span>
              <span>₹{product.price * productQuantity}</span>
            </div>
            <div className="price-item">
              <span>Delivery Charges</span>
              <span>
                <span className="free-charge" style={{
                  textDecoration: 'line-through',
                  color: '#888',
                  marginRight: "8px"
                }}
                >
                  ₹80
                </span>
                <span style={{ color: "green", fontWeight: "600" }}>
                  FREE
                </span>
              </span>
            </div>
            <div className="price-item">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>

            {selectedOption === "CashOnDelivery" &&
              <div className="price-item">
                <span>Payment Handling Fee</span>
                <span>₹7</span>
              </div>
            }
            <div className="price-item total-payable">
              <span>Amount Payable</span>
              <span>
                ₹{selectedOption === "CashOnDelivery" ?
                  (product.price * productQuantity) + 7 + platformFee
                  : (product.price * productQuantity) + platformFee}
              </span>
            </div>
            <div className="price-item savings">
              <span>Your Total Savings on this order</span>
              <span>
                ₹{selectedOption === "CashOnDelivery" ?
                  (savePrice) - 7 - platformFee
                  : savePrice - platformFee}
              </span>
            </div>
          </div>
        </div>
    )
}