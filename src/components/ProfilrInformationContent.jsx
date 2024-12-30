import React from "react";
import { intialProfileInformation } from "../utils/formData";
import Faqs from "./Faqs";

const ProfileInformationContent = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [personlInformation, setPersonlInformation] = React.useState(
    intialProfileInformation
  );

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInformation = (e) => {
    const { name, value } = e.target;
    setPersonlInformation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log(personlInformation);
    setIsEditing((prev) => !prev);
    setPersonlInformation(intialProfileInformation);
  };

  return (
    <div className="container">
      <h1>Personal Information</h1>
      <input
        type="text"
        name="firstname"
        placeholder="FIRST NAME"
        value={personlInformation.firstname}
        disabled={!isEditing}
        onChange={handleInformation}
        className="personal-input"
      />
      <input
        className="personal-input"
        type="text"
        name="lastname"
        placeholder="LAST NAME"
        value={personlInformation.lastname}
        disabled={!isEditing}
        onChange={handleInformation}
      />
      <div className="section mt-4">
        <h3>Your Gender</h3>

        <input
          style={{ marginLeft: "30px" }}
          type="radio"
          name="gender"
          value="male"
          disabled={!isEditing}
          checked={personlInformation.gender === "male"}
          onChange={handleInformation}
        />
        <label style={{ marginLeft: "15px" }}>Male</label>

        <input
          style={{ marginLeft: "40px" }}
          type="radio"
          name="gender"
          value="female"
          disabled={!isEditing}
          checked={personlInformation.gender === "female"}
          onChange={handleInformation}
        />
        <label>Female</label>
      </div>
      <div className="section mt-4">
        <h3>Email Address</h3>

        <input
          style={{ padding: "9px" }}
          type="email"
          name="email"
          value={personlInformation.email}
          disabled={!isEditing}
          onChange={handleInformation}
        />
      </div>
      <div className="section mt-4">
        <h3>Mobile Number</h3>

        <input
          style={{ padding: "9px" }}
          type="text"
          name="mobileNumber"
          value={personlInformation.mobileNumber}
          disabled={!isEditing}
          onChange={handleInformation}
        />
      </div>
      <button onClick={handleEditClick} className="edit-button">
        {isEditing ? "CANCEL" : "EDIT"}
      </button>
      {isEditing && (
        <button
          style={{ marginLeft: "30px" }}
          className="edit-button"
          onClick={handleSaveClick}
        >
          SAVE
        </button>
      )}

      <div className="mt-5">
        <Faqs></Faqs>
      </div>
    </div>
  );
};

export default ProfileInformationContent;
