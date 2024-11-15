import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function EditDeliveryAdress({ handleCancel }) {
    const [formData, setFormData] = React.useState({
        name: "",
        password: "",
        pincode: "",
        locality: "",
        city: "",
        state: "",
        landmark: "",
        alternate: "",
        address: "",
        deliveryOption: ""
    });

    const { name, password, pincode, locality, city, state, landmark, alternate, address, deliveryOption } = formData;

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log("formData", formData);
        setFormData({
            name: "",
            password: "",
            pincode: "",
            locality: "",
            city: "",
            state: "",
            landmark: "",
            alternate: "",
            address: "",
            deliveryOption: ""
        })
    }

    return (
        <div className="signup-form">
            <Form>
                <Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"

                            value={password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                    </Form.Group>
                </Row>
                <Row className="my-3">
                    <Form.Group as={Col} controlId="formGridPinCode">
                        <Form.Label>PinCode</Form.Label>
                        <Form.Control
                            type="number"
                            value={pincode}
                            onChange={(e) =>
                                setFormData({ ...formData, pincode: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLocality">
                        <Form.Label>Locality</Form.Label>
                        <Form.Control
                            type="text"
                            value={locality}
                            onChange={(e) =>
                                setFormData({ ...formData, locality: e.target.value })
                            }
                        />
                    </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>Address (Area and Street)</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows={3}
                        value={address}
                        onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                        }
                    />
                </Form.Group>
                <Row className="mb-2">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City/District/Town</Form.Label>
                        <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            value={state}
                            onChange={(e) =>
                                setFormData({ ...formData, state: e.target.value })
                            }
                        >
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="formGridLandmark">
                        <Form.Label>Landmark(Optinal)</Form.Label>
                        <Form.Control
                            type="text"
                            value={landmark}
                            onChange={(e) =>
                                setFormData({ ...formData, landmark: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAlternate">
                        <Form.Label>Alternate Phone(Optinal)</Form.Label>
                        <Form.Control
                            type="number"
                            value={alternate}
                            onChange={(e) =>
                                setFormData({ ...formData, alternate: e.target.value })
                            }
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
                            onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
                            checked={deliveryOption === "home"}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridRadio2">
                        <Form.Check
                            type="radio"
                            label="Work (delivery between 10 AM - 5 PM)"
                            name="deliveryOption"
                            value="work"
                            onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
                            checked={deliveryOption === "work"}
                        />
                    </Form.Group>
                </div>

                <div className="row">
                    <Button as={Col} variant="primary" onClick={handleEditSubmit} className="mx-2" >
                        SAVE AND DELIVERY HERE
                    </Button>
                    <Button as={Col} variant="primary" onClick={handleCancel} >
                        CANCEL
                    </Button>
                </div>
            </Form>
        </div>
    )
}