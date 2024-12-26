import React from "react";
import "../styles/manageAddress.css";
import EditDeliveryAdress from "./EditDeliveryadress";
import { intialEditDeliveryAddressState } from "../utils/formData";
import ShowManageAddress from "./ShowManageAddress";

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
    setAddaddress(true);
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
    console.log(allAddAddress);
    setAddAddressData(intialEditDeliveryAddressState);
    setAddaddress(false);
  };

  return (
    <div className="container">
      <h3>{selectedOption}</h3>
      <div className="manageadd-address mt-4" onClick={handleAddaddress}>
        + ADD A NEW ADDRESS
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
