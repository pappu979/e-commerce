import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { removeFromCart, updateQuantity } from "../reducres/cartReducer";
import CheckWishlistItemButton from "./CheckWishListButton";
import flipLogo from "../images/flipLogo.png";
import { useDispatch, useSelector } from "react-redux";
import useDateInfo from "../utils/dateUtilis";

const ShowCartItem = ({ cartItems, handleSaveForLater }) => {
  const dispatch = useDispatch();
  const { currentDate, currentMonth, deliveryDay } = useDateInfo();
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      {cartItems?.map((product) => (
        <div
          className="row mb-4 d-flex align-items-center justify-content-center"
          key={product?.addProduct?.id}
          style={{ borderBottom: "1px solid #ddd" }}
        >
          <div className="col-md-3">
            <CheckWishlistItemButton product={product} />
            <ReactTooltip
              id="processingOrder-tooltip"
              place="top"
              content="Processing Order For Checkout"
            />
            <img
              src={product?.thumbnail}
              alt={product?.title}
              style={{ width: "100%" }}
            />
            <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
              <button
                className="btn  mx-2"
                disabled={product?.productQuantity <= 1}
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      userId: currentUser.id,
                      id: product?.id,
                      quantity: product?.productQuantity - 1,
                    })
                  )
                }
                style={{
                  padding: "4px 8px",
                  border: "1px solid grey",
                  borderRadius: "50%",
                }}
              >
                -
              </button>

              <span
                style={{
                  padding: "6px 12px",
                  border: "1px solid grey",
                }}
              >
                {product?.productQuantity}
              </span>

              <button
                className="btn  mx-2"
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      userId: currentUser.id,
                      id: product?.id,
                      quantity: product?.productQuantity + 1,
                    })
                  )
                }
                style={{
                  padding: "4px 8px",
                  border: "1px solid grey",
                  borderRadius: "50%",
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <h6>{product?.title}</h6>

                <p>
                  <span>Seller: {product?.seller || "Unknown"}</span>
                  <img
                    src={flipLogo}
                    alt="flip Logo"
                    height="20px"
                    style={{ paddingLeft: "8px" }}
                  />
                </p>

                <div className=" text-right mb-2">
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#888",
                    }}
                  >
                    ₹
                    {(
                      product?.price +
                      (product?.price * product?.discountPercentage) / 100
                    ).toFixed(2)}
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    ₹{(product?.price * product?.productQuantity).toFixed(2)}
                  </span>
                  <span
                    style={{
                      position: "relative",
                      left: "12px",
                      color: "#388e3c",
                      fontWeight: "500",
                    }}
                  >
                    {product?.discountPercentage}% Off
                  </span>
                </div>

                <button
                  className="btn  p-0 mt-2 fw-bold"
                  style={{ fontSize: "18px" }}
                  onClick={() => handleSaveForLater(product)}
                >
                  Save for Later
                </button>

                <button
                  className="btn p-0 mt-2 fw-bold"
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        userId: currentUser?.id,
                        id: product?.id,
                      })
                    )
                  }
                  style={{ fontSize: "18px", marginLeft: "16px" }}
                >
                  Remove
                </button>
              </div>
              <div className="col-md-6">
                <p>
                  <span style={{ paddingRight: "4px" }}>
                    Delivery by {deliveryDay} {currentMonth} {currentDate + 3} |
                  </span>

                  <span
                    style={{
                      textDecoration: "line-through",
                      paddingLeft: "4px",
                    }}
                  >
                    ₹40
                  </span>

                  <span style={{ paddingLeft: "4px", color: "#388e3c" }}>
                    Free
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowCartItem;
