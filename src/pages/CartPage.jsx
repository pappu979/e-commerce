import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { checkPlatformFee } from "../utils/cartCalculations";
import { totalDiscountAmount } from "../utils/cartCalculations";
import {
  clearCart,
  loadUserCartItems,
  removeFromCart,
} from "../reducres/cartReducer";
import { addSaveforLater } from "../reducres/saveForLaterReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ShowCartItem from "../components/ShowCartItem";
import emptyCartImg from "../images/emptyCart.webp";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.user.currentUser);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const updateDiscount = totalDiscountAmount(cartItems);
  const platformFee = checkPlatformFee(totalAmount);
  const actualPrice = (totalAmount + updateDiscount).toFixed(2);

  React.useEffect(() => {
    if (currentUser) {
      dispatch(loadUserCartItems({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  // handleBuyNow Option....
  const handlePlaceOrder = () => {
    if (currentUser) {
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
    dispatch(removeFromCart({ userId: currentUser.id, id: product.id }));
    navigate("/saveforlater");
  };

  // If user Login then send to HomePage otherwise Login Page....
  const handleLoginCart = () => {
    if (currentUser) {
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
            <ShowCartItem
              cartItems={cartItems}
              handleSaveForLater={handleSaveForLater}
            ></ShowCartItem>
          </div>

          <div className="col-md-4">
            <div className="card p-4">
              <h5>PRICE DETAILS</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({cartItems?.length} items)</span>
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
                <span>₹{totalAmount + platformFee}</span>
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
                onClick={handlePlaceOrder}
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
            onClick={() => dispatch(clearCart({ userId: currentUser.id }))}
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
