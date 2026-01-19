import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";

// Static Logic Imports
import { fetcher } from "./utils/Api/axiosInstance.js";
import appStore from "./utils/appStore.js";
import ScrollToTop from "./utils/ScrollToTop.jsx";

// Core UI Components (Immediate Load)
import Nav from "./components/partials/header/Nav.jsx";
import Footer from "./components/partials/footer/footer.jsx";
import StickyComponent from "./components/ui/StickyComponent.jsx";

// --- LAZY LOADED PAGES ---

// App / Auth
const Home = lazy(() => import("./pages/app/Home.jsx"));
const AboutUS = lazy(() => import("./pages/app/AboutUs.jsx"));
const Contact = lazy(() => import("./pages/app/contact.jsx"));
const FilterProductPage = lazy(() => import("./pages/app/FilterProductPage.jsx"));
const Luxria = lazy(() => import("./pages/app/Luxria.jsx"));
const LoginPage = lazy(() => import("./pages/app/LoginPage.jsx"));
const SignUp = lazy(() => import("./pages/app/SignUp.jsx"));
const Cart = lazy(() => import("./pages/app/CartPage.jsx"));
const WishlistPage = lazy(() => import("./pages/app/WishlistPage.jsx"));

// Product & Orders
const InfoProd = lazy(() => import("./pages/product/InfoProd.jsx"));
const YourOrder = lazy(() => import("./pages/order/YourOrder.jsx"));
const OrderHistory = lazy(() => import("./pages/order/OrderHistory.jsx"));
const ViewOrder = lazy(() => import("./pages/order/ViewOrder.jsx"));
const TrackPackage = lazy(() => import("./pages/order/TrackPackage.jsx"));
const WriteReview = lazy(() => import("./pages/order/WriteReview.jsx"));
const WalletBalance = lazy(() => import("./pages/order/WalletBalance.jsx"));

// User Layout & Pages
const UserLayout = lazy(() => import("./pages/user/UserLayout.jsx"));
const Profile = lazy(() => import("./pages/user/Profile.jsx"));
const EditAddress = lazy(() => import("./pages/user/EditAddress.jsx"));
const PaymentMethods = lazy(() => import("./pages/user/PaymentMethod.jsx"));
const AccountSetting = lazy(() => import("./pages/user/AccountSetting.jsx"));
const EKYC = lazy(() => import("./pages/user/EKYC.jsx"));
const EditProfile = lazy(() => import("./pages/user/EditProfile.jsx"));
const ResetPassword = lazy(() => import("./pages/user/ResetPassword.jsx"));

