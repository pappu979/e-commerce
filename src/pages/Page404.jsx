import React from "react";
import not from "../assets/images/nfound.gif";

function Page404() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={not} alt="not found" className="w-90" width={"70%"} />
      </div>
    </>
  );
}

export default Page404;
