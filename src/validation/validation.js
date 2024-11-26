export const validateForm = (state) => {
    const errors = {};
  
    if (!state.username.trim()) {
      errors.username = "Username is required";
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(state.email)) {
      errors.email = "Email is invalid";
    }
  
    if (state.password.length < 8) {
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