// Admin Layout & Protected Routes
const AdminProtectedRoute = lazy(() => import("./AdminProtectedRoute.jsx"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile.jsx").then(m => ({ default: m.AdminProfile })));
const AdminDashboard = lazy(() => import("./pages/admin/Admindashboard.jsx"));
const AdminPro = lazy(() => import("./pages/admin/AdminPro.jsx"));
const OrderManagement = lazy(() => import("./pages/admin/OrderManagement.jsx"));
const ProductMgt = lazy(() => import("./pages/admin/productMgt.jsx"));
const CommissionMgt = lazy(() => import("./pages/admin/CommissionMgt.jsx"));
const SetCommission = lazy(() => import("./components/admin_component/SetCommission.jsx"));
const Rank = lazy(() => import("./components/admin_component/Rank.jsx"));
const ReportMgt = lazy(() => import("./pages/admin/ReportMgt.jsx"));
const NormalWalletMgt = lazy(() => import("./pages/admin/NormalWalletMgt.jsx"));
const WorkWalletMgt = lazy(() => import("./pages/admin/WorkWalletMgt.jsx"));
const UserMgt = lazy(() => import("./pages/admin/UserMgt.jsx"));
const MlMmgt = lazy(() => import("./pages/admin/MLMmgt.jsx"));
const Notifications = lazy(() => import("./pages/admin/Notification.jsx"));
const Settings = lazy(() => import("./pages/admin/Settings.jsx"));
const ReferralCodeMgt = lazy(() => import("./pages/admin/ReferralCodeMgt.jsx"));
const HierachyMgt = lazy(() => import("./pages/admin/HierachyMgt.jsx"));

// Utils/Misc
const ErrorPage = lazy(() => import("./pages/error/Error.jsx"));
const FootersPage = lazy(() => import("./components/partials/footer/FooterPage.jsx"));
const HierachyGraph = lazy(() => import("./components/partials/widget/chart/HierachyGraph.jsx"));
const Modal = lazy(() => import("./components/ui/Modal.jsx"));

const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-white font-black uppercase text-xs tracking-widest">
    Loading Assets...
  </div>
);

const AppLayout = () => {
  return (
    <SWRConfig value={{ refreshInterval: 3000, fetcher: fetcher }}>
      <Provider store={appStore}>
        <div className="app min-h-screen flex flex-col">
          <ScrollToTop />
          <Nav />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </main>
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
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <AboutUS /> },
      { path: "gentle", element: <FilterProductPage /> },
      { path: "luxuria", element: <Luxria /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "edit-profile", element: <EditProfile /> },
      
      // USER ROUTES
      {
        path: "profile",
        element: <UserLayout />,
        children: [
          { index: true, element: <Profile /> },
          { path: "me", element: <Profile /> },
          { path: "your-order", element: <YourOrder /> },
          { path: "address", element: <EditAddress /> },
          { path: "payment", element: <PaymentMethods /> },
          { path: "account-setting", element: <AccountSetting /> },
          { path: "e-kyc", element: <EKYC /> },
          { path: "wishlist", element: <WishlistPage /> },
          { path: "edit", element: <EditProfile /> },
        ]
      },

      // ADMIN PROTECTED ROUTES (AdminProfile acts as Layout)
      {
        path: "admin",
        element: (
          <Suspense fallback={<PageLoader />}>
            {/* <AdminProfile /> */}
            <AdminProtectedRoute>
              <AdminProfile />
            </AdminProtectedRoute>
          </Suspense>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "adminProfile", element: <AdminPro /> },
          { path: "orderoverview", element: <OrderManagement /> },
          { path: "product", element: <ProductMgt /> },
          { path: "comission", element: <CommissionMgt /> },
          { path: "comission/set", element: <SetCommission /> },
          { path: "comission/rank", element: <Rank /> },
          { path: "report", element: <ReportMgt /> },
          { path: "wallets/normal", element: <NormalWalletMgt /> },
          { path: "wallets/work", element: <WorkWalletMgt /> },
          { path: "user", element: <UserMgt /> },
          { path: "mlm", element: <MlMmgt /> },
          { path: "notifications", element: <Notifications /> },
          { path: "setting", element: <Settings /> },
          { path: "referalcode", element: <ReferralCodeMgt /> },
          { path: "hierachy", element: <HierachyMgt /> },
        ]
      },

      // SHOPPING & ORDERS
      { path: "cart", element: <Cart /> },
      { path: "order-history", element: <OrderHistory /> },
      { path: "view-order/:id", element: <ViewOrder /> },
      { path: "product/:id", element: <InfoProd /> },
      { path: "your-order/:orderId", element: <TrackPackage /> },
      { path: "write-review/:productId", element: <WriteReview /> },
      { path: "wallet-balance", element: <WalletBalance /> },
      { path: "wishlist", element: <WishlistPage /> },

      // MISC
      { path: "info/:id", element: <FootersPage /> },
      { path: "refer-graph", element: <HierachyGraph /> },
      { path: "*", element: <ErrorPage /> }
    ]
  },
  { path: "/modal", element: <Suspense fallback={<PageLoader />}><Modal /></Suspense> }
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}









// import React from "react";
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import { SWRConfig } from "swr";
// import { fetcher } from "./utils/Api/axiosInstance.js";

// // Scroll to top
// import ScrollToTop from "./utils/ScrollToTop.jsx"

// // Page Imports
// import Home from "./pages/app/Home.jsx";
// import AboutUS from "./pages/app/AboutUs.jsx"
// import FilterProductPage from "./pages/app/FilterProductPage.jsx";
// import Nav from "./components/partials/header/Nav.jsx";
// import Footer from "./components/partials/footer/footer.jsx";
// import Contact from "./pages/app/contact.jsx";
// import InfoProd from "./pages/product/InfoProd.jsx";
// import Modal from "./components/ui/Modal.jsx";
// import Cart from "./pages/app/CartPage.jsx"
// import Profile from "./pages/user/Profile.jsx";
// import Luxria from "./pages/app/Luxria.jsx";
// import StickyComponent from   "./components/ui/StickyComponent.jsx";
// import FootersPage from "./components/partials/footer/FooterPage.jsx";

