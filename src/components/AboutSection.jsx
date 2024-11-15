import React from "react";
import { Container, Row, Col } from "reactstrap";
import imageslide from "../images/about.png";

const AboutSection = ({ AboutSec }) => {
  return (
    <section className="about-section">
      <Container>
        <Row className="d-flex align-items-center justify-content-center">
          <Col lg="6" md="6">
            <div className="about-section-content d-flex align-items-center  flex-column">
              <h1 className="section-subtitle" style={{ color: "#e1997e" }}>
                About Us
              </h1>
              <h2 className="section-title">Welcome to Our Shopping Store</h2>
              <p className="section-description" style={{ color: "#e1997e" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloribus, ut vitae officia, nihil reprehenderit necessitatibus
                ipsum consequuntur, ratione voluptatibus amet culpa? Ipsum
                distinctio delectus, voluptate hic autem magnam dicta
                dolore?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem officia, facilis repellendus quod, laborum iure enim
                dicta doloremque magni vitae aut odit quisquam blanditiis
                laudantium consequatur libero expedita voluptates soluta.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about-image">
              <img src={imageslide} alt="" className="w-100" style={{maxHeight: "300px", height: "100%"}} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
