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

// Error Page
import ErrorPage from "./components/pages/Error.jsx";
import StickyComponent from "./components/ui/StickyComponent.jsx";
import FootersPage from "./components/pages/FooterPage.jsx";
// import UserProfile from "./components/ui/UserProfile.jsx"

// 1. Layout Component
const AppLayout = () => {
  return (
    <div className="app">
      <ScrollRestoration />
      {/* <Modal /> */}
      <Nav />
      <Outlet />
      <Footer />
      <StickyComponent />
    </div>
  );
};

// 2. Define Routes
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
        path: "*",
        element: <ErrorPage />
      }
    ],
  },
]);

// 3. Export the App
export default function App() {
  return <RouterProvider router={appRouter} />;
}

// import React from "react";
// import AboutUs from "./components/pages/AboutUs.jsx";
// import StickyComponent from "./components/ui/StickyComponent.jsx";
// import Modal from "./components/ui/Modal.jsx";
// import ProductInfoPurchase from "./pages/ProductInoPurchase.jsx";
// import ScrollingBanner from "./components/ui/ScrollingBannerCarousel.jsx";
// import FeatureSection from "./components/ui/FeatureSection.jsx";
// import Card from "./components/ui/FourCardButton.jsx";
// import FilterProductPage from "./components/pages/FilterProductPage.jsx";
// import Home from "./components/pages/Home.jsx";
// import Nav from "./components/ui/Nav.jsx"
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// const AppLayout = () => {
//   return (
//     <div className="app">
//       <Nav />
//       <Outlet />
//     </div>
//   )
// }

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   }
// ])

// const root = ReactDOM(document.getElementById("root"));

// root.render(<RouterProvider rooter={appRouter} />)

// export default function App() {
//   const userData = {
//   profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
//   fullName: "udit kumar",
//   role: "Admin",
//   location: "Leeds, United Kingdom",
//   personalInfo: {
//     firstName: "Natashia",
//     lastName: "Khaleira",
//     dob: "12-10-1990",
//     email: "info@binary-fusion.com",
//     phone: "(+62) 821 2554-5846",
//     role: "student",
//   },
// };

//   return (
//     <>
//      <Home />
//      <FilterProductPage />
//      <Card />
//      <AboutUs />
//      <StickyComponent />
//      <Modal />  
//      <FeatureSection />
//      <ProductInfoPurchase />
//      <ScrollingBanner />
//      <FeatureSection />
     
//     </>
//   );
// }
