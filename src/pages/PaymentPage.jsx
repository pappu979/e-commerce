import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../helper/LogOut";
import PriceDetails from "../components/PriceDetails";
import EditDeliveryAdress from '../components/EditDeliveryadress';
import PaymentAdressDetails from "../components/PaymentAdressDetails";
import PaymentOrderSummary from "../components/PaymentOrderSummary";
import PaymentDefaultAddress from "../components/PaymentDefaultAddress";
import { 
  intialEditDeliveryAddressState, 
  intialPaymentPageState 
} from "../utils/intialPaymentData";
import PaymentLoginAccordian from "../components/PaymentLoginAccordian";
import useDateInfo from "../utils/dateUtilis";
import bank from "../data/indianBanks.json";
import { storeUserData, storedAddresses, currentUser } from "../utils/authKeys";
import "../styles/payment.css";

export default function PaymentPage() {

  const [stateData, setStateData] = React.useState(intialPaymentPageState);
  const [formData, setFormData] = React.useState(intialEditDeliveryAddressState);
  const [addresses, setAddresses] = React.useState([]);
  const [userData, setUserData] = React.useState([]);

  const { currentDate, currentMonth, deliveryDay } = useDateInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const { product, productQuantity } = location?.state || {};
  let platformFee = 0;
  let savePrice = ((product?.price * product?.discountPercentage) / 100).toFixed(2);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStateData((prevState) => ({
        ...prevState,
        timeLeft: prevState?.timeLeft - 1,
      }));
    }, 1000);

    if (stateData?.timeLeft <= 0) {
      clearInterval(interval);
      alert('Time up! Redirecting you to the products page.');
      navigate('/products');
    }

    return () => clearInterval(interval);
  }, [stateData?.timeLeft, navigate]);

  React.useEffect(() => {
    setAddresses(storedAddresses);
  }, []);

  React.useEffect(() => {
    setUserData(storeUserData);
  }, []);

  const updateLocalStorage = (updatedAddresses) => {
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddresses(updatedAddresses)
  }

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
    updateState("chnageLogin", false);
    updateState("selectOrderSummary", false);
    updateState("selectPaymetOption", false);
  }

  const handlePaymentOptionChange = (event) => {
    updateState("selectedOption", event.target.value);
  };

  const handleDeliveryHere = (addr) => {
    updateState("selectedAddressDelivery", addr);
    updateState("selectOrderSummary", true);
    updateState("orderSummary", true);
    updateState("deliveryAdress", false)
  };

  const handleLoginChange = () => {
    updateState("selectedAddressDelivery", false);
    updateState("chnageLogin", true);
    updateState("selectPaymetOption", false);
    updateState("deliveryAdress", false)
  }
  const handleCheckOutContinue = () => {
    updateState("chnageLogin", false);
    updateState("selectOrderSummary", false);
    updateState("deliveryAdress", true)
  }

  const handleDeliveryAddressEdit = () => {
    updateState("editDelivery", true);
    updateState("isEditing", false);
  }

  const handleDeliveryAddressCancel = () => {
    updateState("editDelivery", false)
  }

  const handleOrderContinue = () => {
    updateState("selectOrderSummary", false);
    updateState("selectPaymetOption", true);
  }

  const handleLogout = () => {
    logout(navigate)
  };

  const handleEditSaveChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  

  const handleEditSaveSubmit = (e) => {
    e.preventDefault();
    const updatedAddresses = [...addresses];

    if (stateData.isEditing) {
      updatedAddresses.push(formData);
    } else {
      updatedAddresses[stateData?.selectedAddress] = formData;
    }
    updateLocalStorage(updatedAddresses);
    setAddresses(updatedAddresses);
    updateState("editDelivery", false);
    setFormData(intialEditDeliveryAddressState)
  }

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-8">
          <div className="login-section">
            
            <PaymentLoginAccordian currentUser={currentUser} handleLoginChange={handleLoginChange} />
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
                    onClick={handleCheckOutContinue}
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
                handleDeliveryHere={handleDeliveryHere}
                handleDeliveryAddressEdit={handleDeliveryAddressEdit}
                setFormData={setFormData}
                intialEditState={intialEditDeliveryAddressState}
                >
              </PaymentDefaultAddress>
            }
            {stateData?.orderSummary && !stateData?.deliveryAdress &&
              <>
                <p>
                  {stateData?.selectedAddressDelivery?.username}
                  {stateData?.selectedAddressDelivery?.address}
                  {stateData?.selectedAddressDelivery?.pincode}
                </p>
                <button style={{
                  background: "#fff",
                  padding: "11px 16px",
                  border: "1px solid grey", color: "#000"
                }}
                  onClick={handleOpenDelivaryAddress}
                >
                  Change
                </button>
              </>
            }

            {/* Edit Address Section */}
            {stateData?.editDelivery &&
              <EditDeliveryAdress
                handleDeliveryAddressCancel={handleDeliveryAddressCancel}
                handleEditSaveChange={handleEditSaveChange}
                handleEditSaveSubmit={handleEditSaveSubmit}
                formData={formData}
              ></EditDeliveryAdress>
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
            currentUser={currentUser}
            handleOrderContinue={handleOrderContinue}
          ></PaymentOrderSummary>

          {/* Payment Options Section */}
          <PaymentAdressDetails
            selectPaymetOption={stateData?.selectPaymetOption}
            selectedOption={stateData?.selectedOption}
            timeLeft={stateData?.timeLeft}
            handleOptionChange={handlePaymentOptionChange}
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
