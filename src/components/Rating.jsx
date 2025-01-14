import React from "react";
import ReactStars from "react-stars";
import flipLogo from "../assets/images/flipLogo.png";

const Rating = ({ product }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      className="mb-2"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "60px",
          borderRadius: "17px",
          backgroundColor: "#388e3c",
        }}
      >
        <span style={{ color: "#fff", marginTop: "3px" }} className="ms-2">
          {product?.rating}
        </span>

        <ReactStars
          count={1}
          size={22}
          edit={false}
          value={product?.rating}
          color2={"#fff"}
        />
      </div>
      <div style={{ marginLeft: "10px", fontSize: "18px" }}>
        ({product.stock})
      </div>
      <div>
        <img
          src={flipLogo}
          alt=""
          height="25px"
          style={{ paddingLeft: "5px" }}
        />
      </div>
    </div>
  );
};

export default Rating;
