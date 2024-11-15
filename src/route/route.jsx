import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductPage from "../pages/ProductPage";
import CategoryPage from "../pages/CategoryPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
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
          { path: "signup", element: <Signup /> },
          { path: "products", element: <Products /> },
          { path: "products/:productID", element: <ProductPage /> },
          { path: "products/category/:categoryName", element: <CategoryPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "confirmation", element: <ConfirmationPage /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "wishlist", element: <WishListPage /> },
          { path: "saveforlater", element: <SaveForLaterPage /> },
          { path: "forgot-password", element: <ForgotPassword />},
          { path: "reset-password", element: <ResetPassword />},
          { path: "*", element: <Page404 /> },
        ],
    }
])