import React from "react";
import "../styles/giftCard.css";
import GiftCardCorporate from "./GiftCardCorporate";
import PersonalGiftCard from "./PersonalGiftCard";

const GiftCard = () => {
  const addgiftCard = {
    cardNumber: "",
    pin: "",
  };
  const [tab, setTab] = React.useState("personal");
  const [giftCard, setGiftCard] = React.useState(false);
  const [giftCardState, setGiftCardState] = React.useState(addgiftCard);

  const handleAddGiftCard = () => {
    setGiftCard((prev) => !prev);
  };

  const handlegiftCardChange = (e) => {
    const { name, value } = e.target;
    setGiftCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleGiftCardAccount = (e) => {
    e.preventDefault();
    console.log("giftCardState", giftCardState);
    setGiftCard((prev) => !prev);
  };

  return (
    <div className="container">
      <h1>Irfah Rovers's Gift Card</h1>
      <button className="add-gift-card" onClick={handleAddGiftCard}>
        + Add a Gift Card
      </button>
      {giftCard && (
        <div className="giftcard-page">
          <h4>Add A Gift Card</h4>
          <p>Gift Card number & PIN are sent to your email inbox</p>
          <div>
            <input
              className="mt-4 giftCard-number"
              type="text"
              name="cardNumber"
              value={giftCardState.cardNumber}
              placeholder="Gift Card Number"
              onChange={handlegiftCardChange}
            />
          </div>
          <div>
            <input
              className="mt-4 giftCard-number"
              type="text"
              name="pin"
              value={giftCardState.pin}
              placeholder="PIN"
              onChange={handlegiftCardChange}
            />
          </div>
          <button
            className="mt-4 giftCard-button"
            onClick={handleGiftCardAccount}
          >
            ADD GIFT CARD TO ACCOUNT
          </button>
        </div>
      )}
      <div className="buy-gift-card">
        <h2>Buy a Flipkart Gift Card</h2>
        <div className="tabs">
          <button
            className={tab === "personal" ? "active" : ""}
            onClick={() => setTab("personal")}
          >
            Personal Gift Cards
          </button>
          <button
            className={tab === "corporate" ? "active" : ""}
            onClick={() => setTab("corporate")}
          >
            Corporate Requirements
          </button>
        </div>

        {tab === "personal" ? <PersonalGiftCard /> : <GiftCardCorporate />}
      </div>
    </div>
  );
};

export default GiftCard;
