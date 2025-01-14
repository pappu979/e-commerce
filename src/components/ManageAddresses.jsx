import React from "react";
import EditDeliveryAdress from "./EditDeliveryadress";
import { intialEditDeliveryAddressState } from "../constants/formdata";
import ShowManageAddress from "./ShowManageAddress";
import { CONSTANTS } from "../constants";
import "../assets/styles/manageAddress.css";

const ManageAddresses = ({ selectedOption }) => {
  const [addAddress, setAddaddress] = React.useState(false);
  const [addAddressData, setAddAddressData] = React.useState(
    intialEditDeliveryAddressState
  );
  const [allAddAddress, setAllAddAddress] = React.useState([]);

  React.useEffect(() => {
    const storedAddresses =
      JSON.parse(localStorage.getItem("manageAddresses")) || [];
    setAllAddAddress(storedAddresses);
  }, []);

  const handleAddaddress = () => {
    setAddaddress((prev) => !prev);
  };

  const handleEditSaveChange = (e) => {
    const { name, value } = e.target;
    setAddAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressCancel = () => {
    setAddaddress(false);
  };

  const handleAddAddressSaveSubmit = (e) => {
    e.preventDefault();
    const updatedAddresses = [...allAddAddress, addAddressData];
    setAllAddAddress(updatedAddresses);
    localStorage.setItem("manageAddresses", JSON.stringify(updatedAddresses));
    setAddAddressData(intialEditDeliveryAddressState);
    setAddaddress(false);
  };

  return (
    <div className="container">
      <h3>{selectedOption}</h3>
      <div className="manageadd-address mt-4" onClick={handleAddaddress}>
        {CONSTANTS.ADD_NEW_ADDRESS}
      </div>
      {addAddress && (
        <EditDeliveryAdress
          formData={addAddressData}
          handleEditSaveChange={handleEditSaveChange}
          handleDeliveryAddressCancel={handleAddressCancel}
          handleEditSaveSubmit={handleAddAddressSaveSubmit}
        />
      )}
      <div>
        <ShowManageAddress allAddAddress={allAddAddress} />
      </div>
    </div>
  );
};

export default ManageAddresses;
