import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import CashOnDelivery from "../components/CashOnDelivery";
import { formatTime } from "../utils/cartCalculations";

export default function PaymentAdressDetails({
  selectPaymetOption,
  timeLeft,
  selectedOption,
  handleOptionChange,
  product,
  productQuantity,
  platformFee,
  indianBanks,
}) {
  return (
    <div className="address-section">
      <h3 className="section-title">4 PAYMENT OPTIONS</h3>
      {selectPaymetOption && (
        <>
          <div
            style={{
              padding: "10px 0",
              border: "1px solid grey",
              display: "flex",
            }}
            className="mb-2 text-center"
          >
            <p style={{ paddingLeft: "10px" }}>Complete payment in</p>
            <p style={{ paddingLeft: "10px" }}>
              <FontAwesomeIcon icon={faClock} /> {formatTime(timeLeft)}
            </p>
          </div>
          <div
            style={{ padding: "10px 20px", border: "1px solid grey" }}
            className="mb-2"
          >
            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  value="UPI"
                  checked={selectedOption === "UPI"}
                  onChange={handleOptionChange}
                />
                <strong className="mx-4">UPI</strong>
              </label>
              {selectedOption === "UPI" && (
                <div style={{ paddingLeft: "20px" }}>
                  <p>Choose an option</p>
                  <label>
                    <input type="radio" name="upi-option" value="PhonePe" />
                    <span className="mx-2">PhonePe</span>
                  </label>
                  <br />
                  <label className="mt-2">
                    <input type="radio" name="upi-option" value="UPI ID" />
                    <span className="mx-2">Your UPI ID</span>
                  </label>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  value="Wallets"
                  checked={selectedOption === "Wallets"}
                  onChange={handleOptionChange}
                />
                <strong className="mx-4">Wallets</strong>
              </label>
              {selectedOption === "Wallets" && (
                <div style={{ paddingLeft: "20px" }}>
                  <label>
                    <input type="radio" name="upi-option" value="PhonePe" />
                    <span className="mx-2">PhonePe Wallets</span>
                  </label>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  value="Credit/Debit"
                  checked={selectedOption === "Credit/Debit"}
                  onChange={handleOptionChange}
                />
                <strong className="mx-4">Credit / Debit / ATM Card</strong>
              </label>
              <p style={{ paddingLeft: "20px" }}>
                Add and secure cards as per RBI guidelines
              </p>
              {selectedOption === "Credit/Debit" && (
                <>
                  <div className="row d-flex align-items-center debit-card">
                    <div className="col-md-4">
                      <input
                        type="number"
                        placeholder="Enter Card Number"
                        style={{ padding: "8px 15px", width: "100%" }}
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="date"
                        placeholder="Valid Thru"
                        style={{ padding: "8px 15px" }}
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        placeholder="CVV"
                        className="payment-credit-cvv"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      style={{
                        padding: "11px 22px",
                        border: "none",
                        background: "#fb641b",
                      }}
                    >
                      PAY ₹
                      {Math.ceil(product.price * productQuantity + platformFee)}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  value="NetBanking"
                  checked={selectedOption === "NetBanking"}
                  onChange={handleOptionChange}
                />
                <strong className="mx-4">Net Banking</strong>
              </label>
              <p style={{ paddingLeft: "20px" }}>
                This instrument has low success; use UPI or cards for better
                experience.
              </p>
              {selectedOption === "NetBanking" && (
                <div style={{ paddingLeft: "20px" }}>
                  <p className="my-2">
                    <strong>Popular Banks</strong>
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div>
                      <input
                        type="radio"
                        name="upi-option"
                        value="HDFC"
                        checked={selectedOption === "HDFC"}
                        onChange={handleOptionChange}
                      />
                      <span className="mx-2">HDFC Bank</span>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="upi-option"
                        value="ICICI"
                        checked={selectedOption === "ICICI"}
                        onChange={handleOptionChange}
                      />
                      <span className="mx-2">ICICI Bank</span>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="upi-option"
                        value="SBI"
                        checked={selectedOption === "SBI"}
                        onChange={handleOptionChange}
                      />
                      <span className="mx-2">SBI Bank</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div>
                      <input
                        type="radio"
                        name="upi-option"
                        value="Axis"
                        checked={selectedOption === "Axis"}
                        onChange={handleOptionChange}
                      />
                      <span className="mx-2">Axis Bank</span>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="upi-option"
                        value="Kotak Mahindra"
                        checked={selectedOption === "Kotak Mahindra"}
                        onChange={handleOptionChange}
                      />
                      <span className="mx-2">Kotak Mahindra Bank</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="mb-2">
                      <strong>Other Banks</strong>
                    </p>
                    <select
                      name=""
                      id="bankSelect"
                      value={selectedOption === "selectBank"}
                      onChange={handleOptionChange}
                      className="bankSelect"
                    >
                      <option value="">---Select Bank---</option>
                      {indianBanks.map((bank, index) => (
                        <option value={bank} key={index}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <button
                      style={{
                        padding: "11px 22px",
                        border: "none",
                        background: "#fb641b",
                      }}
                    >
                      PAY ₹
                      {Math.ceil(product.price * productQuantity + platformFee)}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  value="CashOnDelivery"
                  checked={selectedOption === "CashOnDelivery"}
                  onChange={handleOptionChange}
                />
                <strong className="mx-4">Cash on Delivery</strong>
              </label>
              {selectedOption === "CashOnDelivery" && (
                <CashOnDelivery
                  selectedOption={selectedOption}
                ></CashOnDelivery>
              )}
            </div>

            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  value="EMI"
                  checked={selectedOption === "EMI"}
                  onChange={handleOptionChange}
                  disabled
                />
                <strong className="mx-4">EMI (Easy Installments)</strong>
                <span> Not applicable ?</span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
