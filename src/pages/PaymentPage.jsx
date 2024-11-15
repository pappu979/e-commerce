import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import CashOnDelivery from "../components/CashOnDelivery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../helper/LogOut";
import "../styles/payment.css";

export default function PaymentPage() {

  const [selectedAddress, setSelectedAddress] = React.useState(0);
  const [chnageLogin, setChangeLogin] = React.useState(false);
  const [deliveryAdress, setDeliveryAdress] = React.useState(true);
  const [editDelivery, setEditDelivery] = React.useState(false);
  const [orderSummary, setOrderSummary] = React.useState(false);
  const [selectOrderSummary, setSelectOrderSummary] = React.useState(false);
  const [selectPaymetOption, setSelectPaymetOption] = React.useState(false)
  const [selectedAddressDelivery, setSelectedAddressDelivery] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState('UPI');
  const [timeLeft, setTimeLeft] = React.useState(14 * 60);

  const [formData, setFormData] = React.useState({
    name: "",
    password: "",
    pincode: "",
    locality: "",
    city: "",
    state: "",
    zip: "",
    description: "",
    landmark: "",
    alternate: "",
    deliveryOption: "",
  });

  const indianBanks = [
    "HDFC Bank",
    "ICICI Bank",
    "State Bank of India",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Indian Bank",
    "IDBI Bank",
    "IndusInd Bank",
    "Yes Bank",
    "Bank of India",
    "UCO Bank",
    "Central Bank of India",
    "IDFC First Bank",
    "Bank of Maharashtra",
    "Federal Bank",
    "RBL Bank",
    "South Indian Bank",
    "Karur Vysya Bank",
    "Dhanlaxmi Bank",
    "Tamilnad Mercantile Bank",
    "Punjab & Sind Bank",
    "Jammu & Kashmir Bank",
    "Suryoday Small Finance Bank",
    "AU Small Finance Bank",
    "Ujjivan Small Finance Bank",
    "Equitas Small Finance Bank"
  ];


  const { name, password, pincode, locality, description, city, state, landmark, alternate, deliveryOption } = formData;

  const daysOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date();
  const dayPlus4 = (date.getDay() + 4) % 7;
  const dayNamePlus4 = daysOfWeek[dayPlus4];
  const month = daysOfMonth[date.getMonth()];

  const location = useLocation();
  const navigate = useNavigate();
  const { product, productQuantity } = location.state || {};
  const addresses = [
    {
      name: "Pappu",
      phone: "+916352075082",
      address: "Rajput Mohla, Charanwasi, Sardarshahar Subdistrict, Churu District, Rajasthan - 331403",
    },
    {
      name: "Pappu",
      phone: "+916352075082",
      address: "Rajput Mohla, Charanwasi, Churu, Rajasthan - 331403",
    },
    {
      name: "Pappu",
      phone: "+916352075082",
      address: "Rajput Mohla, Churu, Rajasthan - 331403",
    },
  ];

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  let platformFee = 0;


  if (!product || !productQuantity) {
    navigate("/products");
  }

  const handlePayment = () => {
    console.log("Proceeding to payment for product:", product, "with quantity:", productQuantity);
  };

  if (product.price < 100) {
    platformFee = 0;
  } else if (product.price > 100 && product.price < 500) {
    platformFee = 5;
  } else {
    platformFee = 10;
  }

  let savePrice = ((product.price * product.discountPercentage) / 100).toFixed(2);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
      alert('Time up! Redirecting you to the cart page.');
      navigate('/cart');
    }

    return () => clearInterval(interval);
  }, [timeLeft, navigate]);

  const handleOpenDelivaryAddress = () => {
    setDeliveryAdress(true);
    setSelectOrderSummary(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDelivery = (addr) => {
    setSelectedAddressDelivery(addr);
    setSelectOrderSummary(true)
    setOrderSummary(true)
    setDeliveryAdress(false)
    console.log("Selected Address for Delivery:", addr);
  };

  const handleChange = () => {
    setSelectOrderSummary(false)
    setChangeLogin(true);
    setDeliveryAdress(false);
  }
  const handleCheck = () => {
    setSelectOrderSummary(false)
    setChangeLogin(false);
    setDeliveryAdress(true);
  }

  const handleEdit = () => {
    setEditDelivery(true);
  }

  const handleSubmit = () => {
    console.log(formData);
  }

  const handleCancel = () => {
    setEditDelivery(false);
  }

  const handleContinue = () => {
    setSelectOrderSummary(false)
    setSelectPaymetOption(true)
  }

  const handleLogout = () => {
  logout(navigate)
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-8">
          <div className="login-section">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="login-title">1 LOGIN ✔️
                <p style={{ fontSize: "14px" }}>{userData.mobileNumber}</p>
              </div>
              <div className="login-details">
                <button style={{
                  background: "#fff",
                  padding: "11px 16px",
                  border: "1px solid grey", color: "#000"
                }}
                  onClick={handleChange}
                >
                  Change
                </button>
              </div>
            </div>
            <div>
              {chnageLogin &&
                <div>
                  <button className="mb-2"
                    style={{ color: "blue", border: "none", display: "block" }}
                    onClick={handleLogout}
                  >
                    Logout & sign up to another account</button>
                  <button style={{
                    backgroundColor: "#fb641b",
                    padding: "11px 16px", color: "#fff",
                    fontSize: "17px", fontWeight: "700",
                    border: "none"
                  }}
                    onClick={handleCheck}
                  >Checkout continue</button>
                </div>
              }
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className="address-section">
            <h3 className="section-title">2 DELIVERY ADDRESS</h3>

            {deliveryAdress && !editDelivery &&
              <>
                {addresses.map((addr, index) => (
                  <div key={index} className={`address-box ${selectedAddress === index ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === index}
                      onChange={() => setSelectedAddress(index)}
                    />
                    <div className="address-content">
                      <span>{addr.name}</span> <span>{addr.phone}</span>
                      <p>{addr.address}</p>
                      {selectedAddress === index && <button style={{
                        background: "#fb641b",
                        padding: "11px 16px",
                        border: "none", color: "#fff"
                      }}
                        onClick={() => handleDelivery(addr)}
                      >
                        DELIVERY HERE
                      </button>}
                    </div>
                    {selectedAddress === index &&
                      <button className="edit-btn" onClick={handleEdit}>EDIT</button>}
                  </div>
                ))}
                <button className="add-new-btn" onClick={() => setEditDelivery(true)}>+ Add a new address</button>
              </>
            }
            {orderSummary && !deliveryAdress &&
              <>
                <p>{selectedAddressDelivery.name}, {selectedAddressDelivery.address}</p>
                <button style={{
                  background: "#fff",
                  padding: "11px 16px",
                  border: "1px solid grey", color: "#000"
                }}
                  onClick={handleOpenDelivaryAddress}
                >
                  Change</button>
              </>
            }

            {editDelivery &&
              <div className="signup-form">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="email"

                        value={name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"

                        value={password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="my-3">
                    <Form.Group as={Col} controlId="formGridAddress1">
                      <Form.Label>PinCode</Form.Label>
                      <Form.Control

                        value={pincode}
                        onChange={(e) =>
                          setFormData({ ...formData, pincode: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress2">
                      <Form.Label>Locality</Form.Label>
                      <Form.Control
                        value={locality}
                        onChange={(e) =>
                          setFormData({ ...formData, locality: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group as={Col} controlId="formGridDescription">
                    <Form.Label>Address (Area and Street)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Row className="mb-2">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City/District/Town</Form.Label>
                      <Form.Control
                        value={city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        value={state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                      >
                      </Form.Control>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Landmark(Optinal)</Form.Label>
                      <Form.Control
                        value={landmark}
                        onChange={(e) =>
                          setFormData({ ...formData, landmark: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Alternate Phone(Optinal)</Form.Label>
                      <Form.Control
                        value={alternate}
                        onChange={(e) =>
                          setFormData({ ...formData, alternate: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>

                  <div style={{ marginTop: "20px" }} className="row">
                    <Form.Group as={Col} controlId="formGridRadio1">
                      <Form.Check
                        type="radio"
                        label="Home (All day delivery)"
                        name="deliveryOption"
                        value="home"
                        onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
                        checked={deliveryOption === "home"}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridRadio2">
                      <Form.Check
                        type="radio"
                        label="Work (delivery between 10 AM - 5 PM)"
                        name="deliveryOption"
                        value="work"
                        onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
                        checked={deliveryOption === "work"}
                      />
                    </Form.Group>
                  </div>

                  <div className="row">
                    <Button as={Col} variant="primary" type="submit" className="mx-2" >
                      SAVE AND DELIVERY HERE
                    </Button>
                    <Button as={Col} variant="primary" type="submit" onClick={handleCancel} >
                      CANCEL
                    </Button>
                  </div>
                </Form>
              </div>
            }
          </div>


          <div className="address-section">
            <h3 className="section-title">3 ORDER SUMMARY</h3>
            {selectOrderSummary &&
              <>
                <div className="row d-flex align-items-center justify-content-center">


                  <div className="col-md-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: '100%' }}
                    />
                    <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
                      <button
                        className="btn  mx-2"
                        disabled={product.productQuantity <= 1}
                        onClick={() => updateQuantity(product.id, productQuantity - 1)}
                        style={{
                          padding: "4px 8px",
                          border: "1px solid grey",
                          borderRadius: "50%"
                        }}
                      >
                        -
                      </button>

                      <span style={{
                        padding: "6px 12px",
                        border: "1px solid grey"
                      }}
                      >
                        {productQuantity}
                      </span>

                      <button
                        className="btn  mx-2"
                        onClick={() => updateQuantity(product.id, productQuantity + 1)}
                        style={{
                          padding: "4px 8px",
                          border: "1px solid grey",
                          borderRadius: "50%"
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h6>{product.title}</h6>

                    <p>Seller: {product.seller || "Unknown"}</p>

                    <div className=" text-right mb-2">
                      <span style={{
                        textDecoration: 'line-through',
                        color: '#888'
                      }}
                      >
                        ₹{(product.price + ((product.price * product.discountPercentage) / 100)).toFixed(2)}
                      </span>
                      <span style={{
                        marginLeft: "10px"
                      }}
                      >
                        ₹{(product.price * productQuantity).toFixed(2)}
                      </span>
                      <span style={{
                        position: "relative",
                        left: "12px",
                        color: "#388e3c",
                        fontWeight: "500"
                      }}
                      >
                        {product.discountPercentage}% Off
                      </span>
                    </div>

                    <button
                      className="btn p-0 mt-2 fw-bold"
                      onClick={() => removeFromCart(product.id)}
                      style={{ fontSize: "18px", marginLeft: "16px" }}
                    >
                      Remove
                    </button>

                  </div>
                  <div className="col-md-4">
                    <span>Delivery by {dayNamePlus4} {date.getDate() + 4} {month}</span> |
                    <span style={{
                      textDecoration: 'line-through',
                      color: '#888',
                      marginRight: "5px",
                      marginLeft: "5px"
                    }}>
                      40
                    </span>
                    <span style={{ color: "green" }}>Free</span>
                  </div>

                </div>
                <div className="mt-4">
                  <span >Order confirmation email will be sent to <strong style={{ fontSize: "14px" }}>{userData.mobileNumber}</strong></span>
                  <button style={{
                    background: "#fb641b",
                    padding: "11px 22px",
                    border: "none", color: "#fff",
                    marginLeft: "20PX"
                  }}
                    onClick={handleContinue}
                  >
                    CONTINUE
                  </button>
                </div>
              </>
            }
          </div>

          <div className="address-section">
            <h3 className="section-title">4 PAYMENT OPTIONS</h3>
            {selectPaymetOption &&
              <>
                <div style={{ padding: "10px 0", border: "1px solid grey", display: "flex" }} className="mb-2 text-center">
                  <p style={{ paddingLeft: "10px" }}>Complete payment in</p>
                  <p style={{ paddingLeft: "10px" }}><FontAwesomeIcon icon={faClock} /> {formatTime(timeLeft)}</p>
                </div>
                <div style={{ padding: "10px 20px", border: "1px solid grey" }} className="mb-2">
                  <div className="mb-4">
                    <label>
                      <input
                        type="radio"
                        value="UPI"
                        checked={selectedOption === 'UPI'}
                        onChange={handleOptionChange}
                      />
                      <strong className="mx-4">UPI</strong>
                    </label>
                    {selectedOption === 'UPI' && (
                      <div style={{ paddingLeft: '20px' }}>
                        <p>Choose an option</p>
                        <label >
                          <input type="radio" name="upi-option" value="PhonePe" />
                          <span className="mx-2">PhonePe</span>
                        </label>
                        <br />
                        <label className="mt-2">
                          <input type="radio" name="upi-option" value="UPI ID" />
                          <span className="mx-2">Your UPI ID</span>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label>
                      <input
                        type="radio"
                        value="Wallets"
                        checked={selectedOption === 'Wallets'}
                        onChange={handleOptionChange}
                      />
                      <strong className="mx-4">Wallets</strong>
                    </label>
                    {selectedOption === 'Wallets' && (
                      <div style={{ paddingLeft: '20px' }}>
                        <label >
                          <input type="radio" name="upi-option" value="PhonePe" />
                          <span className="mx-2">PhonePe Wallets</span>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label>
                      <input
                        type="radio"
                        value="Credit/Debit"
                        checked={selectedOption === 'Credit/Debit'}
                        onChange={handleOptionChange}
                      />
                      <strong className="mx-4">Credit / Debit / ATM Card</strong>
                    </label>
                    <p style={{ paddingLeft: "20px" }}>Add and secure cards as per RBI guidelines</p>
                    {selectedOption === 'Credit/Debit' && (
                      <>
                        <div className="row d-flex align-items-center debit-card">
                          <div className="col-md-4">
                            <input type="number" placeholder="Enter Card Number" style={{ padding: "8px 15px", width: "100%" }} />
                          </div>
                          <div className="col-md-4">
                            <input type="date" placeholder="Valid Thru" style={{ padding: "8px 15px" }} />
                          </div>
                          <div className="col-md-4">
                            <input type="number" placeholder="CVV" className="payment-credit-cvv" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            style={{
                              padding: "11px 22px",
                              border: "none", background: "#fb641b"
                            }}>
                            PAY ₹{Math.ceil((product.price * productQuantity) + platformFee)}
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mb-4">
                    <label>
                      <input
                        type="radio"
                        value="NetBanking"
                        checked={selectedOption === 'NetBanking'}
                        onChange={handleOptionChange}
                      />
                      <strong className="mx-4">Net Banking</strong>
                    </label>
                    <p style={{ paddingLeft: "20px" }}>This instrument has low success; use UPI or cards for better experience.</p>
                    {selectedOption === 'NetBanking' && (
                      <div style={{ paddingLeft: '20px' }}>
                        <p className="my-2"><strong>Popular Banks</strong></p>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <div>
                            <input type="radio" name="upi-option" value="HDFC" checked={selectedOption === 'HDFC'} onChange={handleOptionChange} />
                            <span className="mx-2">HDFC Bank</span>
                          </div>

                          <div>
                            <input type="radio" name="upi-option" value="ICICI" checked={selectedOption === 'ICICI'} onChange={handleOptionChange} />
                            <span className="mx-2">ICICI Bank</span>
                          </div>

                          <div>
                            <input type="radio" name="upi-option" value="SBI" checked={selectedOption === 'SBI'} onChange={handleOptionChange} />
                            <span className="mx-2">SBI Bank</span>
                          </div>

                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap" }}>

                          <div>
                            <input type="radio" name="upi-option" value="Axis" checked={selectedOption === 'Axis'} onChange={handleOptionChange} />
                            <span className="mx-2">Axis Bank</span>
                          </div>

                          <div>
                            <input type="radio" name="upi-option" value="Kotak Mahindra" checked={selectedOption === 'Kotak Mahindra'} onChange={handleOptionChange} />
                            <span className="mx-2">Kotak Mahindra Bank</span>
                          </div>


                        </div>

                        <div className="mt-2">
                          <p className="mb-2"><strong>Other Banks</strong></p>
                          <select name="" id="bankSelect"
                            value={selectedOption === "selectBank"}
                            onChange={handleOptionChange}
                            className="bankSelect"
                          >
                            <option value="">---Select Bank---</option>
                            {indianBanks.map((bank, index) => (
                              <option value={bank} key={index}>{bank}</option>
                            ))}
                          </select>
                        </div>

                        <div className="mt-4">
                          <button
                            style={{
                              padding: "11px 22px",
                              border: "none", background: "#fb641b"
                            }}
                          >
                            PAY ₹{Math.ceil((product.price * productQuantity) + platformFee)}</button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label>
                      <input
                        type="radio"
                        value="CashOnDelivery"
                        checked={selectedOption === 'CashOnDelivery'}
                        onChange={handleOptionChange}
                      />
                      <strong className="mx-4">Cash on Delivery</strong>
                    </label>
                    {selectedOption === 'CashOnDelivery' &&
                      <CashOnDelivery selectedOption={selectedOption}></CashOnDelivery>
                    }
                  </div>

                  <div className="mb-4">
                    <label>
                      <input
                        type="radio"
                        value="EMI"
                        checked={selectedOption === 'EMI'}
                        onChange={handleOptionChange}
                        disabled
                      />
                      <strong className="mx-4">EMI (Easy Installments)</strong>
                      <span> Not applicable ?</span>
                    </label>
                  </div>

                </div>
              </>
            }
          </div>
        </div>

        {/* Price Details Section */}
        <div className="price-details-section col-md-4">
          <h3 className="section-title">PRICE DETAILS</h3>
          <div className="price-breakdown">
            <div className="price-item">
              <span>Price (1 item)</span>
              <span>₹{product.price * productQuantity}</span>
            </div>
            <div className="price-item">
              <span>Delivery Charges</span>
              <span>
                <span className="free-charge" style={{
                  textDecoration: 'line-through',
                  color: '#888',
                  marginRight: "8px"
                }}
                >
                  ₹80
                </span>
                <span style={{ color: "green", fontWeight: "600" }}>
                  FREE
                </span>
              </span>
            </div>
            <div className="price-item">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>

            {selectedOption === "CashOnDelivery" &&
              <div className="price-item">
                <span>Payment Handling Fee</span>
                <span>₹7</span>
              </div>
            }
            <div className="price-item total-payable">
              <span>Amount Payable</span>
              <span>
                ₹{selectedOption === "CashOnDelivery" ?
                  (product.price * productQuantity) + 7 + platformFee
                  : (product.price * productQuantity) + platformFee}
              </span>
            </div>
            <div className="price-item savings">
              <span>Your Total Savings on this order</span>
              <span>
                ₹{selectedOption === "CashOnDelivery" ?
                  (savePrice) - 7 - platformFee
                  : savePrice - platformFee}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
