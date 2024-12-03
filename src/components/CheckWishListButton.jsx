import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Tooltip as ReactTooltip } from "react-tooltip";
import useWishlistHandler from "../provider/useWishlistHandler";
import { useSelector } from "react-redux";
import "../styles/wishlistButton.css";

const CheckWishlistItemButton = ({ product }) => {
    const wishlistItem = useSelector((state) => state.wishlist.items);
    const isInWishlist = wishlistItem.some((item) => item.id === product.id);
    const { handleWishlistClick } = useWishlistHandler()
    return (
        <>
            <button
                onClick={() => handleWishlistClick(product)}
                className="btn"
                data-tooltip-id="wishlist-tooltip"
                data-tooltip-content={
                    isInWishlist ? "Already in Wishlist" : "Add Item to Wishlist"
                }
            >
                {isInWishlist ? (
                    <FavoriteIcon color="error" />
                ) : (
                    <FavoriteBorderIcon />
                )}
            </button>
            <ReactTooltip id="wishlist-tooltip" place="top" effect="solid" />
        </>
    )
}

export default CheckWishlistItemButton;