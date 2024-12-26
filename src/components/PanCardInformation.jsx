import React from "react";

const PanCardInformation = ({ selectedOption }) => {
  return (
    <div className="container">
      <h3>{selectedOption}</h3>
      <div>
        <input
          type="text"
          placeholder="PAN CARD NUMBER"
          style={{
            border: "1px solid grey",
            padding: "12px",
            width: "300px",
            marginTop: "12px",
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="FULL NAME"
          style={{
            border: "1px solid grey",
            padding: "12px",
            width: "300px",
            marginTop: "12px",
          }}
        />
      </div>
      <div
        style={{
          border: "1px solid grey",
          padding: "12px",
          width: "300px",
          marginTop: "12px",
        }}
      >
        <p style={{ fontSize: "12px" }}>
          Upload PAN Card (Only JPEG file is allowed)
        </p>
        <input type="file" placeholder="No File Chosen" />
      </div>
      <div className="mt-4">
        <input type="checkbox" style={{ marginRight: "12px" }} />
        <span>
          I do hereby declare that PAN furnished/stated above is correct and
          belongs to me, registered as an account holder with www.flipkart.com.
          I further declare that I shall solely be held responsible for the
          consequences, in case of any false PAN declaration.
        </span>
      </div>
      <div className="mt-4">
        <button
          style={{
            padding: "7px 22px",
            background: "#2874f0",
            border: "none",
            borderRadius: "5px",
          }}
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
};

export default PanCardInformation;
