import React from "react";

export default function PaymentDefaultAddress({ addresses, selectedAddress, updateState, handleDeliveryHere, handleDeliveryAddressEdit, setFormData, intialEditState }) {
  return (
    <>
      {addresses.map((addr, index) => (
        <div key={index} className={`address-box ${selectedAddress === index ? "selected" : ""}`}>

          
          <input
            type="radio"
            name="address"
            checked={selectedAddress === index}
            onChange={() => updateState("selectedAddress", index)}
          />
          <div className="address-content">
          <p style={{background: "#717478", display: "inline-block", padding: "0px 5px", marginRight: "8px"}}>{addr.deliveryOption}</p>
            <span>{addr.username}</span> <span style={{ marginLeft: "6px" }}>+91{addr.mobileNumber}</span>
            <p>{addr.address} {addr.pincode}</p>
            {selectedAddress === index &&
              <button style={{
                background: "#fb641b",
                padding: "11px 16px",
                border: "none", color: "#fff"
              }}
                onClick={() => handleDeliveryHere(addr)}
              >
                DELIVERY HERE
              </button>}
          </div>
          {selectedAddress === index &&
            <button className="edit-btn" onClick={handleDeliveryAddressEdit}>EDIT</button>}
        </div>
      ))}
      <button className="add-new-btn" onClick={() => {
        updateState("editDelivery", true); 
        setFormData(intialEditState);
      }}
      >
        + Add a new address
      </button>
    </>
  )
}