import React from "react";
import { initialgiftCardCorporateData } from "../constants/formdata";

const GiftCardCorporate = () => {
  const [giftCardCorporateState, setGiftCardCorporateState] = React.useState(
    initialgiftCardCorporateData
  );

  const handleGiftCardCorporateChange = (e) => {
    const { name, value } = e.target;
    setGiftCardCorporateState((prev) => ({ ...prev, [name]: value }));
  };

  const handleGiftCardCorporatesubmit = (e) => {
    e.preventDefault();
    setGiftCardCorporateState(initialgiftCardCorporateData);
  };

  return (
    <div className="mt-4 giftcard-corporate">
      <p style={{ fontWeight: "700" }}>
        Buy Flipkart Gift Cards for Businesses
      </p>
      <div className="mt-4">
        <input
          type="text"
          placeholder="FIRST NAME"
          name="firstname"
          value={giftCardCorporateState.firstname}
          onChange={handleGiftCardCorporateChange}
          className="giftcard-businessInput"
        />
        <input
          type="text"
          placeholder="LAST NAME(OPTIONAL)"
          name="lastname"
          value={giftCardCorporateState.lastname}
          onChange={handleGiftCardCorporateChange}
          className="giftcard-businessInput"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="MOBILE NUMBER"
          name="mobileNumber"
          value={giftCardCorporateState.mobileNumber}
          onChange={handleGiftCardCorporateChange}
          className="giftcard-businessInput"
        />
        <input
          type="text"
          placeholder="EMAIL ID"
          name="email"
          value={giftCardCorporateState.email}
          onChange={handleGiftCardCorporateChange}
          className="giftcard-businessInput"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="LOCATION"
          name="location"
          value={giftCardCorporateState.location}
          onChange={handleGiftCardCorporateChange}
          className="giftcard-businessInput"
        />
        <input
          type="text"
          placeholder="COMPANY NAME"
          name="companyName"
          value={giftCardCorporateState.companyName}
          onChange={handleGiftCardCorporateChange}
          className="giftcard-businessInput"
        />
      </div>

      <p style={{ fontWeight: "700" }} className="mt-4">
        Need Help?
      </p>
      <p>
        Have Flipkart Gift Card related queries ?{" "}
        <span style={{ color: "#007bff" }}>Contact Us</span>
      </p>
      <p>
        Bulk sale enquiries can be send to{" "}
        <span style={{ color: "#007bff" }}>pappoosinghshekhawat@gmail.com</span>
      </p>
      <div>
        <button
          className="add-gift-card"
          onClick={handleGiftCardCorporatesubmit}
        >
          SUBMIT DETAILS
        </button>
      </div>
    </div>
  );
};

export default GiftCardCorporate;
