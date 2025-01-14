import React from "react";
import { CONSTANTS } from "../constants";

export default function ({ currentUser, handleLoginChange }) {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap">
      <div className="login-title">
        1 {CONSTANTS.LOGIN} ✔️
        {currentUser ? (
          <p style={{ fontSize: "14px" }}>
            +91{currentUser?.mobileNumber || 6352075082}
          </p>
        ) : (
          <p style={{ fontSize: "14px" }}>{CONSTANTS.CURRENT_USER_NOT_FOUND}</p>
        )}
      </div>
      <div className="login-details">
        <button
          style={{
            background: "#fff",
            padding: "11px 16px",
            border: "1px solid grey",
            color: "#000",
          }}
          onClick={handleLoginChange}
        >
          Change
        </button>
      </div>
    </div>
  );
}
