import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import CheckWishlistItemButton from "./CheckWishListButton";

const SliderForShop = ({ allProducts }) => {
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-next `}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <FaArrowRight className="custom-arrow right-arrow "></FaArrowRight>
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-prev `}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <FaArrowLeft className="custom-arrow right-arrow"></FaArrowLeft>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="single-slider mx-auto">
      <Slider {...settings}>
        {allProducts.map((product) => (
          <div className="slide-item mt-4" key={product.id}>
            <Card
              className="product-card"
              style={{ height: "100%", border: "2px solid #e1997e" }}
            >
              <div className="image-container">
                <CheckWishlistItemButton product={product} />

                <Card.Img
                  className="product-image"
                  variant="top"
                  src={product.thumbnail}
                />
              </div>
              <Card.Body className="mt-2">
                <Card.Title className="product-title">
                  {product.title}
                </Card.Title>

                <Rating product={product} />

                <Card.Text>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      paddingRight: "8px",
                    }}
                  >
                    ₹{product.price.toFixed(2)}
                  </span>

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
                      position: "relative",
                      color: "#26a541",
                      fontWeight: "bold",
                      paddingLeft: "8px",
                    }}
                  >
                    {product.discountPercentage}% off
                  </span>
                </Card.Text>
                <div className="mt-auto mb-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn"
                    style={{ backgroundColor: "rgb(225, 153, 126)" }}
                  >
                    View Product Details
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderForShop;
