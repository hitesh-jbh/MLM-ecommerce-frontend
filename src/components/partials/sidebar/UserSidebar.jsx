import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTimes, FaWallet } from "react-icons/fa"; // Using FaTimes for the cross icon
import Icons from "../../ui/Icon";

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: "profile",
      name: "Profile",
      icon: "heroicons:user",
      link: "/profile/me",
    },
    {
      id: "order",
      name: "Your Orders",
      icon: "heroicons:shopping-bag",
      link: "/profile/your-order",
    },
    {
      id: "address",
      name: "Your Address",
      icon: "heroicons:map-pin",
      link: "/profile/address",
    },
    {
      id: "payment",
      name: "Payment Options",
      icon: "heroicons:credit-card",
      link: "/profile/payment",
    },
    {
      id: "whislist",
      name: "Your Whislist",
      icon: "solar:heart-bold",
      link: "/profile/wishlist",
    },
    {
      id: "account",
      name: "Account Setting",
      icon: "heroicons:user-circle",
      link: "/profile/account-setting",
    },
    {
      id: "kyc",
      name: "E_Kyc",
      icon: "heroicons:shield-check",
      link: "/profile/e-kyc",
    },
    {
      id: "bank_detail",
      name: "Bank Detail",
      icon: "heroicons:building-library",
      link: "/profile/bank-detail",
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: <FaWallet />,
      link: "/profile/wallet",
    },
  ];

  

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white z-50 transition-transform duration-300 ease-in-out border-r border-gray-100
        w-[280px] sm:w-64 md:translate-x-0 md:static md:block scroll-m-2 overflow-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* MOBILE CLOSE ICON - Positioned top right */}
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-400 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation - Added mt-4 for mobile to avoid crowding the top */}
        <nav className="px-4 py-2 space-y-2 md:mt-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={item.id}
                to={item.link}
                // Closes sidebar when link is clicked on mobile
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`flex items-center p-4 rounded-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-black"
                    }
                  >
                      {React.isValidElement(item.icon) ? (
                        React.cloneElement(item.icon, { size: 20 })
                      ) : (
                        <Icons icon={item.icon} size={22} />
                      )}
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.15em]">
                    {item.name} 
                  </span>

                </div>
              </Link>
            );
          })}
        </nav>

        {/* Optional: Branding or Bottom Banner to match your "BUY MORE" image */}
        {/* <div className="absolute bottom-8 left-0 w-full px-4 md:hidden">
           <div className="bg-black text-white p-3 text-center rounded-sm">
              <p className="text-[10px] font-bold tracking-widest uppercase">
                Buy More, Save More
              </p>
           </div>
        </div> */}
      </div>
    </>
  );
};

export default UserSidebar;
