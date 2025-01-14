import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { CONSTANTS } from "../constants";

const CashOnDelivery = ({ selectedOption }) => {
  const [randomCode, setRandomCode] = React.useState("");
  const [inputCode, setInputCode] = React.useState("");
  const [orderConfirmed, setOrderConfirmed] = React.useState(false);

  const generateRandomCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setRandomCode(code.toString());
    setOrderConfirmed(false);
    setInputCode("");
  };

  React.useEffect(() => {
    if (selectedOption === "CashOnDelivery") {
      generateRandomCode();
    }
  }, [selectedOption]);

  const confirmOrder = () => {
    if (inputCode === randomCode) {
      setOrderConfirmed(true);
      setInputCode("");
    } else {
      alert("Incorrect code, please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <p
            className="mt-2"
            style={{ padding: "4px", border: "1px solid grey" }}
          >
            {CONSTANTS.EXTRA_CASHON_DELIVERY_CHARGE}
          </p>
        </div>

        <div className="row my-2 d-flex align-items-center justify-content-center cod">
          <div className="col-md-4">
            <div className="generate-number">
              <strong>{randomCode}</strong>
              <button
                onClick={generateRandomCode}
                style={{
                  border: "none",
                  marginLeft: "4px",
                  backgroundColor: "#fff",
                  color: "#2370f4",
                }}
              >
                <FontAwesomeIcon icon={faSyncAlt}></FontAwesomeIcon>
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <input
              type="number"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter confirmation code"
              style={{ padding: "8px 20px", width: "100%" }}
            />
          </div>

          <div className="col-md-4">
            <button
              onClick={confirmOrder}
              style={{
                padding: "11px 16px",
                marginLeft: "16px",
                background: "#fb641b",
                border: "none",
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>

      {orderConfirmed && (
        <p style={{ color: "green", marginLeft: "20px" }} className="mt-3">
          Order confirmed successfully!
        </p>
      )}
    </div>
  );
};

export default CashOnDelivery;
