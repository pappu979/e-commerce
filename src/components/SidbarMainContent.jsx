import React from "react";
import ProfileInformationContent from "./ProfilrInformationContent";
import ManageAddresses from "./ManageAddresses";
import PanCardInformation from "./PanCardInformation";
import WishListPage from "../pages/WishListPage";

const SidbarMainContent = ({ selectedOption }) => {
  return (
    <div className="container" style={{ background: "#fff" }}>
      {selectedOption === "Profile Information" && (
        <ProfileInformationContent />
      )}
      {selectedOption === "Manage Addresses" && (
        <ManageAddresses selectedOption={selectedOption} />
      )}
      {selectedOption === "PAN Card Information" && (
        <PanCardInformation selectedOption={selectedOption} />
      )}
      {selectedOption === "My Wishlist" && <WishListPage />}
    </div>
  );
};

export default SidbarMainContent;
