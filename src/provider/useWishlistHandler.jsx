import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../reducres/wishListReducer";

const useWishlistHandler = () => {
  const dispatch = useDispatch();
  const wishlistItem = useSelector((state) => state.wishlist.wishlistItems);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleWishlistClick = (product) => {
    const isAlreadyWishlisted = wishlistItem.some(
      (item) => item.id === product.id
    );

    if (isAlreadyWishlisted) {
      dispatch(removeFromWishlist({ userId: currentUser.id, id: product.id }));
    } else {
      dispatch(addToWishlist({ userId: currentUser.id, addProduct: product }));

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
