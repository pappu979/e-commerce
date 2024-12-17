import React from "react";
import CheckWishlistItemButton from "./CheckWishListButton";
import "../App.css";

function ProductImagesShowSection({ images, product }) {
  const [img, setImg] = React.useState(images[0] ? images[0] : null);

  const changeImage = (index) => {
    setImg(images[index]);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {images?.map((val, key) => (
              <div
                className={
                  img == images[key] ? "border border-danger p-2" : null
                }
                onClick={() => changeImage(key)}
                key={key}
              >
                <img
                  style={{ maxHeight: "100px" }}
                  src={val}
                  alt={`img-${key}`}
                />
              </div>
            ))}
          </div>
          <div className="col-md-9 border ">
            <CheckWishlistItemButton product={product} />

            <div>
              <img src={img} alt="" className="product-image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductImagesShowSection;
