import { combineReducers } from "redux";
import auth from "../reducres/authReducer";
import cart from "../reducres/cartReducer";
import user from "../reducres/userReducer";
import wishlist from "../reducres/wishListReducer";
import saveForLater from "../reducres/saveForLaterReducer";
import address from "../reducres/addressReducer";

const rootReducer = combineReducers({
  auth,
  cart,
  user,
  wishlist,
  saveForLater,
  address,
});

export default rootReducer;
