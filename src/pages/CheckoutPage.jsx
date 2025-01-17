import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearCart } from "../reducres/cartReducer";
import { intialCheckoutFormData } from "../constants/formdata";
import { checkOutValidate } from "../utils/validationUtilis";
import { ROUTES } from "../constants/routes";
import { CONSTANTS } from "../constants";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [formData, setFormData] = React.useState(intialCheckoutFormData);
  const [errors, setErrors] = React.useState("");
  const { platformFee } = location?.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = checkOutValidate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      toast.success("Payment successful! Redirecting to confirmation page...", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate(ROUTES.DEFAULT_PATH);
      }, 3000);
      dispatch(clearCart());

      setFormData(intialCheckoutFormData);
      setErrors({});
    }
  };

  const checkoutTotalAmount =
    totalAmount > 0
      ? Number(totalAmount.toFixed(2)) + platformFee
      : Number(totalAmount.toFixed(2));

  return (
    <div className="container">
      <h2 className="text-center">Checkout</h2>
      <div className="row mb-5">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <h3>Billing Information</h3>
            <div className="form-group">
              <label
                htmlFor="name"
                style={{ fontSize: "17px", marginTop: "15px" }}
              >
                {CONSTANTS.NAME}
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                style={{ fontSize: "17px", marginTop: "15px" }}
              >
                {CONSTANTS.EMAIL}
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className="form-group">
              <label
                htmlFor="address"
                style={{ fontSize: "17px", marginTop: "15px" }}
              >
                {CONSTANTS.ADDRESS}
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address}</p>
              )}
            </div>
            <div className="row mb-3">
              <div className="form-group col-md-6">
                <label
                  htmlFor="city"
                  style={{ fontSize: "17px", marginTop: "15px" }}
                >
                  {CONSTANTS.CITY}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="state"
                  style={{ fontSize: "17px", marginTop: "15px" }}
                >
                  {CONSTANTS.STATE}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
              </div>
              <div className="form-group col-md-2">
                <label
                  htmlFor="zip"
                  style={{ fontSize: "17px", marginTop: "15px" }}
                >
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
                {errors.zip && <p style={{ color: "red" }}>{errors.zip}</p>}
              </div>
            </div>

            <h3>Payment Information</h3>
            <div className="form-group">
              <label
                htmlFor="cardNumber"
                style={{ fontSize: "17px", marginTop: "15px" }}
              >
                Card Number
              </label>
              <input
                type="number"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              {errors.cardNumber && (
                <p style={{ color: "red" }}>{errors.cardNumber}</p>
              )}
            </div>
            <div className="row mb-2">
              <div className="form-group col-md-6">
                <label
                  htmlFor="cardExpiry"
                  style={{ fontSize: "17px", marginTop: "15px" }}
                >
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  required
                />
                {errors.cardExpiry && (
                  <p style={{ color: "red" }}>{errors.cardExpiry}</p>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="cardCvc"
                  style={{ fontSize: "17px", marginTop: "15px" }}
                >
                  CVC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardCvc"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  required
                />
                {errors.cardCvc && (
                  <p style={{ color: "red" }}>{errors.cardCvc}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mt-4 mb-4"
            >
              Complete Order
            </button>
          </form>
        </div>

        <div className="col-md-4 ">
          <h3>Order Summary</h3>
          <div className="card p-3">
            {cartItems.map((item) => (
              <div key={item.id} className="d-flex justify-content-between">
                <span>{item.title}</span>
                <span>₹{(item.price * item.productQuantity).toFixed(2)}</span>
              </div>
            ))}
            {platformFee > 0 ? (
              <p className="w-100 d-flex justify-content-between">
                Platform Fee:
                <span className="text-end">{platformFee}</span>
              </p>
            ) : null}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>₹{checkoutTotalAmount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