// // Error Page
// import ErrorPage from "./pages/error/Error.jsx";

// import YourOrder from "./pages/order/YourOrder.jsx";
// import TrackPackage from "./pages/order/TrackPackage.jsx";
// import HierachyGraph from "./components/partials/widget/chart/HierachyGraph.jsx";
// import WriteReview from "./pages/order/WriteReview.jsx";
// import WalletBalance from "./pages/order/WalletBalance.jsx";

// import { Provider } from "react-redux";
// import appStore from "./utils/appStore.js";
// import WishlistPage from "./pages/app/WishlistPage.jsx";
// // import OrderHistory from "./components/pages/OrderHistory.jsx";
// import OrderHistory from "./pages/order/OrderHistory.jsx";
// import OrdersOverview from "./components/admin_component/Ordersoverview.jsx";
// import Sidebar from "./components/partials/sidebar/Sidebar.jsx";
// import CompactCommissionConfig from "./components/admin_component/Comission.jsx";
// import Notifications from "./pages/admin/Notification.jsx";
// import FixedDateLabelWithDropdown from "./components/admin_component/Date.jsx";
// import CampaignDashboard from "./components/admin_component/Compagins.jsx";
// import UserManagementDashboard from "./components/partials/widget/chart/Chart.jsx";
// import RecentActivity from "./components/admin_component/Testimonial.jsx";

// // Login Imports
// import LoginPage from "./pages/app/LoginPage.jsx";

// // Admin Imports
// import {AdminProfile} from "./pages/admin/AdminProfile.jsx"
// import OrderManagement from "./pages/admin/OrderManagement.jsx";
// import EditAddress from "./pages/user/EditAddress.jsx";
// import PaymentMethods from "./pages/user/PaymentMethod.jsx";
// import ReferralCodeMgt from "./pages/admin/ReferralCodeMgt.jsx";
// import HierachyMgt from "./pages/admin/HierachyMgt.jsx";
// import SignUp from "./pages/app/SignUp.jsx";
// import AdminDashboard from "./pages/admin/Admindashboard.jsx";
// import ProductMgt from "./pages/admin/productMgt.jsx";
// import CommissionMgt from "./pages/admin/CommissionMgt.jsx";
// import WorkWalletMgt from "./pages/admin/WorkWalletMgt.jsx";
// import MlMmgt from "./pages/admin/MLMmgt.jsx";
// import UserMgt from "./pages/admin/UserMgt.jsx";
// import NormalWalletMgt from "./pages/admin/NormalWalletMgt.jsx";
// import Settings from "./pages/admin/Settings.jsx";
// import EditProfile from "./pages/user/EditProfile.jsx";
// import AdminProtectedRoute from "./AdminProtectedRoute.jsx";
// import ResetPassword from "./pages/user/ResetPassword.jsx";
// import EKYC from "./pages/user/EKYC.jsx";
// import AccountSetting from "./pages/user/AccountSetting.jsx";
// import UserLayout from "./pages/user/UserLayout.jsx";
// import ReportMgt from "./pages/admin/ReportMgt.jsx";
// import ViewOrder from "./pages/order/ViewOrder.jsx";
// import SetCommission from "./components/admin_component/SetCommission.jsx";
// import Rank from "./components/admin_component/Rank.jsx";
// import AdminPro from "./pages/admin/AdminPro.jsx";

// const AppLayout = () => {
//   return (
//     <SWRConfig value={{refreshInterval: 3000 ,fetcher: fetcher}}>
//         <Provider store={appStore}>
//           <div className="app">
//             <ScrollToTop />
//             <Nav />
//             <Outlet />
//             <Footer />
//             <StickyComponent />
//           </div>
//       </Provider>
//     </SWRConfig>
//   );
// };

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },

