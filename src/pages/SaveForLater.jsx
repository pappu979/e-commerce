import React from "react";
import emptyCartImg from "../images/emptyCart.webp";
import {
  loadUserSaveItems,
  removeForSaveLater,
} from "../reducres/saveForLaterReducer";
import { addToCart } from "../reducres/cartReducer";
import { useNavigate } from "react-router-dom";
import flipLogo from "../images/flipLogo.png";
import CheckWishlistItemButton from "../components/CheckWishListButton";
import { useDispatch, useSelector } from "react-redux";

const SaveForLaterPage = () => {
  const saveForLaterItems = useSelector(
    (state) => state.saveForLater.saveItems
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (currentUser) {
      dispatch(loadUserSaveItems({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  const moveToCart = (product) => {
    dispatch(addToCart({ userId: currentUser.id, addProduct: product }));
    dispatch(removeForSaveLater({ userId: currentUser.id, id: product.id }));
    navigate("/cart");
  };

  return (
    <div className="container my-5">
      <h4>Saved For Later ({saveForLaterItems.length})</h4>
      {saveForLaterItems?.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center flex-column mb-2">
          <img
            src={emptyCartImg}
            alt="Empty Cart"
            style={{ height: "162px" }}
          />

          <h5 className="mt-4">Your Save for Later is Empty</h5>
          <p>
            It looks like you haven't saved any items yet. Explore our amazing
            products and save your favorites for later!
          </p>
        </div>
      ) : (
        <div>
          {saveForLaterItems.map((product) => (
            <div
              key={product?.id}
              className="row d-flex align-items-center mb-2"
              style={{ borderBottom: "1px solid grey" }}
            >
              <div className="col-md-3">
                <CheckWishlistItemButton product={product} />
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-md-9">
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
                <div className="mb-2">
                  <span
                    style={{ textDecoration: "line-through", color: "#888" }}
                  >
                    ₹
                    {(
                      product.price +
                      (product.price * product.discountPercentage) / 100
                    ).toFixed(2)}
                  </span>
                  <span style={{ marginLeft: "10px" }}>
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
                <div className="d-flex align-items-center justify-content-start mt-2">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => moveToCart(product)}
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginRight: "16px",
                      textDecoration: "none",
                    }}
                  >
                    MOVE TO CART
                  </button>
                  <button
                    className="btn btn-link p-0 text-danger"
                    onClick={() =>
                      dispatch(
                        removeForSaveLater({
                          userId: currentUser.id,
                          id: product.id,
                        })
                      )
                    }
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveForLaterPage;
