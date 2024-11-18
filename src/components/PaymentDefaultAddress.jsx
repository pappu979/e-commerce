import React from "react";

export default function PaymentDefaultAddress({addresses, selectedAddress, updateState, handleDelivery, handleEdit}) {
    return (
        <>
                {addresses.map((addr, index) => (
                  <div key={index} className={`address-box ${selectedAddress === index ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === index}
                      onChange={() => updateState("selectedAddress",index)}
                    />
                    <div className="address-content">
                      <span>{addr.name}</span> <span>{addr.phone}</span>
                      <p>{addr.address}</p>
                      {selectedAddress === index && <button style={{
                        background: "#fb641b",
                        padding: "11px 16px",
                        border: "none", color: "#fff"
                      }}
                        onClick={() => handleDelivery(addr)}
                      >
                        DELIVERY HERE
                      </button>}
                    </div>
                    {selectedAddress === index &&
                      <button className="edit-btn" onClick={handleEdit}>EDIT</button>}
                  </div>
                ))}
                <button className="add-new-btn" onClick={() => updateState("editDelivery", true)}>+ Add a new address</button>
              </>
    )
}