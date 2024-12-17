import React from "react";
import emptyCartImg from "../images/emptyCart.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-stars";
import { Tooltip as ReactTooltip } from "react-tooltip";
import flipLogo from "../images/flipLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../reducres/wishListReducer";
import "../styles/wishlist.css";

const WishListPage = () => {
  const dispatch = useDispatch();
  const wishlistItem = useSelector((state) => state.wishlist.items);

  return (
    <div className="container mt-5">
      <h2>My WishList ({wishlistItem.length})</h2>
      <hr />
      {wishlistItem?.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center flex-column my-3">
          <img
            src={emptyCartImg}
            alt="Empty Cart"
            style={{ height: "162px" }}
          />

          <h5 className="mt-4">Empty Wishlist</h5>
          <p>You have no items in your wishlist. Start adding!</p>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-12">
              {wishlistItem.map((product) => (
                <div
                  className="row mb-4 d-flex align-items-center"
                  key={product.id}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <div className="col-md-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-md-9 d-flex justify-content-between">
                    <div>
                      <h6>{product.title}</h6>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "60px",
                            borderRadius: "17px",
                            padding: "0 5px",
                            backgroundColor: "#388e3c",
                          }}
                        >
                          <span style={{ color: "#fff", marginTop: "3px" }}>
                            {product?.rating}
                          </span>

                          <ReactStars
                            count={1}
                            size={22}
                            edit={false}
                            value={product?.rating}
                            color2={"#fff"}
                          />
                        </div>
                        <div style={{ marginLeft: "10px", fontSize: "18px" }}>
                          ({product.stock})
                        </div>
                        <div>
                          <img
                            src={flipLogo}
                            alt=""
                            height="25px"
                            style={{ paddingLeft: "5px" }}
                          />
                        </div>
                      </div>
                      <p>Seller: {product.seller || "Unknown"}</p>

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
                          ₹{product.price.toFixed(2)}
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
                    </div>

                    <div>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => dispatch(removeFromWishlist(product.id))}
                        style={{ cursor: "pointer" }}
                        data-tooltip-id="delete-tooltip"
                      ></FontAwesomeIcon>
                      <ReactTooltip
                        id="delete-tooltip"
                        place="top"
                        content="Remove from Wishlist"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row mb-4 mt-2">
            <button
              className="wishlistClear-btn"
              onClick={() => dispatch(clearWishlist())}
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishListPage;
