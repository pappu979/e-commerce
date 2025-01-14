import React from "react";
import { initialBuygiftCardData } from "../constants/formdata";
import { giftCardcalculateTotal } from "../utils/helperFunction/cartCalculations";

const PersonalGiftCard = () => {
  const [buygiftCard, setBuygiftCard] = React.useState([
    initialBuygiftCardData,
  ]);
  const totalBuygiftCardValue = giftCardcalculateTotal(buygiftCard);

  const addgiftCard = () => {
    setBuygiftCard([...buygiftCard, initialBuygiftCardData]);
  };

  const handleGiftCardChange = (index, field, value) => {
    const updateData = [...buygiftCard];
    updateData[index][field] = value;
    setBuygiftCard(updateData);
  };

  const handleGiftCardsubmit = (e) => {
    e.preventDefault();
    const isValid = buygiftCard.every(
      (card) => card.email && card.receiverName && card.cardValue > 0
    );

    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Gift Card Data:", buygiftCard);
    alert("Gift card(s) purchased successfully!");
    setBuygiftCard(initialBuygiftCardData);
  };

  return (
    <form className="gift-card-form mt-4" onSubmit={handleGiftCardsubmit}>
      {buygiftCard.map((card, index) => (
        <div key={index} className="gift-card-section">
          <input
            type="email"
            name="email"
            placeholder="Receiver's Email ID *"
            value={card.email}
            onChange={(e) =>
              handleGiftCardChange(index, "email", e.target.value)
            }
            required
          />
          <input
            type="text"
            placeholder="Receiver's Name *"
            required
            value={card.receiverName}
            onChange={(e) =>
              handleGiftCardChange(index, "receiverName", e.target.value)
            }
            className="mx-2"
          />
          <select
            value={card.cardValue}
            onChange={(e) =>
              handleGiftCardChange(index, "cardValue", e.target.value)
            }
          >
            <option>Card Value in ₹</option>
            <option>500</option>
            <option>1000</option>
            <option>2000</option>
          </select>
          <input
            type="number"
            min="1"
            value={card.quantity}
            onChange={(e) =>
              handleGiftCardChange(index, "quantity", parseInt(e.target.value))
            }
            className="mt-2"
          />
          <input
            type="text"
            placeholder="Gifter's Name (Optional)"
            value={card.gifterName}
            onChange={(e) =>
              handleGiftCardChange(index, "gifterName", e.target.value)
            }
            className="mt-2 mx-2"
          />
          <textarea
            rows="4"
            cols="50"
            value={card.message}
            onChange={(e) =>
              handleGiftCardChange(index, "message", e.target.value)
            }
            placeholder="Type your message here(Optional)"
            className="mt-4"
          ></textarea>
        </div>
      ))}

      <p style={{ color: "#007bff", cursor: "pointer" }} onClick={addgiftCard}>
        + Buy Another Gift Card
      </p>
      <button
        type="submit"
        style={{
          width: "250px",
          background: "#007bff",
          color: "#fff",
          padding: "11px 14px",
          border: "none",
        }}
      >
        BUY GIFT CARD FOR ₹{totalBuygiftCardValue}
      </button>
    </form>
  );
};

export default PersonalGiftCard;
