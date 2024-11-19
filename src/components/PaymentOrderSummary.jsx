import React from "react";

export default function PaymentOrderSummary({
  selectOrderSummary, 
  product, 
  productQuantity, 
  deliveryDay, 
  month, 
  date, 
  userData, 
  handleOrderContinue
}) 
{

    return (
        <div className="address-section">
            <h3 className="section-title">3 ORDER SUMMARY</h3>
            {selectOrderSummary &&
              <>
                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-md-3">
                    <img
                      src={product?.thumbnail}
                      alt={product?.title}
                      style={{ width: '100%' }}
                    />
                    <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
                      <button
                        className="btn  mx-2"
                        disabled={product?.productQuantity <= 1}
                        style={{
                          padding: "4px 8px",
                          border: "1px solid grey",
                          borderRadius: "50%"
                        }}
                      >
                        -
                      </button>

                      <span style={{
                        padding: "6px 12px",
                        border: "1px solid grey"
                      }}
                      >
                        {productQuantity}
                      </span>

                      <button
                        className="btn  mx-2"
                        style={{
                          padding: "4px 8px",
                          border: "1px solid grey",
                          borderRadius: "50%"
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h6>{product.title}</h6>

                    <p>Seller: {product.seller || "Unknown"}</p>

                    <div className=" text-right mb-2">
                      <span style={{
                        textDecoration: 'line-through',
                        color: '#888'
                      }}
                      >
                        ₹{(product.price + ((product.price * product.discountPercentage) / 100)).toFixed(2)}
                      </span>
                      <span style={{
                        marginLeft: "10px"
                      }}
                      >
                        ₹{(product.price * productQuantity).toFixed(2)}
                      </span>
                      <span style={{
                        position: "relative",
                        left: "12px",
                        color: "#388e3c",
                        fontWeight: "500"
                      }}
                      >
                        {product.discountPercentage}% Off
                      </span>
                    </div>

                    <button
                      className="btn p-0 mt-2 fw-bold"
                      style={{ fontSize: "18px", marginLeft: "16px" }}
                    >
                      Remove
                    </button>

                  </div>
                  <div className="col-md-4">
                    <span>Delivery by {deliveryDay} {date + 4} {month}</span> |
                    <span style={{
                      textDecoration: 'line-through',
                      color: '#888',
                      marginRight: "5px",
                      marginLeft: "5px"
                    }}>
                      40
                    </span>
                    <span style={{ color: "green" }}>Free</span>
                  </div>

                </div>
                <div className="mt-4">
                  <span >Order confirmation email will be sent to <strong style={{ fontSize: "14px" }}>{userData.email}</strong></span>
                  <button style={{
                    background: "#fb641b",
                    padding: "11px 22px",
                    border: "none", color: "#fff",
                    marginLeft: "20PX"
                  }}
                    onClick={handleOrderContinue}
                  >
                    CONTINUE
                  </button>
                </div>
              </>
            }
          </div>
    )
}