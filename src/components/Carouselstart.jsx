import React from "react";
import Carousel from "react-bootstrap/Carousel";
import imageslide1 from "../assets/images/1.jpg";
import imageslide2 from "../assets/images/2.jpg";
import imageslide3 from "../assets/images/3.jpg";
import imageslide4 from "../assets/images/4.jpg";
import imageslide5 from "../assets/images/5.jpg";
import "../assets/styles/imageSlide.css";

function Carouselstart() {
  return (
    <>
      <Carousel className="container">
        <Carousel.Item interval={1000}>
          <img className="slide-img" src={imageslide1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="slide-img" src={imageslide2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="slide-img" src={imageslide3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="slide-img" src={imageslide4} alt="fourth slide" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="slide-img" src={imageslide5} alt="fifth slide" />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Carouselstart;