//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       {
//         path: "/gentle",
//         element: <FilterProductPage />,
//       },
//       {
//         path: "/luxuria",
//         element: <Luxria />
//       },
//       {
//         path: "/about",
//         element: <AboutUS />,
//       },
//       {
//         path: "/profile",
//         element: <UserLayout/>,
//         children: [
//           {
//             index: true,
//             element: <Profile />,
//           },
//           {
//             path: "/profile/me",
//             element: <Profile />,
//           },
//           {
//             path: "/profile/your-order",
//             element: <YourOrder />
//           },
//           {
//             path: "/profile/address",
//             element: <EditAddress />,
//           },
//           {
//             path: "/profile/payment",
//             element: <PaymentMethods />,
//           },
//           {
//             path: "/profile/account-setting",
//             element: <AccountSetting />,
//           },
//           {
//             path:"/profile/e-kyc",
//             element: <EKYC />
//           },
//           {
//             path: "/profile/wishlist",
//             element: <WishlistPage />,
//           },
//           {
//             path: "/profile/edit",
//             element: <EditProfile />,
//           },
//         ]
//       },
//       {
//         path: "/reset-password",
//         element: <ResetPassword />,
//       },
//       {
//         path: "/edit-profile",
//         element: <EditProfile />,
//       },
//       {
//         path: "/admin",
//         element: (
//           <AdminProtectedRoute>
//             <AdminProfile />
//           </AdminProtectedRoute>
//         ),
//         children: [
//           {
//             index: true,
//             element: <AdminDashboard />
//           },
//           {
//             path: "/admin/dashboard",
//             element: <AdminDashboard />
//           },
//           {
//             path: "/admin/adminProfile",
//             element: <AdminPro/>
//           },
//           {
//             path: "/admin/orderoverview",
//             element: <OrderManagement />
//           },
//           {
//             path: "/admin/product",
//             element: <ProductMgt />,
//           },
//           {
//             path: "/admin/comission",
//             element: <CommissionMgt />,
//           },
//           {
//             path: "/admin/comission/set",
//             element: <SetCommission />,
//           },
//           {
//             path: "/admin/comission/rank",
//             element: <Rank />,
//           },
//           {
//             path: "/admin/report",
//             element: <ReportMgt />,
//           },
//           {
//             path: "/admin/wallets/normal",
//             element: <NormalWalletMgt />,
//           },
//           {
//             path: "/admin/wallets/work",
//             element: <WorkWalletMgt />,
//           },
//           {
//             path: "/admin/user",
//             element: <UserMgt />,
//           },
//           {
//             path: "/admin/mlm",
//             element: <MlMmgt />,
//           },
//           {
//             path: "/admin/notifications",
//             element: <Notifications />
//           },
//           {
//             path: "/admin/setting",
//             element: <Settings />
//           },
//           {
//             path: "/admin/referalcode",
//             element: <ReferralCodeMgt />
//           },
//           {
//             path: "/admin/hierachy",
//             element: <HierachyMgt />
//           },
//         ]
//       },
//       {
//         path: "/cart",
//         element: <Cart />,
//       },
//       {
//         path: "/order-history",
//         element: <OrderHistory />,
//       },
//       {
//         path: "/view-order/:id",
//         element: <ViewOrder />
//       },
//       {
//         path: "/product/:id",
//         element: <InfoProd />,
//       },
//       {
//         path: "/info/:id",
//         element: <FootersPage />
//       },
//       {
//         path: "/your-order/:orderId",
//         element: <TrackPackage />
//       },
//       {
//         path: "/refer-graph",
//         element: <HierachyGraph />,
//       },
//       {
//         path: "/write-review/:productId",
//         element: <WriteReview />
//       },
//       {
//         path: "/wallet-balance",
//         element: <WalletBalance />,
//       },
//       {
//         path: "/wishlist",
//         element: <WishlistPage />,
//       },
//       {
//         path: "/login",
//         element: <LoginPage />,
//         // element: <LoginSignupPage />,
//       },
//       {
//         path: "/signup",
//         element: <SignUp />,
//       },
//       {
//         path: "*",
//         element: <ErrorPage />
//       }
//     ],
//   },
//   {
//     path: "/modal",
//     element: <Modal />,
//   },
// ]);



// export default function App() {
//   return <RouterProvider router={appRouter} />;
// }

