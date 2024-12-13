import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import emptyCartImg from "../images/emptyCart.webp";
import flipLogo from "../images/flipLogo.png";
import useDateInfo from "../utils/dateUtilis";
import { checkPlatformFee } from "../utils/cartCalculations";
import { calculateTotal, totalDiscountAmount } from "../utils/cartCalculations";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../reducres/cartReducer";
import { addSaveforLater } from "../reducres/saveForLaterReducer";
import CheckWishlistItemButton from "../components/CheckWishListButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { currentDate, currentMonth, deliveryDay } = useDateInfo();
  const isLoggedIn = localStorage.getItem("authToken");
  const navigate = useNavigate();
  let updateCalcAmount = calculateTotal(cartItems);
  let updateDiscount = totalDiscountAmount(cartItems);
  const platformFee = checkPlatformFee(updateCalcAmount);

  // ActualPrice...
  let actualPrice = (updateCalcAmount + updateDiscount).toFixed(2);

  // TotalAmount...
  let totalAmount = (updateCalcAmount + platformFee).toFixed(2);

  // handleBuyNow Option....
  const handleBuyNow = () => {
    if (isLoggedIn) {
      toast.info("Processing your order...", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/checkout", { state: { platformFee } });
    } else {
      navigate("/login");
    }
  };

  // handleSaveForLater Item...
  const handleSaveForLater = (product) => {
    dispatch(addSaveforLater(product));
    dispatch(removeFromCart(product.id));
    navigate("/saveforlater");
  };

  // If user Login then send to HomePage otherwise Login Page....
  const handleLoginCart = () => {
    if (isLoggedIn) {
      toast.info("Your cart is empty. Add items before proceeding!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    } else {
      toast.error("Please log in to continue with your order", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5 ">
      {cartItems?.length > 0 ? (
        <div className="row ">
          <div className="col-md-8 border">
            {cartItems?.map((product) => (
              <div
                className="row mb-4 d-flex align-items-center justify-content-center"
                key={product.id}
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
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ width: "100%" }}
                  />
                  <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
                    <button
                      className="btn  mx-2"
                      disabled={product.productQuantity <= 1}
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: product.productQuantity - 1,
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
                      {product.productQuantity}
                    </span>

                    <button
                      className="btn  mx-2"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: product.id,
                            quantity: product.productQuantity + 1,
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
                      <h6>{product.title}</h6>

                      <p>
                        <span>Seller: {product.seller || "Unknown"}</span>
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
                            product.price +
                            (product.price * product.discountPercentage) / 100
                          ).toFixed(2)}
                        </span>
                        <span
                          style={{
                            marginLeft: "10px",
                          }}
                        >
                          ₹
                          {(product.price * product.productQuantity).toFixed(2)}
                        </span>
                        <span
                          style={{
                            position: "relative",
                            left: "12px",
                            color: "#388e3c",
                            fontWeight: "500",
                          }}
                        >
                          {product.discountPercentage}% Off
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
                        onClick={() => dispatch(removeFromCart(product.id))}
                        style={{ fontSize: "18px", marginLeft: "16px" }}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <span style={{ paddingRight: "4px" }}>
                          Delivery by {deliveryDay} {currentMonth}{" "}
                          {currentDate + 3} |
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
          </div>

          <div className="col-md-4">
            <div className="card p-4">
              <h5>PRICE DETAILS</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{actualPrice}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span
                  style={{
                    color: "#388e3c",
                    fontWeight: "500",
                  }}
                >
                  -₹{updateDiscount.toFixed(2)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#888",
                      marginRight: "5px",
                    }}
                  >
                    ₹80
                  </span>
                  <span style={{ color: "#388e3c", fontWeight: "500" }}>
                    Free
                  </span>
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between font-weight-bold">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>

              <p
                className="text-success mt-2"
                style={{
                  color: "#388e3c",
                  fontWeight: "500",
                }}
              >
                You will save ₹{(updateDiscount - platformFee).toFixed(2)} on
                this order
              </p>
              <button
                className="btn btn-warning btn-block mt-3"
                onClick={handleBuyNow}
                style={{
                  backgroundColor: "#fb641b",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                }}
                data-tooltip-id="processingOrder-tooltip"
              >
                PLACE ORDER
              </button>
              <ReactTooltip
                id="processingOrder-tooltip"
                place="top"
                content="Processing Order For Checkout"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center flex-column mb-2">
          <img
            src={emptyCartImg}
            alt="Empty Cart"
            style={{ height: "162px" }}
          />

          <h5 className="mt-4">Missing Cart items?</h5>
          <p>Login to see the items you added previously</p>
          <button className="btn btn-primary" onClick={handleLoginCart}>
            Login
          </button>
        </div>
      )}

      {cartItems?.length > 0 && (
        <div className="text-center my-5">
          <button
            onClick={() => dispatch(clearCart())}
            className="btn btn-danger mr-3"
            style={{
              backgroundColor: "#ff9f00",
              border: "none",
              marginRight: "6px",
              fontWeight: "500",
            }}
            data-tooltip-id="clear-tooltip"
          >
            Clear Cart
          </button>
          <ReactTooltip id="clear-tooltip" place="top" content="Clear Cart" />
          <Link
            to="/products"
            className="btn btn-secondary"
            style={{
              backgroundColor: "#fb641b",
              border: "none",
              marginLeft: "6px",
              fontWeight: "500",
            }}
            data-tooltip-id="continue-tooltip"
          >
            Continue Shopping
          </Link>
          <ReactTooltip
            id="continue-tooltip"
            place="top"
            content="Continue-Shoping"
          />
        </div>
      )}
    </div>
  );
}
