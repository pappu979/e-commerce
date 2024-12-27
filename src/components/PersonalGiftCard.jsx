import React from "react";

const PersonalGiftCard = () => {
  return (
    <form className="gift-card-form mt-4">
      <input type="email" placeholder="Receiver's Email ID *" required />
      <input type="text" placeholder="Receiver's Name *" required />
      <select>
        <option>Card Value in ₹</option>
        <option>500</option>
        <option>1000</option>
        <option>2000</option>
      </select>
      <input type="number" min="1" defaultValue="1" />
      <input type="text" placeholder="Gifter's Name (Optional)" />
      <textarea
        rows="4"
        cols="50"
        placeholder="Type your message here(Optional)"
      ></textarea>
      <p style={{ color: "#007bff", cursor: "pointer" }}>
        + Buy Another Gift Card
      </p>
      <button
        style={{
          width: "250px",
          background: "#007bff",
          color: "#fff",
          padding: "11px 14px",
          border: "none",
        }}
      >
        BUY GIFT CARD FOR ₹0
      </button>
    </form>
  );
};

export default PersonalGiftCard;
