import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function EditDeliveryAdress({
  handleDeliveryAddressCancel,
  formData,
  handleEditSaveChange,
  handleEditSaveSubmit,
}) {
  return (
    <div className="signup-form">
      <Form>
        <Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleEditSaveChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>MobileNumber</Form.Label>
            <Form.Control
              type="number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleEditSaveChange}
            />
          </Form.Group>
        </Row>
        <Row className="my-3">
          <Form.Group as={Col} controlId="formGridPinCode">
            <Form.Label>PinCode</Form.Label>
            <Form.Control
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleEditSaveChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLocality">
            <Form.Label>Locality</Form.Label>
            <Form.Control
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleEditSaveChange}
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridAddress">
          <Form.Label>Address (Area and Street)</Form.Label>
          <Form.Control
            type="text"
            name="address"
            as="textarea"
            rows={3}
            value={formData.address}
            onChange={handleEditSaveChange}
          />
        </Form.Group>
        <Row className="mb-2">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City/District/Town</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleEditSaveChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleEditSaveChange}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formGridLandmark">
            <Form.Label>Landmark(Optinal)</Form.Label>
            <Form.Control
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleEditSaveChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAlternate">
            <Form.Label>Alternate Phone(Optinal)</Form.Label>
            <Form.Control
              type="number"
              name="alternate"
              value={formData.alternate}
              onChange={handleEditSaveChange}
            />
          </Form.Group>
        </Row>

        <div style={{ marginTop: "20px" }} className="row">
          <Form.Group as={Col} controlId="formGridRadio1">
            <Form.Check
              type="radio"
              label="Home (All day delivery)"
              name="deliveryOption"
              value="home"
              onChange={handleEditSaveChange}
              checked={formData.deliveryOption === "home"}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRadio2">
            <Form.Check
              type="radio"
              label="Work (delivery between 10 AM - 5 PM)"
              name="deliveryOption"
              value="work"
              onChange={handleEditSaveChange}
              checked={formData.deliveryOption === "work"}
            />
          </Form.Group>
        </div>

        <div className="row">
          <Button
            as={Col}
            variant="primary"
            onClick={handleEditSaveSubmit}
            className="mx-2"
          >
            SAVE
          </Button>
          <Button
            as={Col}
            variant="primary"
            onClick={handleDeliveryAddressCancel}
          >
            CANCEL
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditDeliveryAdress;
