import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import CheckWishlistItemButton from "../components/CheckWishListButton";
import Rating from "../components/Rating";
import Loader from "../utils/loader/Loader";
import "../assets/styles/ProductSlider.css";

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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${categoryName}`
        );
        const result = await response.json();
        setProducts(result.products);
      } catch (error) {
        setError("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      <Slider {...sliderSettings} className="product-slider">
        {loading ? (
          <Loader></Loader>
        ) : (
          products.map((product, key) => (
            <div className="product-card-container mt-4" key={key}>
              <Card
                className="product-card text-dark"
                style={{
                  backgroundColor: "white",
                  border: "2px solid #e1997e",
                  height: "100%",
                }}
              >
                <CheckWishlistItemButton product={product} />
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  style={{
                    maxHeight: "250px",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <Card.Body className="d-flex flex-column h-100">
                  <Card.Title>{product.title}</Card.Title>

                  <Rating product={product}></Rating>

                  <div className="mt-auto">
                    <Card.Text>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          paddingRight: "8px",
                        }}
                      >
                        ₹{(product?.price).toFixed(2)}
                      </span>

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
                          fontSize: "18px",
                          position: "relative",
                          color: "#26a541",
                          fontWeight: "bold",
                          paddingLeft: "8px",
                        }}
                      >
                        {product?.discountPercentage}% off
                      </span>
                    </Card.Text>
                    <button
                      className="btn mb-2"
                      style={{ background: "#e1997e" }}
                    >
                      <Link
                        className="text-decoration-none text-danger mt-2"
                        to={`/products/${product.id}`}
                      >
                        Product Details
                      </Link>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
        {error && <p>{error}</p>}
      </Slider>
    </div>
  );
}
