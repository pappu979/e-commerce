import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../images/m11.webp";
import image2 from "../images/m12.webp";
import image3 from "../images/m13.webp";
import image4 from "../images/m14.webp";
import image5 from "../images/m8.jpg";
import image6 from "../images/m9.jpg";
import image7 from "../images/m7.jpg";

const ProductCarousel = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  const [page, setPage] = React.useState(1);
  const cardsPerPage = 10;
  const totalPages = Math.ceil(images.length / cardsPerPage);

  const handlePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = page * cardsPerPage;
  const visibleImages = images.slice(startIndex, endIndex);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section style={{ background: "#e1997e" }}>
      <Container id="about" className="pb-5">
        <Row className="d-flex pt-5">
          <Col
            md={12}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <Container>
              <Slider {...sliderSettings} className="product-slider">
                {visibleImages.map((image, index) => (
                  <div key={index} className="text-center mb-4">
                    <Card
                      className="product-card"
                      style={{
                        borderColor: "black",
                        margin: "0 15px",
                        padding: "5px 8px"
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={image}
                        style={{ objectFit: "cover", height: "100%" }}
                        alt={`Product ${startIndex + index + 1}`}
                      />
                      <Card.Body>
                        <Card.Title>{`Product ${startIndex + index + 1
                          }`}</Card.Title>
                        <Button
                          variant="dark"
                          className="w-100"
                          style={{ backgroundColor: "#e1997e" }}
                        >
                          <Link
                            to={`/products/${startIndex + index + 1}`}
                            className="btn btn-secoundary"
                          >
                            Sale
                          </Link>

                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Slider>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductCarousel;
