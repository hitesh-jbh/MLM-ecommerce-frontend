import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";

// Page Imports
import Home from "./components/pages/Home.jsx";
import AboutUS from "./components/pages/AboutUs.jsx"
import FilterProductPage from "./components/pages/FilterProductPage.jsx";
import ProductInfoPurchase from "./pages/ProductInoPurchase.jsx";
import Nav from "./components/ui/Nav.jsx";
import Footer from "./components/ui/Footer.jsx";
import Contact from "./components/pages/contact.jsx";
import InfoProd from "./components/pages/InfoProd.jsx";
import Modal from "./components/ui/Modal.jsx";
import Cart from "./components/pages/CartPage.jsx"
import Profile from "./components/pages/Profile.jsx";
import Luxria from "./components/pages/Luxria.jsx";
import StickyComponent from "./components/ui/StickyComponent.jsx";
import FootersPage from "./components/pages/FooterPage.jsx";

// Error Page
import ErrorPage from "./components/pages/Error.jsx";

import HomeShimmer from "./components/ui/HomeShimmer.jsx";
import YourOrder from "./components/pages/YourOrder.jsx";
import TrackPackage from "./components/pages/Order/TrackPackage.jsx";
import HierachyGraph from "./components/ui/HierachyGraph.jsx";
import WriteReview from "./components/pages/WriteReview.jsx";
import WalletBalance from "./components/pages/WalletBalance.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";

import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import WishlistPage from "./components/pages/WishlistPage.jsx";

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
        path: "*",
        element: <ErrorPage />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/modal",
    element: <Modal />,
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
