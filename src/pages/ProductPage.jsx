import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../provider/CartProvider";
import { useWishlist } from "../provider/WishlistProvider";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Swal from "sweetalert2";
import ReactStars from "react-stars";
import ImageSection from "../components/ImageSection";
import useWishlistHandler from "../provider/useWishlistHandler";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Rating from '../components/Rating';
import "../styles/product-page.css";
import '../App.css';


function ProductPage() {

  const { productID } = useParams();
  const [product, setProduct] = React.useState({});
  // const [review, setReview] = React.useState("");
  // const [ratingStar, setRatingStar] = React.useState(0);
  const [productQuantity, setProductQuantity] = React.useState(1);
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const isLoggedIn = localStorage.getItem("authToken");
  const { addToWishList, wishlistItem, removeFromWishList } = useWishlist();
  const { handleWishlistClick } = useWishlistHandler(wishlistItem, addToWishList, removeFromWishList);

  React.useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productID}`)
      .then((json) => setProduct(json.data));
  }, []);


  // const ratingChanged = (newRating) => {
  //   setRatingStar(newRating);
  // };

  // const submitReview = () => {
  //   const payload = {
  //     productID: productID,
  //     review: review,
  //     rating: ratingStar,
  //   };

  //   console.log(payload);

  //   Swal.fire({
  //     title: "Successfully Submitted!",
  //     text: "Thanks for reviewing our product",
  //     icon: "success",
  //     confirmButtonText: "Continue Shopping",
  //   }).then(() => {
  //     navigate("/products")
  //   })

  //   setReview("");
  //   setRatingStar(0);
  // };

  const handleToCart = () => {
    const payload = {
      ...product,
      productQuantity,
      totalPrice: product?.price * productQuantity,
    };

    addToCart(payload);

    Swal.fire({
      title: "Added to Cart!",
      text: "Check your Cart for Check Out",
      icon: "success",
      confirmButtonText: "Check in cart if you don't login so please login",
    }).then(() => {
      if (isLoggedIn) {
        updateQuantity(productID, productQuantity);
        navigate("/cart")
      } else {
        navigate("/login", { state: { from: location.pathname } })
      }

    })
  };


  const handleBuyNow = () => {

    if (isLoggedIn) {
      navigate("/payment", { state: { product, productQuantity } });
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };


  return (
    <div className="container pb-5">
      {product?.availabilityStatus &&
        <>
          <div className="row">
            <div className="col-md-6">
              {product?.images?.length > 0 && (
                <div className="image-section-container">

                  <ImageSection
                    images={product?.images}
                    wishlistItem={wishlistItem}
                    handleWishlistClick={handleWishlistClick}
                    product={product}
                  />

                </div>

              )}
            </div>
            <div className="col-md-6 productPage-col-2 mt-3">

              <h2 style={{ color: "#e1997e" }}>
                {product.title}
                <br />
              </h2>
              <p>{product.description}</p>
             
               <Rating product={product}></Rating>

              <p style={{
                fontSize: "18px",
                color: "#26a541",
                fontWeight: "bold"
              }}
              >
                Special price
              </p>
              <span
                style={{
                  textDecoration: 'line-through',
                  color: '#888'
                }}
              >
                ₹{(product.price + ((product.price * product.discountPercentage) / 100)).toFixed(2)}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginLeft: "9px"
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
                  fontWeight: "bold"
                }}
              >
                {product?.discountPercentage}% off
              </span>
              <p></p>
              <p>Minimum Order Quantity: {product.minimumOrderQuantity} (Total Stock : {product.stock})</p>
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

              <div className="d-flex  mb-3">
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



              {/* <div className="mt-4" style={{ color: "#e1997e" }}>
              <h3 className="mb-4">Customer Reviews</h3>

              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  defaultValue={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">Comments</label>
              </div>

              <div className="mb-3">
                Rate Us:
                <div className="d-flex">
                  <ReactStars
                    count={5}
                    size={24}
                    value={ratingStar}
                    onChange={ratingChanged}
                    color2={"#ffd700"}
                  />
                </div>
              </div>

              <div className="d-flex">
                <button className="btn btn-dark"
                  onClick={submitReview}
                  style={{
                    position: "relative",
                    right: "12px",
                    backgroundColor: "#ff9f00",
                    border: "none",
                    padding: "11px 16px",
                    borderRadius: "0px"
                  }}>
                  Submit Review
                </button>
              </div>
            </div> */}
            </div>
          </div>
          <div className="row mt-5">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div>
                <button
                  className="btn btn-dark"
                  onClick={handleToCart}
                  style={{
                    position: "relative",
                    right: "12px",
                    backgroundColor: "#ff9f00",
                    border: "none",
                    padding: "11px 16px",
                    borderRadius: "0px",
                    fontSize: "18px"
                  }}
                  data-tooltip-id="Addtocart-tooltip"
                >
                  <ShoppingCartIcon /> Add To Cart
                </button>
                <ReactTooltip id="Addtocart-tooltip" place="top" content="Add To Cart" />
              </div>
              <div >
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
                <ReactTooltip id="Buynow-tooltip" place="top" content="Buy Now" />
              </div>

            </div>
          </div>
        </>
      }
    </div>
  );
}

export default ProductPage;
