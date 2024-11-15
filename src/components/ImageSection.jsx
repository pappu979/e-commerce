import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import '../App.css';

function ImageSection({ images, handleWishlistClick, product, wishlistItem }) {
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
                  img == images[key]
                    ? "border border-danger p-2"
                    : null
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
          <button onClick={() => handleWishlistClick(product)} className="btn" data-tooltip-id="wishlist-tooltip">
                {
                  wishlistItem.some((item) => item.id === product.id) ?
                    <FavoriteIcon color="error" />
                    : <FavoriteBorderIcon />
                }
              </button>
              <ReactTooltip id="wishlist-tooltip" place="top" content="Add Item In WishList" />
            <div>
              
              <img src={img} alt="" className="product-image" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ImageSection;
