import React from "react";

const Faqs = () => {
  return (
    <div>
      <h3>FAQS</h3>
      <div className="mt-4">
        <p style={{ fontWeight: "700" }}>
          What happens when I update my email address (or mobile number)?
        </p>
        <p>
          Your login email id (or mobile number) changes, likewise. You'll
          receive all your account related communication on your updated email
          address (or mobile number).
        </p>

        <p style={{ fontWeight: "700" }}>
          When will my Irfah's account be updated with the new email address (or
          mobile number)?
        </p>
        <p>
          It happens as soon as you confirm the verification code sent to your
          email (or mobile) and save the changes.
        </p>

        <p style={{ fontWeight: "700" }}>
          What happens to my existing Flipkart account when I update my email
          address (or mobile number)?
        </p>
        <p>
          Updating your email address (or mobile number) doesn't invalidate your
          account. Your account remains fully functional. You'll continue seeing
          your Order history, saved information and personal details.
        </p>

        <p style={{ fontWeight: "700" }}>
          Does my Seller account get affected when I update my email address?
        </p>
        <p>
          Irfah has a 'single sign-on' policy. Any changes will reflect in your
          Seller account also.
        </p>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary">Deactivate Account</button>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary">Delete Account</button>
      </div>
    </div>
  );
};

export default Faqs;
