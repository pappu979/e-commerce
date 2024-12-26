import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Swal from "sweetalert2";
import ReactStars from "react-stars";
import ProductImagesShowSection from "../components/ProductImagesShowSection";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Rating from "../components/Rating";
import { toast } from "react-toastify";
import { addToCart, updateQuantity } from "../reducres/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import "../styles/product-page.css";
import "../App.css";

function ShowProductDetailsPage() {
  const { productID } = useParams();
  const [product, setProduct] = React.useState({});
  const [productQuantity, setProductQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productID}`
        );
        const result = await response.json();
        setProduct(result);
      } catch (error) {
        setError("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToAddCart = () => {
    if (!currentUser) {
      toast.info("User not logged in!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    const addProduct = {
      ...product,
      productQuantity,
      totalPrice: product?.price * productQuantity,
    };

    dispatch(
      addToCart({
        userId: currentUser.id,
        addProduct: addProduct,
      })
    );

    Swal.fire({
      title: "Added to Cart!",
      text: "Check your Cart for Check Out",
      icon: "success",
    }).then(() => {
      if (currentUser) {
        dispatch(
          updateQuantity({
            userId: currentUser.id,
            id: productID,
            quantity: productQuantity,
          })
        );
        navigate("/cart");
      } else {
        navigate("/login", { state: { from: location.pathname } });
      }
    });
  };

  const handleBuyNow = () => {
    if (currentUser) {
      navigate("/payment", { state: { product, productQuantity } });
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  return (
    <div className="container pb-5">
      {loading ? (
        <Loader></Loader>
      ) : (
        product?.availabilityStatus && (
          <>
            <div className="row">
              <div className="col-md-6">
                {product?.images?.length > 0 && (
                  <div className="image-section-container">
                    <ProductImagesShowSection
                      images={product?.images}
                      product={product}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-6 productPage-col-2 mt-4">
                <h2 style={{ color: "#e1997e" }}>
                  {product.title}
                  <br />
                </h2>
                <p>{product.description}</p>
                <Rating product={product}></Rating>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#26a541",
                    fontWeight: "bold",
                  }}
                >
                  Special price
                </p>
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
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginLeft: "9px",
                  }}
                >
                  ₹{(product?.price * productQuantity).toFixed(2)}
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    position: "relative",
                    left: "22px",
                    color: "#26a541",
                    fontWeight: "bold",
                  }}
                >
                  {product?.discountPercentage}% off
                </span>
                <p></p>
                <p>
                  Minimum Order Quantity: {product.minimumOrderQuantity} (Total
                  Stock : {product.stock})
                </p>
                <p>Warranty : {product?.warrantyInformation}</p>
                <div className="d-flex  mb-3">
                  <ReactStars
                    count={5}
                    size={24}
                    edit={false}
                    value={product?.rating}
                    color2={"#ffd700"}
                  />
                </div>

                <div className="d-flex align-items-center mb-3">
                  <button
                    className="btn btn-dark mx-3"
                    disabled={productQuantity > 1 ? false : true}
                    onClick={() => setProductQuantity(productQuantity - 1)}
                  >
                    -
                  </button>
                  <span className="font-weight-bold">{productQuantity}</span>
                  <button
                    className="btn btn-dark mx-3"
                    onClick={() => setProductQuantity(productQuantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <Link
                    to="/review"
                    state={{ product, productID }}
                    style={{ textDecoration: "none" }}
                  >
                    Write a Review
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <button
                    className="btn btn-dark"
                    onClick={handleToAddCart}
                    style={{
                      position: "relative",
                      right: "12px",
                      backgroundColor: "#ff9f00",
                      border: "none",
                      padding: "11px 16px",
                      borderRadius: "0px",
                      fontSize: "18px",
                    }}
                    data-tooltip-id="Addtocart-tooltip"
                  >
                    <ShoppingCartIcon /> Add To Cart
                  </button>
                  <ReactTooltip
                    id="Addtocart-tooltip"
                    place="top"
                    content="Add To Cart"
                  />
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={handleBuyNow}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "#fb641b",
                      padding: "10px 22px",
                      fontSize: "18px",
                      borderRadius: "0px",
                    }}
                    data-tooltip-id="Buynow-tooltip"
                  >
                    <AttachMoneyIcon /> Buy Now
                  </button>
                  <ReactTooltip
                    id="Buynow-tooltip"
                    place="top"
                    content="Buy Now"
                  />
                </div>
              </div>
            </div>
          </>
        )
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default ShowProductDetailsPage;
