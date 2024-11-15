import { toast } from "react-toastify";

const useWishlistHandler = (wishlistItem, addToWishList, removeFromWishList) => {
  const handleWishlistClick = (product) => {
    const isAlreadyWishlisted = wishlistItem.some((item) => item.id === product.id);

    if (isAlreadyWishlisted) {
      removeFromWishList(product.id);
    } else {
      addToWishList(product);
      
      toast.success(`${product.title} has been added to your wishlist!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return { handleWishlistClick };
};

export default useWishlistHandler;
