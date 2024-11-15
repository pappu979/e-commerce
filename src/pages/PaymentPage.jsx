import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../helper/LogOut";
import "../styles/payment.css";
import PriceDetails from "../components/PriceDetails";
import PaymentAdressDetails from "../components/PaymentAdressDetails";
import PaymentOrderSummary from "../components/PaymentOrderSummary";
import EditDeliveryAdress from "../components/EditDeliveryadress";
import PaymentDefaultAddress from "../components/PaymentDefaultAddress";

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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDelivery = (addr) => {
    setSelectedAddressDelivery(addr);
    setSelectOrderSummary(true)
    setOrderSummary(true)
    setDeliveryAdress(false)
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

  const handleCancel = () => {
    console.log("cancel")
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
              <PaymentDefaultAddress 
              addresses={addresses} 
              selectedAddress={selectedAddress} 
              setSelectedAddress={setSelectedAddress} 
              handleDelivery={handleDelivery} 
              handleEdit={handleEdit}>
              </PaymentDefaultAddress>
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
               <EditDeliveryAdress handleCancel={handleCancel}></EditDeliveryAdress>
            }
          </div>


          <PaymentOrderSummary
            selectOrderSummary={selectOrderSummary}
            product={product}
            productQuantity={productQuantity}
            dayNamePlus4={dayNamePlus4}
            month={month}
            date={date}
            userData={userData}
            handleContinue={handleContinue}
          ></PaymentOrderSummary>

          <PaymentAdressDetails
            selectPaymetOption={selectPaymetOption}
            selectedOption={selectedOption}
            timeLeft={timeLeft}
            handleOptionChange={handleOptionChange}
            product={product}
            productQuantity={productQuantity}
            platformFee={platformFee}
            indianBanks={indianBanks}
          >
          </PaymentAdressDetails>
        </div>

        {/* Price Details Section */}
        <PriceDetails
          selectedOption={selectedOption}
          productQuantity={productQuantity}
          product={product}
          platformFee={platformFee}
          savePrice={savePrice}
        >
        </PriceDetails>
      </div>
    </div >
  );
}
