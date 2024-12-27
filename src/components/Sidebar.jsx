import React from "react";
import SidbarMainContent from "./SidbarMainContent";
import { Container, Row, Col, Nav, Accordion } from "react-bootstrap";
import {
  PersonFill,
  CartFill,
  GearFill,
  CreditCardFill,
  FolderFill,
  BoxArrowRight,
} from "react-bootstrap-icons";
import { logout } from "../reducres/userReducer";
import { useDispatch } from "react-redux";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = React.useState(
    "Profile Information"
  );
  const dispatch = useDispatch();

  const handleSelectedOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container fluid className="mb-5">
      <Row>
        {/* Sidebar Section */}
        <Col xs={12} md={4} lg={3} className="bg-light p-3">
          <div className="sidebar-top mb-4 d-flex">
            <PersonFill size={30} color="#2874f0" />
            <span className="ms-2" style={{ fontSize: "20px" }}>
              Hello
            </span>
          </div>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link
                href="#"
                className="text-danger d-flex align-items-center"
              >
                <CartFill size={16} className="me-2" />
                My Orders
              </Nav.Link>
            </Nav.Item>
            <Accordion flush>
              {/* Account Settings */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <GearFill className="me-2" />
                  Account Settings
                </Accordion.Header>
                <Accordion.Body>
                  <Nav.Link
                    href="#"
                    onClick={() =>
                      handleSelectedOptionClick("Profile Information")
                    }
                  >
                    Profile Information
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() =>
                      handleSelectedOptionClick("Manage Addresses")
                    }
                  >
                    Manage Addresses
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() =>
                      handleSelectedOptionClick("PAN Card Information")
                    }
                  >
                    PAN Card Information
                  </Nav.Link>
                </Accordion.Body>
              </Accordion.Item>

              {/* Payments */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <CreditCardFill className="me-2" />
                  Payments
                </Accordion.Header>
                <Accordion.Body>
                  <Nav.Link
                    href="#"
                    onClick={() => handleSelectedOptionClick("Gift Cards")}
                  >
                    Gift Cards
                  </Nav.Link>
                  <Nav.Link href="#">Saved UPI</Nav.Link>
                  <Nav.Link href="#">Saved Cards</Nav.Link>
                </Accordion.Body>
              </Accordion.Item>

              {/* My Stuff */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <FolderFill className="me-2" />
                  My Stuff
                </Accordion.Header>
                <Accordion.Body>
                  <Nav.Link href="#">My Coupons</Nav.Link>
                  <Nav.Link href="#">My Reviews & Ratings</Nav.Link>
                  <Nav.Link href="#">All Notifications</Nav.Link>
                  <Nav.Link
                    href="#"
                    onClick={() => handleSelectedOptionClick("My Wishlist")}
                  >
                    My Wishlist
                  </Nav.Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Logout */}
            <Nav.Item className="mt-3">
              <Nav.Link
                href="#"
                className="text-danger"
                onClick={() => dispatch(logout())}
              >
                <BoxArrowRight className="me-2" />
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Main Content Section */}
        <Col xs={12} md={8} lg={9} className="p-3">
          <SidbarMainContent selectedOption={selectedOption} />
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
