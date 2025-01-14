export const intialCheckoutFormData = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

export const intialPaymentPageState = {
  selectedAddress: 0,
  chnageLogin: false,
  deliveryAdress: true,
  editDelivery: false,
  orderSummary: false,
  selectOrderSummary: false,
  selectPaymetOption: false,
  selectedAddressDelivery: null,
  selectedOption: "UPI",
  timeLeft: 14 * 60,
  isEditing: true,
};

export const intialEditDeliveryAddressState = {
  username: "",
  mobileNumber: "",
  pincode: "",
  locality: "",
  city: "",
  state: "",
  landmark: "",
  alternate: "",
  address: "",
  deliveryOption: "",
};

export const intialProfileInformation = {
  firstname: "",
  lastname: "",
  gender: "",
  email: "pappoosinghshekhawat@gmail.com",
  mobileNumber: "+916352075082",
};

export const intialPanCardData = {
  pancardNumber: "",
  fullName: "",
  isChecked: false,
};

export const initialBuygiftCardData = {
  email: "",
  receiverName: "",
  cardValue: 0,
  quantity: 1,
  gifterName: "",
  message: "",
};

export const initialgiftCardCorporateData = {
  email: "",
  firstname: "",
  lastname: "",
  mobileNumber: "",
  location: "",
  companyName: "",
};
