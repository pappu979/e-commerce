import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import imageL from "../images/12.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducres/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUserCartItems } from "../reducres/cartReducer";
import { loadUserSaveItems } from "../reducres/saveForLaterReducer";
import { loadUserWishlistItem } from "../reducres/wishListReducer";

function NavigationBar() {
  const [hoverEffect, setHoverEffect] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItem = useSelector((state) => state.wishlist.wishlistItems);
  const saveForLaterItems = useSelector(
    (state) => state.saveForLater.saveItems
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (currentUser) {
      dispatch(loadUserCartItems({ userId: currentUser.id }));
      dispatch(loadUserSaveItems({ userId: currentUser.id }));
      dispatch(loadUserWishlistItem({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  const handleMouseEnter = () => setHoverEffect(true);
  const handleMouseLeave = () => setHoverEffect(false);

  const handleShowCart = () => {
    if (currentUser) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    if (!currentUser) {
      toast.info("You are already Logout!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(logout());
    }
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg " style={{ backgroundColor: "#e1997e" }}>
        <Container fluid>
          <Navbar.Brand href="#">
            <Link className="d-inline-block align-top mx-5" to="/">
              {" "}
              <img src={imageL} width="100" height="70" alt=" logo" />
            </Link>
          </Navbar.Brand>
          <div className="d-flex flex-grow-1 mx-5">
            <input
              type="text"
              placeholder="Search for Products, Brands and More..."
              className="form-control me-2"
              style={{ maxWidth: "400px" }}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </div>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-3 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            />
            <Nav className="ms-auto" navbarScroll>
              <Link className="ms-4 btn " to="/">
                Home
              </Link>
              <Link className="ms-4 btn " to="/shop">
                Shop
              </Link>
              <Dropdown
                className="ms-4 d-flex justify-content-center align-items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                show={hoverEffect}
              >
                <Dropdown.Toggle variant="btn" id="dropdown-basic">
                  Account
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ top: "35px" }}>
                  <Dropdown.Item as={Link} to="/profile">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      style={{ marginRight: "6px" }}
                    />
                    My Profile
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item as={Link} to="/signup">
                    <PersonAddIcon style={{ marginRight: "15px" }} />
                    Sign Up
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item as={Link} to="/login">
                    <LoginIcon style={{ marginRight: "15px" }} />
                    Login
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item as={Link} to="/wishlist">
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ marginRight: "8px" }}
                    />
                    My Wishlist
                    <span className="ms-2">{wishlistItem.length}</span>
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item as={Link} to="/saveforlater">
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: "8px" }}
                    />
                    Save List
                    <span className="ms-2">{saveForLaterItems.length}</span>
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item onClick={handleLogout}>
                    <LogoutIcon style={{ marginRight: "8px" }} />
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div
                className="ms-4 btn position-relative"
                onClick={handleShowCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
                {cartItems.length > 0 && (
                  <span
                    className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
