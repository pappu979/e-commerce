import React from "react";

const ShowManageAddress = ({ allAddAddress }) => {
  return (
    <div className="container">
      <div
        className="mb-4"
        style={{
          background: "#fff",
          border: "1px solid grey",
          padding: "10px",
        }}
      >
        {allAddAddress.map((address, index) => (
          <div style={{ borderBottom: "1px solid grey" }} className="mt-4">
            <span
              style={{
                marginLeft: "25px",
                background: "#878787",
                padding: "5px",
              }}
            >
              {address.deliveryOption}
            </span>
            <p></p>
            <div className="d-flex">
              <p style={{ fontWeight: "700" }}>{address.username}</p>{" "}
              <p style={{ marginLeft: "10px", fontWeight: "700" }}>
                {address.mobileNumber}
              </p>
            </div>
            <div className="d-flex">
              <p>{address.address}</p>{" "}
              <p style={{ marginLeft: "8px" }}>{address.city}</p>{" "}
              <p style={{ marginLeft: "8px" }}>{address.state}</p>
              <p style={{ marginLeft: "8px" }}>-</p>
              <p style={{ marginLeft: "8px", fontWeight: "700" }}>
                {address.pincode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowManageAddress;
