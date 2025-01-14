import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Home from "../pages/Home";
import ShopPage from "../pages/ShopPage";
import ShowProductDetailsPage from "../pages/ShowProductDetailsPage";
import CategoryPage from "../pages/CategoryPage";
import Login from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CartPage from "../pages/CartPage";
import PaymentPage from "../pages/PaymentPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import Page404 from "../pages/Page404";
import NavigationBar from "../components/NavigationBar";
import FooterSection from "../components/FooterSection";
import CheckoutPage from "../pages/CheckoutPage";
import ForgotPassword from "../pages/ForgotPasswordPage";
import ResetPassword from "../pages/ResetPasswordPage";
import WishListPage from "../pages/WishListPage";
import SaveForLaterPage from "../pages/SaveForLater";
import ReviewPage from "../pages/ReviewPage";
import MyProfilePage from "../pages/MyProfilePage";

const Layout = () => (
  <>
    <NavigationBar />
    <Outlet />
    <FooterSection />
  </>
);

const router = createBrowserRouter([
  {
    path: ROUTES.DEFAULT_PATH,
    element: <Layout />,
    children: [
      { path: ROUTES.DEFAULT_PATH, element: <Home /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.SIGN_UP, element: <SignupPage /> },
      { path: ROUTES.SHOP, element: <ShopPage /> },
      { path: ROUTES.PRODUCT_PRODUCTID, element: <ShowProductDetailsPage /> },
      { path: ROUTES.PRODUCT_CATEGARTNAME, element: <CategoryPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
      { path: ROUTES.PAYMENT, element: <PaymentPage /> },
      { path: ROUTES.CONFIR_MATION, element: <ConfirmationPage /> },
      { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
      { path: ROUTES.WISHLIST, element: <WishListPage /> },
      { path: ROUTES.SAVEFOR_LATER, element: <SaveForLaterPage /> },
      { path: ROUTES.FORGOT_PAAWORD, element: <ForgotPassword /> },
      { path: ROUTES.RESET_PASSWWORD, element: <ResetPassword /> },
      { path: ROUTES.REVIEW, element: <ReviewPage /> },
      { path: ROUTES.PROFILE, element: <MyProfilePage /> },
      { path: ROUTES.PAGE_404, element: <Page404 /> },
    ],
  },
]);

const Router = () => {
  <RouterProvider router={router} />;
};

export default Router;
