import React from "react";

const GiftCardCorporate = () => {
  return (
    <div className="mt-4 giftcard-corporate">
      <p style={{ fontWeight: "700" }}>
        Buy Flipkart Gift Cards for Businesses
      </p>
      <div className="mt-4">
        <input
          type="text"
          placeholder="FIRST NAME"
          className="giftcard-businessInput"
        />
        <input
          type="text"
          placeholder="LAST NAME(OPTIONAL)"
          className="giftcard-businessInput"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="MOBILE NUMBER"
          className="giftcard-businessInput"
        />
        <input
          type="text"
          placeholder="EMAIL ID"
          className="giftcard-businessInput"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="LOCATION"
          className="giftcard-businessInput"
        />
        <input
          type="text"
          placeholder="COMPANY NAME"
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
        <button className="add-gift-card">SUBMIT DETAILS</button>
      </div>
    </div>
  );
};

export default GiftCardCorporate;
