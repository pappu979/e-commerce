import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import imageslide from "../assets/images/Imac.gif";

const WhyUs = () => {
  return (
    <section style={{ background: "#e1997e" }}>
      <Container id="about" className="pt-4">
        <Row className="mx-auto whyusRow-1">
          <div className="text-center mt-3">
            <h2 style={{ color: "white" }} data-aos="fade-zoom-in">
              Why Choose Us?
            </h2>
            <p data-aos="fade-zoom-in">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              aute irure dolor in reprehenderit
            </p>
          </div>
        </Row>
        <Row className="d-flex pt-4 align-items-center justify-content-center">
          <Col md={6}>
            <img src={imageslide} alt="" className="w-100" />
          </Col>
          <Col md={6}>
            <div className="px-md-4">
              <Row className="m-2">
                <Col sm={6} mb={3} mb-sm={0} data-aos="fade-up">
                  <Card>
                    <Card.Body>
                      <div className="card-text">
                        <h5 style={{ color: "#e1997e" }}>
                          Corporis voluptates sit
                        </h5>
                        <p>
                          Consequuntur sunt aut quasi enim aliquam quae harum
                          pariatur laboris nisi ut aliquip Consequuntur sunt aut
                          quasi enim aliquam quae harum pariatur laboris nisi ut
                          aliquip
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} mb={3} mb-sm={0} data-aos="fade-up">
                  <Card>
                    <Card.Body>
                      <div className="card-text">
                        <h5 style={{ color: "#e1997e" }}>
                          Corporis voluptates sit
                        </h5>
                        <p>
                          Consequuntur sunt aut quasi enim aliquam quae harum
                          pariatur laboris nisi ut aliquip Consequuntur sunt aut
                          quasi enim aliquam quae harum pariatur laboris nisi ut
                          aliquip
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="m-2">
                <Col
                  sm={6}
                  mb={3}
                  mb-sm={0}
                  data-aos="fade-up"
                  data-aos-duration="2500"
                >
                  <Card>
                    <Card.Body>
                      <div className="card-text">
                        <h5 style={{ color: "#e1997e" }}>
                          Corporis voluptates sit
                        </h5>
                        <p>
                          Consequuntur sunt aut quasi enim aliquam quae harum
                          pariatur laboris nisi ut aliquip Consequuntur sunt aut
                          quasi enim aliquam quae harum pariatur laboris nisi ut
                          aliquip
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  sm={6}
                  mb={3}
                  mb-sm={0}
                  data-aos="fade-up"
                  data-aos-duration="2500"
                >
                  <Card>
                    <Card.Body>
                      <div className="card-text">
                        <h5 style={{ color: "#e1997e" }}>
                          Corporis voluptates sit
                        </h5>
                        <p>
                          Consequuntur sunt aut quasi enim aliquam quae harum
                          pariatur laboris nisi ut aliquip Consequuntur sunt aut
                          quasi enim aliquam quae harum pariatur laboris nisi ut
                          aliquip
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyUs;
