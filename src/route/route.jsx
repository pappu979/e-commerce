import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
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
import { Outlet } from "react-router-dom";
import CheckoutPage from "../pages/CheckoutPage";
import ForgotPassword from "../pages/ForgotPasswordPage";
import ResetPassword from "../pages/ResetPasswordPage";
import WishListPage from "../pages/WishListPage";
import SaveForLaterPage from "../pages/SaveForLater";
import ReviewPage from "../pages/ReviewPage";

const Layout = () => (
  <>
    <NavigationBar />
    <Outlet />  
    <FooterSection />
  </>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignupPage /> },
          { path: "products", element: <ProductPage /> },
          { path: "products/:productID", element: <ShowProductDetailsPage /> },
          { path: "products/category/:categoryName", element: <CategoryPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "confirmation", element: <ConfirmationPage /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "wishlist", element: <WishListPage /> },
          { path: "saveforlater", element: <SaveForLaterPage /> },
          { path: "forgot-password", element: <ForgotPassword />},
          { path: "reset-password", element: <ResetPassword />},
          { path: "review", element: <ReviewPage />},
          { path: "*", element: <Page404 /> },
        ],
    }
])