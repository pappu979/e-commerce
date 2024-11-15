import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Slider from "react-slick";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useWishlist } from "../provider/WishlistProvider";
import { toast } from 'react-toastify';
import Rating from "../components/Rating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ProductSlider.css";


// CustomPrevArrow component
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaArrowLeft className="custom-arrow right-arrow" />
    </div>
  );
};

// CustomNextArrow component
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaArrowRight className="custom-arrow right-arrow" />
    </div>
  );
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = React.useState([]);
  const { addToWishList, wishlistItem, removeFromWishList } = useWishlist();

  React.useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${categoryName}`)
      .then((json) => setProducts(json.data.products));
  }, [categoryName]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  const handleWishlistClick = (product) => {
    const isAlreadyWishlisted = wishlistItem.some((item) => item.id === product.id);

    if (isAlreadyWishlisted) {
      // If the product is already in the wishlist, remove it
      removeFromWishList(product.id);
    } else {
      // If the product is not in the wishlist, add it
      addToWishList(product);

      // Show success message when added to wishlist
      toast.success(`${product.title} has been added to your wishlist!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
    <div className="container">
      <div className="my-6 text-center text-dark">
        <h1>{categoryName.toUpperCase()}</h1>
        <p className="text-danger">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
          officia nihil! Nemo sunt reprehenderit voluptates amet itaque libero
          in unde, molestias illo veniam, dolore veritatis eaque ipsum.
          Molestiae, nam architecto!
        </p>
      </div>

      <Slider {...sliderSettings}
        className="product-slider"
      >
        {products.map((val, key) => (
          <div
            className="product-card-container mt-4"
            key={key}
          >

            <Card
              className="product-card text-dark"
              style={{
                backgroundColor: "white",
                border: "2px solid #e1997e",
                height: "100%",
              }}
            >
              <button onClick={() => handleWishlistClick(val)} className="btn text-end">
                {
                  wishlistItem.some((item) => item.id === val.id) ?
                    <FavoriteIcon color="error" />
                    : <FavoriteBorderIcon />
                }
              </button>
              <Card.Img
                variant="top"
                src={val.thumbnail}
                style={{
                  maxHeight: "250px",
                  height: "100%",
                  objectFit: "contain"
                }}
              />
              <Card.Body className="d-flex flex-column h-100">
                <Card.Title>{val.title}</Card.Title>
                
                <Rating product={val}></Rating>

                <div className="mt-auto">
                  <Card.Text>

                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        paddingRight: "8px"
                      }}
                    >
                      ₹{(val?.price).toFixed(2)}
                    </span>

                    <span
                      style={{
                        textDecoration: 'line-through',
                        color: '#888',
                      }}
                    >
                      ₹{(val?.price + ((val?.price * val?.discountPercentage) / 100)).toFixed(2)}
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        position: "relative",
                        color: "#26a541",
                        fontWeight: "bold",
                        paddingLeft: "8px"
                      }}
                    >
                      {val?.discountPercentage}% off
                    </span>
                  </Card.Text>
                  <button className="btn mb-2" style={{ background: "#e1997e" }}>
                    <Link
                      className="text-decoration-none text-danger mt-2"
                      to={`/products/${val.id}`}
                    >
                      Product Details
                    </Link>

                  </button>
                </div>

              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}