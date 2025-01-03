import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../reducres/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { checkPlatformFee } from "../utils/cartCalculations";
import {
  addAddress,
  editAddress,
  loadUserAddresses,
} from "../reducres/addressReducer";
import {
  intialEditDeliveryAddressState,
  intialPaymentPageState,
} from "../utils/formData";
import PriceDetails from "../components/PriceDetails";
import EditDeliveryAdress from "../components/EditDeliveryadress";
import PaymentAdressDetails from "../components/PaymentAdressDetails";
import PaymentOrderSummary from "../components/PaymentOrderSummary";
import PaymentDefaultAddress from "../components/PaymentDefaultAddress";
import PaymentLoginAccordian from "../components/PaymentLoginAccordian";
import useDateInfo from "../utils/dateUtilis";
import bank from "../data/indianBanks.json";
import "../styles/payment.css";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const address = useSelector((state) => state.address.addresses);
  const [stateData, setStateData] = React.useState(intialPaymentPageState);
  const [formData, setFormData] = React.useState(
    intialEditDeliveryAddressState
  );
  const { currentDate, currentMonth, deliveryDay } = useDateInfo();
  const { product, productQuantity } = location?.state || {};
  const platformFee = checkPlatformFee(product?.price * productQuantity);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStateData((prevState) => ({
        ...prevState,
        timeLeft: prevState?.timeLeft - 1,
      }));
    }, 1000);

    if (stateData?.timeLeft <= 0) {
      clearInterval(interval);
      alert("Time up! Redirecting you to the products page.");
      navigate("/products");
    }

    return () => clearInterval(interval);
  }, [stateData?.timeLeft, navigate]);

  if (!product || !productQuantity) {
    navigate("/products");
  }

  const updateState = (key, value) => {
    setStateData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  React.useEffect(() => {
    if (currentUser) {
      dispatch(loadUserAddresses({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  const handleOpenDelivaryAddress = () => {
    updateState("deliveryAdress", true);
    updateState("chnageLogin", false);
    updateState("selectOrderSummary", false);
    updateState("selectPaymetOption", false);
  };

  const handlePaymentOptionChange = (event) => {
    updateState("selectedOption", event.target.value);
  };

  const handleDeliveryHere = (addr) => {
    updateState("selectedAddressDelivery", addr);
    updateState("selectOrderSummary", true);
    updateState("orderSummary", true);
    updateState("deliveryAdress", false);
  };

  const handleLoginChange = () => {
    updateState("selectedAddressDelivery", false);
    updateState("chnageLogin", true);
    updateState("selectPaymetOption", false);
    updateState("deliveryAdress", false);
    updateState("selectOrderSummary", false);
  };
  const handleCheckOutContinue = () => {
    updateState("chnageLogin", false);
    updateState("selectOrderSummary", false);
    updateState("deliveryAdress", true);
  };

  const handleDeliveryAddressEdit = () => {
    updateState("editDelivery", true);
    updateState("isEditing", false);
  };

  const handleDeliveryAddressCancel = () => {
    updateState("editDelivery", false);
  };

  const handleOrderContinue = () => {
    updateState("selectOrderSummary", false);
    updateState("selectPaymetOption", true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditSaveChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSaveSubmit = (e) => {
    e.preventDefault();

    if (stateData.isEditing) {
      dispatch(
        addAddress({
          userId: currentUser.id,
          address: formData,
        })
      );
    } else {
      dispatch(
        editAddress({
          userId: currentUser.id,
          id: stateData?.selectedAddress,
          updatedAddress: formData,
        })
      );
    }

    updateState("editDelivery", false);
    setFormData(intialEditDeliveryAddressState);
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-8">
          <div className="login-section">
            <PaymentLoginAccordian
              currentUser={currentUser}
              handleLoginChange={handleLoginChange}
            />
            <div>
              {stateData?.chnageLogin && (
                <div>
                  <button
                    className="mb-2"
                    style={{ color: "blue", border: "none", display: "block" }}
                    onClick={handleLogout}
                  >
                    Logout & sign up to another account
                  </button>
                  <button
                    style={{
                      backgroundColor: "#fb641b",
                      padding: "11px 16px",
                      color: "#fff",
                      fontSize: "17px",
                      fontWeight: "700",
                      border: "none",
                    }}
                    onClick={handleCheckOutContinue}
                  >
                    Checkout continue
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className="address-section">
            <h3 className="section-title">2 DELIVERY ADDRESS</h3>

            {stateData?.deliveryAdress && !stateData?.editDelivery && (
              <PaymentDefaultAddress
                addresses={address}
                selectedAddress={stateData?.selectedAddress}
                updateState={updateState}
                handleDeliveryHere={handleDeliveryHere}
                handleDeliveryAddressEdit={handleDeliveryAddressEdit}
                setFormData={setFormData}
                intialEditState={intialEditDeliveryAddressState}
              ></PaymentDefaultAddress>
            )}
            {stateData?.orderSummary && !stateData?.deliveryAdress && (
              <>
                <p>
                  {stateData?.selectedAddressDelivery?.username}
                  {stateData?.selectedAddressDelivery?.address}
                  {stateData?.selectedAddressDelivery?.pincode}
                </p>
                <button
                  style={{
                    background: "#fff",
                    padding: "11px 16px",
                    border: "1px solid grey",
                    color: "#000",
                  }}
                  onClick={handleOpenDelivaryAddress}
                >
                  Change
                </button>
              </>
            )}

            {/* Edit Address Section */}
            {stateData?.editDelivery && (
              <EditDeliveryAdress
                handleDeliveryAddressCancel={handleDeliveryAddressCancel}
                handleEditSaveChange={handleEditSaveChange}
                handleEditSaveSubmit={handleEditSaveSubmit}
                formData={formData}
              ></EditDeliveryAdress>
            )}
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
          ></PaymentAdressDetails>
        </div>

        {/* Price Details Section */}
        <PriceDetails
          selectedOption={stateData?.selectedOption}
          productQuantity={productQuantity}
          product={product}
          platformFee={platformFee}
        ></PriceDetails>
      </div>
    </div>
  );
}
