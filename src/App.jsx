import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";

// Page Imports
import Home from "./components/pages/Home.jsx";
import AboutUS from "./components/pages/AboutUs.jsx"
import FilterProductPage from "./components/pages/FilterProductPage.jsx";
// import ProductInfoPurchase from "./pages/ProductInoPurchase.jsx";
import Nav from "./components/ui/Nav.jsx";
import Footer from "./components/ui/Footer.jsx";
import Contact from "./components/pages/contact.jsx";
import InfoProd from "./components/pages/InfoProd.jsx";
import Modal from "./components/ui/Modal.jsx";
import Cart from "./components/pages/CartPage.jsx"
import Profile from "./components/pages/Profile.jsx";
import Luxria from "./components/pages/Luxria.jsx";
import StickyComponent from   "./components/ui/StickyComponent.jsx";
import FootersPage from "./components/pages/FooterPage.jsx";

// Error Page
import ErrorPage from "./components/pages/Error.jsx";

import HomeShimmer from "./components/ui/HomeShimmer.jsx";
import YourOrder from "./components/pages/YourOrder.jsx";
import TrackPackage from "./components/pages/Order/TrackPackage.jsx";
import HierachyGraph from "./components/ui/HierachyGraph.jsx";
import WriteReview from "./components/pages/WriteReview.jsx";
import WalletBalance from "./components/pages/WalletBalance.jsx";

import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import WishlistPage from "./components/pages/WishlistPage.jsx";
// import OrderHistory from "./components/pages/OrderHistory.jsx";
import OrderHistory from "./components/pages/OrderHistory.jsx";
import OrdersOverview from "./components/pages/admin/Ordersoverview.jsx";
import Sidebar from "./components/pages/admin/Sidebar.jsx";
import CompactCommissionConfig from "./components/pages/admin/Comission.jsx";
import Notifications from "./components/pages/admin/Notification.jsx";
import FixedDateLabelWithDropdown from "./components/pages/admin/Date.jsx";
import CampaignDashboard from "./components/pages/admin/Compagins.jsx";
import UserManagementDashboard from "./components/pages/admin/Chart.jsx";
import RecentActivity from "./components/pages/admin/Testimonial.jsx";

// Login Imports
import LoginPage from "./components/pages/LoginPage.jsx";
// import LoginSignupPage from "./components/pages/LoginSignupPage.jsx";

// Admin Imports
// import AdminProfile from "./components/pages/Admin/AdminProfile.jsx";
import {AdminProfile} from "./components/pages/admin/AdminProfile.jsx"
// import GenericTable from "./components/pages/Admin/GenericTable.jsx";
import OrderManagement from "./components/pages/admin/OrderManagement.jsx";
import EditAddress from "./components/pages/user/editAddress.jsx";
import PaymentMethods from "./components/pages/user/PaymentMethod.jsx";
import ReferralCodeMgt from "./components/pages/admin/ReferralCodeMgt.jsx";
import HierachyMgt from "./components/pages/admin/HierachyMgt.jsx";
// import WishlistPage from "./components/pages/WishlistPage.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import AdminDashboard from "./components/pages/admin/AdminDashboard.jsx";
import ProductMgt from "./components/pages/admin/productMgt.jsx";
import CommissionMgt from "./components/pages/admin/CommissionMgt.jsx";
import WorkWalletMgt from "./components/pages/admin/WorkWalletMgt.jsx";
import MlMmgt from "./components/pages/admin/MLMmgt.jsx";
import UserMgt from "./components/pages/admin/UserMgt.jsx";
import NormalWalletMgt from "./components/pages/admin/NormalWalletMgt.jsx";
import Settings from "./components/pages/admin/Settings.jsx";
import EditProfile from "./components/pages/EditProfile.jsx";
import ResetPassword from "./components/pages/user/ResetPassword.jsx";
import EKYC from "./components/pages/user/EKYC.JSX";
// import EKYC from "./components/pages/user/EKYC.jsx/index.js";
// import ReferralRankingCard from "./components/pages/Admin/ReferralRankingCard.jsx";;
// import Sidebar from "./components/pages/admin/Sidebar.jsx"

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        {/* <ScrollRestoration /> */}
        {/* <Modal /> */}
        <Nav />
        <Outlet />
        <Footer />
        <StickyComponent />
        <ScrollRestoration />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/gentle",
        element: <FilterProductPage />,
      },
      {
        path: "/luxuria",
        element: <Luxria />
      },
      {
        path: "/about",
        element: <AboutUS />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/address",
        element: <EditAddress />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path:"/e-kyc",
        element: <EKYC />
      },
      {
        path: "/payment",
        element: <PaymentMethods />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/admin",
        element: <AdminProfile />,
        children: [
          {
            index: true,
            element: <AdminDashboard />
          },
          {
            path: "/admin/dashboard",
            element: <AdminDashboard />
          },
          {
            path: "/admin/orderoverview",
            element: <OrderManagement />
          },
          {
            path: "/admin/product",
            element: <ProductMgt />,
          },
          {
            path: "/admin/comission",
            element: <CommissionMgt />,
          },
          {
            path: "/admin/wallets/normal",
            element: <NormalWalletMgt />,
          },
          {
            path: "/admin/wallets/work",
            element: <WorkWalletMgt />,
          },
          {
            path: "/admin/user",
            element: <UserMgt />,
          },
          {
            path: "/admin/mlm",
            element: <MlMmgt />,
          },
          {
            path: "/admin/notifications",
            element: <Notifications />
          },
          {
            path: "/admin/setting",
            element: <Settings />
          },
          {
            path: "/admin/referalcode",
            element: <ReferralCodeMgt />
          },
          {
            path: "/admin/hierachy",
            element: <HierachyMgt />
          },
        ]
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <InfoProd />,
      },
      {
        path: "/info/:id",
        element: <FootersPage />
      },
      {
        path: "/your-order",
        element: <YourOrder />
      },
      {
        path: "/your-order/:orderId",
        element: <TrackPackage />
      },
      {
        path: "/refer-graph",
        element: <HierachyGraph />,
      },
      {
        path: "/write-review/:orderId",
        element: <WriteReview />
      },
      {
        path: "/wallet-balance",
        element: <WalletBalance />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        // element: <LoginSignupPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ],
  },
  {
    path: "/modal",
    element: <Modal />,
  },
]);



export default function App() {
  return <RouterProvider router={appRouter} />;
}

