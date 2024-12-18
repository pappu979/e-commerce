export const validateForm = (state) => {
  const errors = {};

  if (!state.username.trim()) {
    errors.username = "Username is required";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(state.email)) {
    errors.email = "Email is invalid";
  }

  if (!state.password || state.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!/^\d{10,}$/.test(state.mobileNumber)) {
    errors.mobileNumber = "Mobile number must be at least 10 digits";
  }

  return errors;
};

export const validateLoginForm = (state) => {
  const errors = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(state.email)) {
    errors.email = "Email is invalid";
  }

  if (state.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

export const checkOutValidate = (formData) => {
  const newErrors = {};
  if (!formData.name.trim()) newErrors.name = "Name is required.";
  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email format.";
  }
  if (!formData.address.trim()) newErrors.address = "Address is required.";
  if (!formData.city.trim()) newErrors.city = "City is required.";
  if (!formData.state.trim()) newErrors.state = "State is required.";
  if (!formData.zip.trim()) {
    newErrors.zip = "Zip code is required.";
  } else if (!/^\d{6}$/.test(formData.zip)) {
    newErrors.zip = "Invalid zip code.";
  }
  if (!formData.cardNumber.trim()) {
    newErrors.cardNumber = "Card number is required.";
  } else if (!/^\d{16}$/.test(formData.cardNumber)) {
    newErrors.cardNumber = "Card number must be 16 digits.";
  }
  if (!formData.cardExpiry.trim()) {
    newErrors.cardExpiry = "Expiry date is required.";
  } else {
    const expiryDate = new Date(formData.cardExpiry);
    const today = new Date();
    if (expiryDate < today) {
      newErrors.cardExpiry = "Expiry date must be in the future.";
    }
  }
  if (!formData.cardCvc.trim()) {
    newErrors.cardCvc = "CVC is required.";
  } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
    newErrors.cardCvc = "CVC must be 3 or 4 digits.";
  }
  return newErrors;
};
