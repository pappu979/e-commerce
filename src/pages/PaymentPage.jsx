import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../helper/LogOut";
import PriceDetails from "../components/PriceDetails";
import PaymentAdressDetails from "../components/PaymentAdressDetails";
import PaymentOrderSummary from "../components/PaymentOrderSummary";
import EditDeliveryAdress from "../components/EditDeliveryadress";
import PaymentDefaultAddress from "../components/PaymentDefaultAddress";
import useDateInfo from "../utils/dateUtilis";
import bank from "../data/indianBanks.json";
import { addresses } from "../data/address";
import "../styles/payment.css";

export default function PaymentPage() {

  const intialState = {
    selectedAddress: 0,
    chnageLogin: false,
    deliveryAdress: true,
    editDelivery: false,
    orderSummary: false,
    selectOrderSummary: false,
    selectPaymetOption: false,
    selectedAddressDelivery: null,
    selectedOption: "UPI",
    timeLeft: 14 * 60
  }
  const [stateData, setStateData] = React.useState(intialState);

  const { currentDate, currentMonth, deliveryDay } = useDateInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const { product, productQuantity } = location?.state || {};
  let platformFee = 0;
  let savePrice = ((product?.price * product?.discountPercentage) / 100).toFixed(2);

  const userData = JSON.parse(localStorage?.getItem("userData")) || {};

  React.useEffect(() => {
   
    const interval = setInterval(() => {
      setStateData((prevState) => ({
        ...prevState,
        timeLeft: prevState?.timeLeft - 1,
      }));
    }, 1000);

    if (stateData?.timeLeft <= 0) {
      clearInterval(interval);
      alert('Time up! Redirecting you to the cart page.');
      navigate('/products');
    }

    return () => clearInterval(interval);
  }, [stateData?.timeLeft, navigate]);


  if (!product || !productQuantity) {
    navigate("/products");
  }

  if (product?.price < 100) {
    platformFee = 0;
  } else if (product?.price > 100 && product?.price < 500) {
    platformFee = 5;
  } else {
    platformFee = 10;
  }

  const updateState = (key, value) => {
    setStateData((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleOpenDelivaryAddress = () => {
    updateState("deliveryAdress", true);
    updateState("selectOrderSummary", false);
    updateState("selectPaymetOption", false);
  }

  const handleOptionChange = (event) => {
    updateState("selectedOption", event.target.value);
  };

  const handleDelivery = (addr) => {
    updateState("selectedAddressDelivery", addr);
    updateState("selectOrderSummary", true);
    updateState("orderSummary", true);
    updateState("deliveryAdress", false)
  };

  const handleChange = () => {
    updateState("selectedAddressDelivery", false);
    updateState("chnageLogin", true);
    updateState("selectPaymetOption", false);
    updateState("deliveryAdress", false)
  }
  const handleCheck = () => {
    updateState("chnageLogin", false);
    updateState("selectOrderSummary", false);
    updateState("deliveryAdress", true)
  }

  const handleEdit = () => {
    updateState("editDelivery", true)
  }

  const handleCancel = () => {
    updateState("editDelivery", false)
  }

  const handleContinue = () => {
    updateState("selectOrderSummary", false);
    updateState("selectPaymetOption", true);
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
                <p style={{ fontSize: "14px" }}>{userData?.mobileNumber || +916352075082}</p>
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
              {stateData?.chnageLogin &&
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

            {stateData?.deliveryAdress && !stateData?.editDelivery &&
              <PaymentDefaultAddress
                addresses={addresses}
                selectedAddress={stateData?.selectedAddress}
                updateState={updateState}
                handleDelivery={handleDelivery}
                handleEdit={handleEdit}>
              </PaymentDefaultAddress>
            }
            {stateData?.orderSummary && !stateData?.deliveryAdress &&
              <>
                <p>{stateData?.selectedAddressDelivery?.name}, {stateData?.selectedAddressDelivery?.address}</p>
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

           {/* Edit Address Section */}
            {stateData?.editDelivery &&
              <EditDeliveryAdress handleCancel={handleCancel}></EditDeliveryAdress>
            }
          </div>

         {/* Order Summary Section */}
          <PaymentOrderSummary
            selectOrderSummary={stateData?.selectOrderSummary}
            product={product}
            productQuantity={productQuantity}
            deliveryDay={deliveryDay}
            month={currentMonth}
            date={currentDate}
            userData={userData}
            handleContinue={handleContinue}
          ></PaymentOrderSummary>

         {/* Payment Options Section */}
          <PaymentAdressDetails
            selectPaymetOption={stateData?.selectPaymetOption}
            selectedOption={stateData?.selectedOption}
            timeLeft={stateData?.timeLeft}
            handleOptionChange={handleOptionChange}
            product={product}
            productQuantity={productQuantity}
            platformFee={platformFee}
            indianBanks={bank}
          >
          </PaymentAdressDetails>
        </div>

        {/* Price Details Section */}
        <PriceDetails
          selectedOption={stateData?.selectedOption}
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
