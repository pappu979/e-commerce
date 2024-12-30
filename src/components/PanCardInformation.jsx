import React from "react";
import { intialPanCardData } from "../utils/formData";

const PanCardInformation = ({ selectedOption }) => {
  const [panCardState, setPanCardState] = React.useState(intialPanCardData);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState("");
  const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const handlePanCardChange = (e) => {
    const { name, value } = e.target;
    setPanCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "image/jpeg") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Only JPEG files are allowed.");
    }
  };

  const isFormValid =
    panCardRegex.test(panCardState.pancardNumber) &&
    panCardState.fullName.trim() !== "" &&
    file &&
    panCardState.isChecked;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("PAN Card details submitted successfully!");
      console.log(intialPanCardData, file);
    } else {
      alert("Please complete the form correctly.");
    }
  };

  return (
    <div className="container">
      <h3>{selectedOption}</h3>
      <div>
        <input
          type="text"
          name="pancardNumber"
          value={panCardState.pancardNumber}
          placeholder="PAN CARD NUMBER"
          style={{
            border: "1px solid grey",
            padding: "12px",
            width: "300px",
            marginTop: "12px",
          }}
          onChange={handlePanCardChange}
        />
        {!panCardRegex.test(panCardState.pancardNumber) &&
          panCardState.pancardNumber && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Invalid PAN Card Number.
            </p>
          )}
      </div>
      <div>
        <input
          type="text"
          placeholder="FULL NAME"
          name="fullName"
          value={panCardState.fullName}
          style={{
            border: "1px solid grey",
            padding: "12px",
            width: "300px",
            marginTop: "12px",
          }}
          onChange={handlePanCardChange}
        />
        {panCardState.fullName.trim() === "" && panCardState.fullName && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Full Name is required.
          </p>
        )}
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
        <input
          type="file"
          placeholder="No File Chosen"
          onChange={handleFileChange}
        />
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
      </div>
      <div className="mt-4">
        <input
          type="checkbox"
          name="isChecked"
          value={panCardState.isChecked}
          style={{ marginRight: "12px" }}
          onChange={handlePanCardChange}
        />
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
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
};

export default PanCardInformation;
