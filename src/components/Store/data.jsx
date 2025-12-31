import { FaBox, FaBriefcase, FaCreditCard, FaCrown, FaHeadset, FaLock, FaMapMarkerAlt, FaWallet } from "react-icons/fa";


// export const user = {
//   profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150",
//   walletBalance: 3200.5,
//   personalInfo: {
//     firstName: "John",
//     lastName: "Doe",
//     email: "john@example.com",
//     phone: "1234567890",
//     location: "New York, USA",
//     rank: "Platinum Member"
//   }
// };

export const user = {
  profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150",
  walletBalance: 3200.5,
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    location: "New York, USA",
    rank: "Platinum Member",
    memberSince: "March 2024"
  },
  // Support for multiple addresses
  addresses: [
    {
      id: "addr_1",
      isDefault: true,
      label: "Home", // e.g., Home, Office, Gym
      fullName: "John Doe",
      phone: "+1 123-456-7890",
      street: "123 Premium Lane",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    {
      id: "addr_2",
      isDefault: false,
      label: "Office",
      fullName: "John Doe",
      phone: "+1 987-654-3210",
      street: "456 Corporate Plaza",
      apartment: "Level 12",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "USA"
    }
  ],
  // Support for payment methods (Masked for security)
  paymentMethods: [
    {
      id: "pay_1",
      type: "card",
      brand: "visa", // Used to show the Visa Logo
      last4: "4444",
      expiryMonth: "12",
      expiryYear: "2026",
      isDefault: true
    },
    {
      id: "pay_2",
      type: "upi",
      provider: "Google Pay",
      vpa: "john.doe@okaxis"
    }
  ]
};

// export const accountItems = [
//   {
//     icon: <FaBox className="w-12 h-12 text-orange-600" />,
//     title: "Your Orders",
//     description: "Track, return, or buy things again",
//     bgColor: "bg-orange-100",
//   },
//   {
//     icon: <FaLock className="w-12 h-12 text-gray-500" />,
//     title: "Login & security",
//     description: "Edit login, name, and mobile number",
//     bgColor: "bg-gray-100",
//   },
//   // {
//   //   icon: <FaCrown className="w-12 h-12 text-blue-500" />,
//   //   title: "Prime",
//   //   description: "View benefits and payment settings",
//   //   bgColor: "bg-blue-50",
//   // },
//   {
//     icon: <FaMapMarkerAlt className="w-12 h-12 text-orange-500" />,
//     title: "Your Addresses",
//     description: "Edit addresses for orders and gifts",
//     bgColor: "bg-orange-100",
//   },
//   {
//     icon: <FaBriefcase className="w-12 h-12 text-purple-600" />,
//     title: "Your business account",
//     description:
//       "Sign up for free to save up to 18% with GST invoice and bulk discounts.",
//     bgColor: "bg-purple-50",
//   },
//   {
//     icon: <FaCreditCard className="w-12 h-12 text-blue-600" />,
//     title: "Payment options",
//     description: "Edit or add payment methods",
//     bgColor: "bg-blue-50",
//   },
//   // {
//   //   icon: <FaWallet className="w-12 h-12 text-orange-500" />,
//   //   title: "Amazon Pay balance",
//   //   description: "Add money to your balance",
//   //   bgColor: "bg-orange-100",
//   // },
//   {
//     icon: <FaHeadset className="w-12 h-12 text-teal-600" />,
//     title: "Contact Us",
//     description: "Contact our customer service via phone or chat",
//     bgColor: "bg-teal-50",
//   },
// ];
