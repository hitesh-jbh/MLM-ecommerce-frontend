import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcher } from "./utils/Api/axiosInstance.js";

// Page Imports
import Home from "./pages/app/Home.jsx";
import AboutUS from "./pages/app/AboutUs.jsx"
import FilterProductPage from "./pages/app/FilterProductPage.jsx";
import Nav from "./components/partials/header/Nav.jsx";
import Footer from "./components/partials/footer/FooterPage.jsx";
import Contact from "./pages/app/AboutUs.jsx";
import InfoProd from "./pages/product/InfoProd.jsx";
import Modal from "./components/ui/Modal.jsx";
import Cart from "./pages/app/CartPage.jsx"
import Profile from "./pages/user/Profile.jsx";
import Luxria from "./pages/app/Luxria.jsx";
import StickyComponent from   "./components/ui/StickyComponent.jsx";
import FootersPage from "./components/partials/footer/FooterPage.jsx";

// Error Page
import ErrorPage from "./pages/error/Error.jsx";

import YourOrder from "./pages/order/YourOrder.jsx";
import TrackPackage from "./pages/order/TrackPackage.jsx";
import HierachyGraph from "./components/partials/widget/chart/HierachyGraph.jsx";
import WriteReview from "./pages/order/WriteReview.jsx";
import WalletBalance from "./pages/order/WalletBalance.jsx";

import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import WishlistPage from "./pages/app/WishlistPage.jsx";
// import OrderHistory from "./components/pages/OrderHistory.jsx";
import OrderHistory from "./pages/order/OrderHistory.jsx";
import OrdersOverview from "./components/admin_component/Ordersoverview.jsx";
import Sidebar from "./components/partials/sidebar/Sidebar.jsx";
import CompactCommissionConfig from "./components/admin_component/Comission.jsx";
import Notifications from "./pages/admin/Notification.jsx";
import FixedDateLabelWithDropdown from "./components/admin_component/Date.jsx";
import CampaignDashboard from "./components/admin_component/Compagins.jsx";
import UserManagementDashboard from "./components/partials/widget/chart/Chart.jsx";
import RecentActivity from "./components/admin_component/Testimonial.jsx";

// Login Imports
import LoginPage from "./pages/app/LoginPage.jsx";

// Admin Imports
import {AdminProfile} from "./pages/admin/AdminProfile.jsx"
import OrderManagement from "./pages/admin/OrderManagement.jsx";
import EditAddress from "./pages/user/EditAddress.jsx";
import PaymentMethods from "./pages/user/PaymentMethod.jsx";
import ReferralCodeMgt from "./pages/admin/ReferralCodeMgt.jsx";
import HierachyMgt from "./pages/admin/HierachyMgt.jsx";
import SignUp from "./pages/app/SignUp.jsx";
import AdminDashboard from "./pages/admin/Admindashboard.jsx";
import ProductMgt from "./pages/admin/productMgt.jsx";
import CommissionMgt from "./pages/admin/CommissionMgt.jsx";
import WorkWalletMgt from "./pages/admin/WorkWalletMgt.jsx";
import MlMmgt from "./pages/admin/MLMmgt.jsx";
import UserMgt from "./pages/admin/UserMgt.jsx";
import NormalWalletMgt from "./pages/admin/NormalWalletMgt.jsx";
import Settings from "./pages/admin/Settings.jsx";
import EditProfile from "./pages/user/EditProfile.jsx";
import AdminProtectedRoute from "./AdminProtectedRoute.jsx";
import ResetPassword from "./pages/user/ResetPassword.jsx";
import EKYC from "./pages/user/EKYC.jsx";
import AccountSetting from "./pages/user/AccountSetting.jsx";
import UserLayout from "./pages/user/UserLayout.jsx";
import ReportMgt from "./pages/admin/ReportMgt.jsx";

const AppLayout = () => {
  return (
    <SWRConfig value={{refreshInterval: 3000 ,fetcher: fetcher}}>
        <Provider store={appStore}>
          <div className="app">
            <Nav />
            <Outlet />
            <Footer />
            <StickyComponent />
          </div>
      </Provider>
    </SWRConfig>
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
        element: <UserLayout/>,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "/profile/me",
            element: <Profile />,
          },
          {
            path: "/profile/your-order",
            element: <YourOrder />
          },
          {
            path: "/profile/address",
            element: <EditAddress />,
          },
          {
            path: "/profile/payment",
            element: <PaymentMethods />,
          },
          {
            path: "/profile/account-setting",
            element: <AccountSetting />,
          },
          {
            path:"/profile/e-kyc",
            element: <EKYC />
          },
          {
            path: "/profile/wishlist",
            element: <WishlistPage />,
          },
          {
            path: "/profile/edit",
            element: <EditProfile />,
          },
        ]
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/admin",
        element: <AdminProfile />,
        // element: <AdminProtectedRoute />,
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
            path: "/admin/report",
            element: <ReportMgt />,
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
        path: "/order-history",
        element: <OrderHistory />,
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

