import React from "react";
import Icons from "../components/ui/Icon";

export const websiteName = "MLM";
export const webSocialHandle = "@mlm.india";
export const webSocialLink = "https://instagram.com/mlm.india";
export const currentYear = new Date().getFullYear();
export const dummyEmail = "email@mlm.com";
export const contactEmail = "contact.mlm@gmail.com";
export const contactNumber = "+91 74360 04454";


export const Product = [
    {
        id: 1,
        name: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
        image: [
            "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=810",
            "https://gentlehaus.in/cdn/shop/files/2_2dba3960-3954-4a33-8921-52bd73113b1b.webp?v=1750849046&width=810",
            "https://gentlehaus.in/cdn/shop/files/3_bcd67440-8c…38-b9d1-d6a6ac27ba0e.webp?v=1750849046&width=810",
        ],
        offerPrice: 85,
        price: 120,
        category: "Shirts",
        stock: 12,
        brand: "Uniqlo",
        description: "Classic blue denim jacket with a relaxed fit and distressed detailing.",
        rating: 4.7,
        reviews: 85,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 2,
        name: "Slim-Fit Chino Pants",
        image: [
            'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
            "https://images.unsplash.com/photo-1473966968600-fa804b86d30b?q=80&w=500",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500"
        ],
        offerPrice: 45,
        price: 55,
        category: "Shirts",
        stock: 25,
        brand: "Nike",
        description: "Versatile stretch chinos perfect for both office and weekend wear.",
        rating: 4.3,
        reviews: 110,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 3,
        name: "Minimalist Linen Shirt",
        image: [
            'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=500",
            "https://images.unsplash.com/photo-1603252109303-2751441dd15e?q=80&w=500"
        ],
        offerPrice: 38,
        price: 48,
        category: "Shirts",
        stock: 0,
        brand: "Adidas",
        description: "Breathable, lightweight linen shirt designed for hot summer days.",
        rating: 4.8,
        reviews: 42,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 4,
        name: "Canvas High-Top Sneakers",
        image: [
            'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=500",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500"
        ],
        offerPrice: 60,
        price: 90,
        category: "Shirts",
        stock: 8,
        brand: "Puma",
        description: "Durable canvas sneakers with cushioned insoles for all-day comfort.",
        rating: 4.5,
        reviews: 215,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 5,
        name: "Oversized Graphic Hoodie",
        image: [
            'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',"https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500",
            "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=500"
        ],
        offerPrice: 52,
        price: 75,
        category: "T-Shirts",
        stock: 30,
        brand: "Nike",
        description: "Heavyweight cotton blend hoodie with a custom screen-printed design.",
        rating: 4.9,
        reviews: 67,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 6,
        name: "Pleated Midi Skirt",
        image: [
            'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=500"
        ],
        offerPrice: 32,
        price: 40,
        category: "Bottoms",
        stock: 15,
        brand: "T-Shirts",
        description: "Flowy pleated skirt in a soft satin finish.",
        rating: 4.6,
        reviews: 29,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 7,
        name: "Cable-Knit Wool Sweater",
        image: [
            "https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240","https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=500"
        ],
        offerPrice: 95,
        price: 150,
        category: "Shorts",
        stock: 4,
        brand: "Adidas",
        description: "Authentic wool blend sweater featuring a traditional cable pattern.",
        rating: 5.0,
        reviews: 12,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 8,
        name: "Summer Floral Dress",
        image: [
            "https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500"
        ],
        offerPrice: 65,
        price: 85,
        category: "Pants",
        stock: 10,
        brand: "New Balance",
        description: "A light, airy floral print dress with a cinched waist for a flattering fit.",
        rating: 4.4,
        reviews: 53,
        variants: [
            { size: "S", price: 85, stock: 5 },
            { size: "M", price: 90, stock: 12 },
            { size: "L", price: 95, stock: 2 },
            { size: "XL", price: 100, stock: 8 }
        ]
        // sizes: ["S", "M", "L", "XL"],
    },
];

// export const Brands = [
//         { name: 'Nike', count: 123, logo: 'ℕ' },
//         { name: 'Adidas', count: 55, logo: '𝔄' },
//         { name: 'Puma', count: 325, logo: '𝕻' },
//         { name: 'Uniqlo', count: 61, logo: 'ⓤ' },
//         { name: 'New Balance', count: 99, logo: '𝔵' },
//         { name: 'Apple', count: 65, logo: '𝕴' },
//     ];
export const Brands = [
        { name: 'Electronics'},
        { name: 'Fashion'},
        { name: 'Food'},
        { name: 'Health'},
        { name: 'Beauty'},
        { name: 'Furniture'},
        { name: 'Toys'},
    ];

export const shippedProducts = [
        {
            id: 1,
            name: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
            image: [
                "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/2_2dba3960-3954-4a33-8921-52bd73113b1b.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/3_bcd67440-8c…38-b9d1-d6a6ac27ba0e.webp?v=1750849046&width=810",
            ],
            size: "L",
            quantity: 1,
            orderId: "404-1234567-8901234",
            orderDate: "20 December 2025",
            status: "0", 
            price: 971.00,
            shipTo: "John Doe",
            items: [{
                id: 1,
                title: "Men's Full Sleeve Cotton Shirt with Retro Geometric Block Print",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2025"
            }]
        },
        {
            id: 2,
            name: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
            image: [
                "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/2_2dba3960-3954-4a33-8921-52bd73113b1b.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/3_bcd67440-8c…38-b9d1-d6a6ac27ba0e.webp?v=1750849046&width=810",
            ],
            size: "L",
            quantity: 1,
            orderId: "404-1234567-8905678",
            orderDate: "21 December 2025",
            status: "1", // Added for StepBar
            price: 1250.00,
            shipTo: "John Doe",
            items: [{
                id: 2,
                title: "Premium Slim Fit Chinos",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2026"
            }]
        },
        {
            id: 3,
            name: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
            image: [
                "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/2_2dba3960-3954-4a33-8921-52bd73113b1b.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/3_bcd67440-8c…38-b9d1-d6a6ac27ba0e.webp?v=1750849046&width=810",
            ],
            size: "L",
            quantity: 1,
            orderId: "404-1234567-8909876",
            orderDate: "23 December 2025",
            status: "3", // Added for StepBar
            price: 1250.00,
            shipTo: "John Doe",
            items: [{
                id: 3,
                title: "Premium Slim Fit Chinos",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2026"
            }]
        },
        {
            id: 4,
            name: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
            image: [
                "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/2_2dba3960-3954-4a33-8921-52bd73113b1b.webp?v=1750849046&width=810",
                "https://gentlehaus.in/cdn/shop/files/3_bcd67440-8c…38-b9d1-d6a6ac27ba0e.webp?v=1750849046&width=810",
            ],
            size: "L",
            quantity: 1,
            orderId: "404-1234567-8902468",
            orderDate: "25 December 2025",
            status: "5", // Added for StepBar
            price: 1250.00,
            shipTo: "John Doe",
            items: [{
                id: 4,
                title: "Premium Slim Fit Chinos",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2026"
            }]
        }
    ];

export const salesData = [
  { month: "Jan", total: 400 },
  { month: "Feb", total: 300 },
  { month: "Mar", total: 600 },
  { month: "Apr", total: 800 },
  { month: "May", total: 500 },
  { month: "Jun", total: 900 },
  { month: "Jul", total: 1100 },
];

export const mlmData = [
  { day: "May 1", total: 400 },
  { day: "May 8", total: 300 },
  { day: "May 15", total: 600 },
  { day: "May 22", total: 800 },
  { day: "May 29", total: 500 },
];

export const treeData = {
      name: "Alex (Root)",
      referredPersons: [
        { 
          name: "John", 
          referredPersons: [
            { name: "Sarah" }, 
            { name: "Mike" }
          ] 
        },
        { 
          name: "Mark", 
          referredPersons: [
            { name: "Ryan" }
          ] 
        }
      ]
    };




// --- ORDERS TABLE CONFIG ---
export const orderTable = (openModal) => [
  { 
    header: 'Order ID', 
    key: 'orderId', 
    render: (val) => <span className="text-blue-500 font-medium">{val}</span> 
  },
  { header: 'Buyer Name', key: 'buyerName', render: (val) => <span className="font-semibold">{val}</span> },
  { header: 'Buyer Email', key: 'email', render: (val) => <span className="font-semibold">{val}</span> },
  { header: 'Amount', key: 'orderAmount', render: (val) => `₹${Number(val).toLocaleString()}` },
  { 
    header: 'Order Status', 
    key: 'orderStatus',
    render: (val) => (
      <span className="px-2 py-1 rounded border border-gray-200 text-[10px] font-bold bg-gray-50 uppercase">
        {val || 'CREATED'}
      </span>
    )
  },
  {
    header: "Action",
    key: 'action',
    render: (_, row) => (
      <button 
        className="text-gray-400 hover:text-blue-600 transition-colors" 
        onClick={() => openModal(row)}
      >
        <Icons icon="heroicons:pencil-square-solid" size={16} />
      </button>
    )
  },
];

// Change parameter name to 'openModal' to match the calls inside
// export const orderTable = (openModal) => [
//   { 
//     header: 'Order ID', 
//     key: 'orderId', 
//     render: (val) => <span className="text-blue-500 font-medium cursor-pointer">{val}</span> 
//   },
//   { header: 'Buyer Name', key: 'buyerName', render: (val) => <span className="font-semibold">{val}</span> },
//   { header: 'Order Amount', key: 'orderAmount', render: (val) => `₹${val?.toLocaleString()}` },
//   { 
//     header: 'Payment Status', 
//     key: 'paymentStatus',
//     render: (val) => (
//       <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase ${
//           val === 'Paid' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-orange-50 border-orange-200 text-orange-600'
//       }`}>
//         {val || 'PENDING'}
//       </span>
//     )
//   },
//   { 
//     header: 'Order Status', 
//     key: 'orderStatus',
//     render: (val, row) => (
//       <div className="flex items-center gap-2">
//         <span className="px-2 py-1 rounded border border-gray-200 text-[10px] font-bold bg-gray-50 uppercase">
//           {val || 'CREATED'}
//         </span>
//       </div>
//     )
//   },
//   { 
//     header: 'Date', 
//     key: 'date',
//     render: (val) => <div className="text-xs text-gray-500">{val}</div>
//   },
//   {
//     header: "Action",
//     key: 'action',
//     render: (_, row) => (
//       <div className="flex items-center gap-3">
//         <button 
//           className="text-gray-400 hover:text-blue-600 transition-colors" 
//           onClick={() => openModal(row)}
//         >
//           <Icons icon="heroicons:pencil-square-solid" size={16} />
//         </button>
//       </div>
//     )
//   },
// ];

export const orderData = [
  { 
    orderId: 'ORD-10234', name: 'John Smith', referralCode: 'X231', sponsorId: 'X1607', 
    level: 'L1', amount: 5000, quantity: 1, paymentStatus: 'Paid', orderStatus: 'Shipped', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10233', name: 'Emma Lee', referralCode: 'W353', sponsorId: 'A1001', 
    level: 'L2', amount: 7000, quantity: 12, paymentStatus: 'Paid', orderStatus: 'Processed', 
    shipmentStatus: '', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10232', name: 'Alex Kumar', referralCode: 'V3456', sponsorId: 'B2096', 
    level: 'L1', amount: 3000, quantity: 12, paymentStatus: 'Packed', orderStatus: '', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10230', name: 'Priyia Singh', referralCode: 'F6543', sponsorId: 'B6802', 
    level: 'L2', amount: 5000, quantity: 12, paymentStatus: 'Paid', orderStatus: 'Delivered', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10229', name: 'David Clark', referralCode: 'T6643', sponsorId: 'C3003', 
    level: 'L1', amount: 5000, quantity: 12, paymentStatus: 'Packed', orderStatus: 'Delivered', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10228', name: 'Linda Wong', referralCode: 'S2625', sponsorId: 'R7389', 
    level: 'L2', amount: 7000, quantity: 12, paymentStatus: 'Paid', orderStatus: 'Pending', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10227', name: 'Michael Brown', referralCode: 'R0164', sponsorId: 'C1008', 
    level: 'L3', amount: 5000, quantity: 12, paymentStatus: 'Packed', orderStatus: '', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10226', name: 'Sara Patel', referralCode: 'R3193', sponsorId: 'Q1234', 
    level: 'L1', amount: 3500, quantity: 12, paymentStatus: 'Paid', orderStatus: 'Pending', date: '22/02/2011' 
  },
  { 
    orderId: 'ORD-10225', name: 'Chris Evans', referralCode: 'M9921', sponsorId: 'Z1122', 
    level: 'L2', amount: 4200, quantity: 5, paymentStatus: 'Paid', orderStatus: 'Shipped', date: '22/02/2012' 
  },
  { 
    orderId: 'ORD-10224', name: 'Jessica Alba', referralCode: 'A8832', sponsorId: 'K4433', 
    level: 'L1', amount: 2100, quantity: 2, paymentStatus: 'Packed', orderStatus: 'Processed', date: '22/02/2012' 
  },
  { 
    orderId: 'ORD-10223', name: 'Tom Hardy', referralCode: 'T1122', sponsorId: 'Y9988', 
    level: 'L3', amount: 9000, quantity: 15, paymentStatus: 'Paid', orderStatus: 'Delivered', date: '22/02/2013' 
  },
  { 
    orderId: 'ORD-10222', name: 'Robert Downey', referralCode: 'R5544', sponsorId: 'S3322', 
    level: 'L1', amount: 12000, quantity: 20, paymentStatus: 'Packed', orderStatus: 'Pending', date: '22/02/2013' 
  }
];

// --- PRODUCTS TABLE CONFIG ---
export const productTable = (onEdit, onDelete) => [
  { header: 'Product ID', key: 'id', render: (val) => <span className="text-blue-600 font-medium flex justify-center"># {val}</span> },
  { header: 'Product Name', key: 'name', render: (val) => <span className="font-semibold text-gray-800">{val}</span> },
  { header: 'Category', key: 'category', render: (val) => <span className="font-semibold text-gray-800">{val}</span> },
  { header: 'Price', key: 'price', render: (val) => `₹${val}` },
  { header: "Stock", key: 'stock' },
  { 
    header: 'Status', 
    key: 'stock',
    render: (val) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${val > 0 ? "bg-green-500 text-black" : "bg-red-500 text-white"}`}>
        {val > 0 ? "Available" : "Out of Stock"}
      </span>
    )
  },
  {
    header: "Action",
    key: 'action',
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <button 
          className="text-gray-400 hover:text-blue-600 transition-colors" 
          onClick={() => onEdit(row)}
          title="Edit Product"
        >
          <Icons icon="heroicons:pencil-square-solid" size={18} />
        </button>
        <button 
          className="text-gray-400 hover:text-red-600 transition-colors" 
          onClick={() => onDelete(row)}
          title="Delete Product"
        >
          <Icons icon="heroicons:trash-solid" size={18} />
        </button>
      </div>
    )
  },
];

export const productData = [
  { 
    pid: '#PRD-1023', name: 'Nutrition Starter Pack', prodCategory: 'Health', 
    price: '2,499', pv: '10', bv: '20', status: 'Low Stock', stock: 45, date: '23-04-2024' 
  },
  { 
    pid: '#PRD-1022', name: 'Nutrition Update', prodCategory: 'Supplements', 
    price: '2,499', pv: '15', bv: '30', status: 'Active', stock: 45, date: '12-02-2024' 
  },
  { 
    pid: '#PRD-1021', name: 'Daily Flypkcs', prodCategory: 'Fitness', 
    price: '4,999', pv: '25', bv: '50', status: 'Active', stock: 55, date: '12-01-2025' 
  },
  { 
    pid: '#PRD-1010', name: 'Blue Einder', prodCategory: 'Beverages', 
    price: '4,999', pv: '20', bv: '40', status: 'Active', stock: 80, date: '12-01-2025' 
  },
  { 
    pid: '#PRD-1019', name: 'Elatshiki', prodCategory: 'Wellness', 
    price: '4,999', pv: '18', bv: '36', status: 'Active', stock: 56, date: '12-01-2025' 
  },
  { 
    pid: '#PRD-1016', name: 'Promo Parsh', prodCategory: 'Health', 
    price: '2,699', pv: '12', bv: '24', status: 'Low Stock', stock: 65, date: '12-01-2025' 
  },
  { 
    pid: '#PRD-1017', name: 'Fitness Apple', prodCategory: 'Supplements', 
    price: '2,499', pv: '10', bv: '20', status: 'Active', stock: 56, date: '12-01-2025' 
  },
  { 
    pid: '#PRD-1015', name: 'Omega 3 Softgels', prodCategory: 'Supplements', 
    price: '1,299', pv: '08', bv: '16', status: 'Active', stock: 120, date: '15-01-2025' 
  },
  { 
    pid: '#PRD-1014', name: 'Whey Protein 1kg', prodCategory: 'Fitness', 
    price: '3,899', pv: '30', bv: '60', status: 'Low Stock', stock: 12, date: '18-01-2025' 
  },
  { 
    pid: '#PRD-1013', name: 'Multivitamin Tabs', prodCategory: 'Wellness', 
    price: '999', pv: '05', bv: '10', status: 'Active', stock: 200, date: '20-01-2025' 
  }
];

// User Table
export const userTable = (onEdit) => [
  { 
    header: '# Member ID', 
    key: 'id', 
    render: (val) => <span className="text-blue-600 font-medium flex justify-center"># {val}</span> 
  },
  { 
    header: 'User', 
    key: 'first_name', 
    render: (_, row) => {
      const fullName = `${row.first_name} ${row.last_name}`;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 overflow-hidden shrink-0">
            <img 
              src={`https://ui-avatars.com/api/?name=${fullName}&background=random`} 
              alt={fullName} 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 leading-none">{fullName}</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">{row.role}</span>
          </div>
        </div>
      );
    }
  },
  { header: 'Level', key: 'level' },
  { 
    header: 'Type', 
    key: 'user_type',
    render: (val) => (
      <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold uppercase">
        {val || 'General'}
      </span>
    )
  },
  { header: 'Join Date', key: 'created_at', render: (val) => val ? new Date(val).toLocaleDateString() : 'N/A' },
  {
    header: "Action",
    key: 'action',
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <button 
          className="text-gray-500 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 rounded" 
          onClick={() => onEdit(row)}
          title="Update User Permissions"
        >
          <Icons icon="heroicons:pencil-square-solid" size={18} />
        </button>
      </div>
    )
  },
];

export const userData = [
  { memberId: 'USR-1023', name: 'John Smith', downline: 34, level: 1, pv: 120, bv: 100, email: 'john@example.com', joinDate: '04/26/2024' },
  { memberId: 'USR-1022', name: 'Linda Brown', downline: 21, level: 2, pv: 90, bv: 80, email: 'linda@example.com', joinDate: '04/28/2024' },
  { memberId: 'USR-1021', name: 'Michael Lee', downline: 18, level: 2, pv: 50, bv: 40, email: 'mike@example.com', joinDate: '04/28/2024' },
  { memberId: 'USR-1020', name: 'Sarah Wilson', downline: 15, level: 3, pv: 50, bv: 40, email: 'sarah@example.com', joinDate: '04/28/2024' },
  { memberId: 'USR-1019', name: 'David Clark', downline: 5, level: 3, pv: 50, bv: 40, email: 'david@example.com', joinDate: '04/28/2024' },
  { memberId: 'USR-1018', name: 'Emma Davis', downline: 4, level: 3, pv: 40, bv: 40, email: 'emma@example.com', joinDate: '04/21/2024' },
  { memberId: 'USR-1017', name: 'Robert Miller', downline: 4, level: 3, pv: 40, bv: 40, email: 'robert@example.com', joinDate: '04/21/2024' },
  { memberId: 'USR-1016', name: 'Nancy Allen', downline: 3, level: 3, pv: 30, bv: 40, email: 'nancy@example.com', joinDate: '04/21/2024' },
  { memberId: 'USR-1015', name: 'Kevin Wright', downline: 2, level: 4, pv: 25, bv: 20, email: 'kevin@example.com', joinDate: '04/15/2024' },
  { memberId: 'USR-1014', name: 'Lisa Scott', downline: 1, level: 4, pv: 10, bv: 10, email: 'lisa@example.com', joinDate: '04/10/2024' },
];

// icon change
// --- WALLET TRANSACTIONS CONFIG ---

export const walletTable = [
  { 
    header: 'Date', 
    key: 'date',
    render: (val) => (
      <span className="text-gray-500 font-medium text-xs">
        {new Date(val).toLocaleDateString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric'
        })}
      </span>
    )
  },
  { 
    header: 'Transaction ID', 
    key: 'transactionId', // Updated from txid to match API
    render: (val) => <span className="font-bold text-[#1A1C1E]">#TXN-{val}</span>
  },
  { 
    header: 'Type', 
    key: 'type', 
    render: (val) => {
      const isCredit = val?.toLowerCase() === 'credit';
      return (
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            <Icons icon={isCredit ? "heroicons:arrow-up-right-solid" : "heroicons:arrow-down-left-solid"} size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">{val}</span>
        </div>
      );
    }
  },
  { 
    header: 'Source', 
    key: 'source', 
    render: (val) => (
      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
        {val}
      </span>
    ) 
  },
  { 
    header: 'Amount', 
    key: 'amount', 
    render: (val, row) => {
      const isCredit = row.type?.toLowerCase() === 'credit';
      return (
        <span className={`font-black text-sm ${isCredit ? 'text-emerald-600' : 'text-red-600'}`}>
          {isCredit ? '+' : '-'} ₹{val}
        </span>
      );
    }
  },
  {
    header: 'Status',
    key: 'status', 
    render: (val) => (
      <div className="bg-[#1A1C1E] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer w-fit">
        {val || 'Success'}
      </div>
    )
  }
];

export const walletData = [
  { 
    date: 'Apr 5, 2024', 
    txid: 'TXN9829', 
    type: 'MU Transfer', 
    source: 'MLM Transfer', 
    amount: '3,000', 
    status: 'View Details', 
    detailsUrl: '/transactions/9829'
  },
  { 
    date: 'Apr 3, 2024', 
    txid: 'TXN9839', 
    type: 'Bank Withdrawal', 
    source: 'Direct', 
    amount: '1,500', 
    status: 'View Details', 
    detailsUrl: '/transactions/9839' 
  },
  { 
    date: 'Apr 2, 2024', 
    txid: 'TXN9824', 
    type: 'Order Cashback', 
    source: 'System', 
    amount: '500', 
    status: 'View Details', 
    detailsUrl: "/transaction/4505"
  }
];

// Work Wallet Table
export const workWalletTable = [
  { 
    header: 'User', 
    // The API uses "userName" for the user's name
    key: 'userName', 
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 overflow-hidden border border-indigo-200">
           <img src={`https://ui-avatars.com/api/?name=${val}&background=random`} alt="avatar" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm">{val}</span>
          <span className="text-[10px] text-gray-400">ID: {row.userId}</span>
        </div>
      </div>
    )
  },
  { header: 'User ID', key: 'userId' },
  { header: 'Referral Income', key: 'referralIncome', render: (val) => `₹${val}` },
  { header: 'Level Income', key: 'levelIncome', render: (val) => `₹${val}` },
  { 
    header: 'Pending (₹)', 
    // The API field is "pendingAmount", not "pending"
    key: 'pendingAmount', 
    render: (val) => `₹${val}` 
  },
  // {
  //   header: 'Action',
  //   key: 'action', 
  //   render: (val, row) => (
  //     <div className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs flex items-center justify-center gap-1 transition-colors w-fit cursor-pointer">
  //       View
  //       <Icons icon="heroicons:chevron-down-solid" size={14} />
  //     </div>
  //   )
  // }
];

export const workWalletData = [
  { user: 'Priya Singh', userId: '5662', referralIncome: '500', levelIncome: '330', pending: '1,830', status: 'View Details', detailsUrl: '/transactions/5662' },
  { user: 'Arjun Kumar', userId: '5658', referralIncome: '250', levelIncome: '310', pending: '810', status: 'View Details', detailsUrl: '/transactions/5658' },
  { user: 'Ajay Kumar', userId: '5671', referralIncome: '150', levelIncome: '280', pending: '580', status: 'View Details', detailsUrl: '/transactions/5671' },
  { user: 'Meera Desai', userId: '5660', referralIncome: '100', levelIncome: '210', pending: '370', status: 'View Details', detailsUrl: '/transactions/5660' },
  { user: 'Ankit Sharma', userId: '5657', referralIncome: '150', levelIncome: '120', pending: '150', status: 'View Details', detailsUrl: '/transactions/5657' },
  { user: 'Sonal Verma', userId: '5702', referralIncome: '400', levelIncome: '450', pending: '1,200', status: 'View Details', detailsUrl: '/transactions/5702' },
  { user: 'Vikram Seth', userId: '5710', referralIncome: '300', levelIncome: '200', pending: '950', status: 'View Details', detailsUrl: '/transactions/5710' },
  { user: 'Deepa Roy', userId: '5715', referralIncome: '200', levelIncome: '180', pending: '440', status: 'View Details', detailsUrl: '/transactions/5715' },
  { user: 'Rahul Jain', userId: '5720', referralIncome: '600', levelIncome: '500', pending: '2,100', status: 'View Details', detailsUrl: '/transactions/5720' },
  { user: 'Sneha Kapur', userId: '5730', referralIncome: '120', levelIncome: '90', pending: '210', status: 'View Details', detailsUrl: '/transactions/5730' },
];

// Commission Table
// export const commissionTable = [
//   { 
//     header: 'User Name', 
//     key: 'user', 
//     render: (val, row) => (
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border">
//            <img src={`https://ui-avatars.com/api/?name=${val}&background=random`} alt="avatar" />
//         </div>
//         <div className="flex flex-col">
//           <span className="font-semibold text-gray-800 text-sm">{val}</span>
//           <span className="text-[10px] text-gray-400">{row.userId}</span>
//         </div>
//       </div>
//     )
//   },
//   { header: 'Order ID', key: 'orderId' },
//   { header: 'Product Name', key: 'product' },
//   { header: 'Commission Type', key: 'type' },
//   { header: 'Level', key: 'level' },
//   { header: 'Amount', key: 'amount', render: (val) => `$${val}` },
//   { 
//     header: 'Status', 
//     key: 'status',
//     render: (val) => (
//       <span className={`px-3 py-1 rounded text-[10px] font-bold ${
//         val === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
//         val === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
//       }`}>
//         {val}
//       </span>
//     )
//   },
//   {
//     header: 'Action',
//     key: 'action',
//     render: (_, row) => {
//       // PENDING STATE
//       if (row.status === 'Pending') {
//         return (
//           <div className="flex items-center gap-2">
//             <button 
//               className="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white rounded text-[10px] font-semibold hover:bg-emerald-600 transition-colors"
//               onClick={() => console.log("Approving ID:", row.orderId)}
//             >
//               <Icons icon="heroicons:user-plus-solid" size={14} /> Approve
//             </button>
//             <button 
//               className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-[10px] font-semibold hover:bg-red-600 transition-colors"
//               onClick={() => console.log("Rejecting ID:", row.orderId)}
//             >
//               <Icons icon="heroicons:user-minus-solid" size={14} /> Reject
//             </button>
//           </div>
//         );
//       }

//       // APPROVED STATE
//       if (row.status === 'Approved') {
//         return (
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase">
//               <Icons icon="heroicons:document-check-solid" size={16} />
//               <span>Result Ready</span>
//             </div>
//             {row.resultLink ? (
//               <a 
//                 href={row.resultLink} 
//                 download 
//                 className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-110 flex items-center"
//                 title="Download Statement"
//               >
//                 <Icons icon="heroicons:cloud-arrow-down-solid" size={18} />
//               </a>
//             ) : (
//               <div className="text-gray-300 flex items-center" title="Locked">
//                 <Icons icon="heroicons:lock-closed-solid" size={16} />
//               </div>
//             )}
//           </div>
//         );
//       }

//       // REJECTED STATE
//       if (row.status === 'Rejected') {
//         return (
//           <div className="flex items-center gap-1 text-red-500 font-bold text-[10px] uppercase opacity-80">
//             <Icons icon="heroicons:no-symbol-solid" size={16} />
//             <span>Rejected</span>
//           </div>
//         );
//       }

//       return <span className="text-gray-300 text-[10px]">N/A</span>;
//     }
//   }
// ];

export const commissionTable = [
  { 
    header: 'User Name', 
    key: 'userName', // Updated to match API response
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border">
           <img src={`https://ui-avatars.com/api/?name=${val}&background=random`} alt="avatar" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm">{val}</span>
          <span className="text-[10px] text-gray-400">ID: {row.id}</span>
        </div>
      </div>
    )
  },
  { header: 'Order ID', key: 'order_id' }, // Updated to match API order_id
  // { header: 'Product Name', key: 'product', render: (val) => val || 'N/A' },
  { header: 'Commission Type', key: 'type', render: (val) => val || 'Referral' },
  { header: 'Level', key: 'level' },
  { header: 'Amount', key: 'amount', render: (val) => `₹${val}` },
  { 
    header: 'Status', 
    key: 'status',
    render: (val) => {
      const status = val?.toLowerCase();
      return (
        <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${
          status === 'approved' || status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 
          status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
        }`}>
          {val}
        </span>
      );
    }
  },
  {
    header: 'Action',
    key: 'action',
    render: (_, row) => {
      const status = row.status?.toLowerCase();
      if (status === 'pending') {
        return (
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 bg-emerald-500 text-white rounded text-[10px] font-semibold hover:bg-emerald-600 transition-colors">
              Approve
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded text-[10px] font-semibold hover:bg-red-600 transition-colors">
              Reject
            </button>
          </div>
        );
      }
      return <span className="text-gray-300 text-[10px]">N/A</span>;
    }
  }
];

export const commissionData = [
  { user: 'Ravi Sharma', userId: '5671', orderId: 'ORD-9901', product: 'Fitness Tracker Pro', type: 'Direct Referral', level: 1, amount: '50', status: 'Pending', resultLink: null },
  { user: 'Priya Singh', userId: '5662', orderId: 'ORD-9902', product: 'Detox Herbal Tea', type: 'Level Income', level: 2, amount: '20', status: 'Approved', resultLink: '/reports/priya_5662.pdf' },
  { user: 'Arjun Kumar', userId: '5658', orderId: 'ORD-9903', product: 'Vitamin C Serum', type: 'Team Bonus', level: 3, amount: '15', status: 'Approved', resultLink: '/reports/arjun_5658.pdf' },
  { user: 'Meera Desai', userId: '5560', orderId: 'ORD-9904', product: 'Organic Protein Powder', type: 'Direct Referral', level: 1, amount: '50', status: 'Approved', resultLink: '/reports/meera_5560.pdf' },
  { user: 'Ankit Sharma', userId: '5691', orderId: 'ORD-9905', product: 'Wireless Earbuds X1', type: 'Level Income', level: 2, amount: '15', status: 'Approved', resultLink: '/reports/ankit_5691.pdf' },
  { user: 'Sonal Verma', userId: '5702', orderId: 'ORD-9906', product: 'Yoga Mat', type: 'Direct Referral', level: 1, amount: '30', status: 'Rejected', resultLink: null },
  { user: 'Vikram Seth', userId: '5710', orderId: 'ORD-9907', product: 'Smart Watch S2', type: 'Level Income', level: 2, amount: '25', status: 'Pending', resultLink: null },
  { user: 'Deepa Roy', userId: '5715', orderId: 'ORD-9908', product: 'Aloe Vera Juice', type: 'Team Bonus', level: 4, amount: '10', status: 'Approved', resultLink: '/reports/deepa_5715.pdf' },
  { user: 'Rahul Jain', userId: '5720', orderId: 'ORD-9909', product: 'Whey Protein 2kg', type: 'Direct Referral', level: 1, amount: '60', status: 'Pending', resultLink: null },
  { user: 'Sneha Kapur', userId: '5730', orderId: 'ORD-9910', product: 'Resistance Bands', type: 'Level Income', level: 3, amount: '12', status: 'Approved', resultLink: '/reports/sneha_5730.pdf' },
];


// Referal Table
export const referTable = [
  { 
    header: 'User ID', 
    key: 'userId',
    render: (val) => (
      <span className="font-bold">UID {val}</span>
    ),
    width: '80px' 
  },
  { 
    header: 'Referral Code', 
    key: 'referral_code', // Changed from referralCode to match your API
    render: (val) => (
      <div className="flex flex-col">
        <span className="font-bold text-slate-800">{val || '—'}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Level {0}</span>
      </div>
    )
  },
  { 
    header: 'Assigned To', 
    key: 'assignedTo',
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
          {val?.charAt(0) || '?'}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-slate-700">{val || 'Unknown'}</span>
        </div>
      </div>
    )
  },
  { 
    header: 'Level', 
    key: 'level',
    render: (val) => (
      <div className="flex flex-col">
        <span className="font-medium">Level {val}</span>
      </div>
    )
  },
  { 
    header: 'Rank', 
    key: 'rank',
    render: (val) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-600">
          {val || 'No Rank'}
        </span>
      </div>
    )
  },
  { 
    header: 'Commission', 
    key: 'commission',
    render: (val) => (
      <span className="font-bold text-slate-700">
        ₹{parseFloat(val || 0).toLocaleString('en-IN')}
      </span>
    )
  },
  { 
    header: 'Status', 
    key: 'status',
    render: (val) => {
      const colors = {
        pending: 'bg-amber-100 text-amber-700',
        active: 'bg-green-100 text-green-700',
        expired: 'bg-gray-100 text-gray-600',
      };
      return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${colors[val?.toLowerCase()] || 'bg-slate-100 text-slate-600'}`}>
          {val}
        </span>
      );
    }
  },
  // {
  //   header: 'Actions',
  //   key: 'actions',
  //   render: () => (
  //     <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
  //       <Icons icon="heroicons:ellipsis-horizontal-20-solid" size={18} />
  //     </button>
  //   )
  // }
];

export const referData = [
  {
    userId: '46034',
    referralCode: 'REF123456',
    expiryStatus: 'Active',
    assignedTo: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=1', points: '10,234' },
    usage: { current: 6, limit: 20, rankPoints: '10,234' },
    rank: { name: 'Gold', points: '10,234' },
    commission: '₹100',
    status: 'Active'
  },
  {
    userId: '024366',
    referralCode: 'SILVER1000',
    expiryStatus: 'Expired | 02:04:05:19',
    assignedTo: { name: 'Silver Bono', avatar: 'https://i.pravatar.cc/150?u=2', points: '4,660' },
    usage: { current: 61, limit: 100, rankPoints: '4,689' },
    rank: { name: 'Silver', points: '4689' },
    commission: '5%',
    status: 'Expired'
  },
  {
    userId: 'All',
    referralCode: 'GLOBALBONUS',
    expiryStatus: 'Active',
    assignedTo: { name: 'All Users', avatar: 'https://ui-avatars.com/api/?name=All+Users', points: '69,356' },
    usage: { current: 349, limit: '', rankPoints: '85,805' },
    rank: { name: '', points: '' },
    commission: '10%',
    status: 'Active'
  },
  {
    userId: '70480',
    referralCode: 'SUMMER25',
    expiryStatus: 'Expired | 02:04:08:56',
    assignedTo: { name: 'Pro', avatar: 'https://i.pravatar.cc/150?u=3', points: '0285' },
    usage: { current: 210, limit: 'Unlimited', rankPoints: '469,306' },
    rank: { name: 'Pro', points: '469,306' },
    commission: 'Flat ₹25',
    status: 'Expired'
  },
  {
    userId: '20928',
    referralCode: 'EXPIRED50',
    expiryStatus: 'Expired | 8:30:25:28',
    assignedTo: { name: 'Pro', avatar: 'https://i.pravatar.cc/150?u=4', points: '99258' },
    usage: { current: 250, limit: 250, rankPoints: '63,259' },
    rank: { name: '★250', points: '59' }, // The star badge in image
    commission: 'Flat ₹50',
    status: 'Expired'
  },
  {
    userId: '43633',
    referralCode: 'LUCKYDRAW',
    expiryStatus: 'Disabled | 3:14:14:33',
    assignedTo: { name: 'Diamond', avatar: 'https://i.pravatar.cc/150?u=5', points: '205559' },
    usage: { current: 142, limit: 500, rankPoints: '223,559' },
    rank: { name: 'Pro', points: '299,339' },
    commission: '20%',
    status: 'Disabled'
  }
];


// Refer Network Data
export const referNetworkData = {
  name: "Alex (Root)",
  image: "https://i.pravatar.cc/150?u=alex",
  referredPersons: [
    { 
      name: "John", 
      image: "https://i.pravatar.cc/150?u=john", 
      referredPersons: [
        { 
          name: "Sarah", 
          image: "https://i.pravatar.cc/150?u=sarah",
          referredPersons: [] 
        }, 
        { 
          name: "Mike", 
          image: "https://i.pravatar.cc/150?u=mike",
          referredPersons: [] 
        }
      ] 
    },
    { 
      name: "Mark", 
      image: "https://i.pravatar.cc/150?u=mark",
      referredPersons: [
        { 
          name: "Ryan", 
          image: "https://i.pravatar.cc/150?u=ryan",
          referredPersons: [] 
        }
      ] 
    }
  ]
};


// Profile Menu Icon
export const profileMenuIcon = [
    {
      title: "Your Orders",
      description: "Track, return, or buy things again",
      icon: <Icons icon="heroicons:shopping-bag" size={48} className="text-black" />,
      linkTo: "/your-order"
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders and gifts",
      icon: <Icons icon="heroicons:map-pin" size={48} className="text-black" />,
      linkTo: "/address"
    },
    {
      title: "Payment options",
      description: "Edit or add payment methods",
      icon: <Icons icon="heroicons:credit-card" size={48} className="text-black" />,
      linkTo: "/payment"
    },
    {
      title: "Reset Password",
      description: "Reset Your Password",
      icon: <Icons icon="heroicons:user-circle" size={48} className="text-black" />,
      linkTo: "/reset-password"
    },
    {
      title: "eKYC",
      description: "First complete your kyc",
      icon: <Icons icon="heroicons:user-circle" size={48} className="text-black" />,
      linkTo: "/e-kyc"
    },
    // {
    //   title: "Edit Profile",
    //   description: "Update your name, email, and personal info",
    //   icon: <Icons icon="heroicons:user-circle" size={48} className="text-black" />,
    //   linkTo: "/edit-profile"
    // }
  ];

// Nav Wallet and Profile Detail
  export const normalWalletDetail = {
    commission: {
      title: "Order & Commission Summary",
      balance: 1250,
      pending: 450,
      paid: 800,
      totalEarned: 2500,
      status: "2",
    },
    normalWallet: {
      title: "Normal Wallet",
      stats: [
        { label: "Current Balance", value: 3200.50, icon: <Icons icon="heroicons:wallet-solid" size={20} /> },
        { label: "Pending Payout", value: 150.00, icon: <Icons icon="solar:clock-circle-outline" size={20} /> },
        { label: "Total Paid", value: 3050.50, icon:<Icons icon="solar:check-circle-bold" size={20} />},
      ]
    }
  };


  // Heirachy mgt data
//  export const hierachyTable = [
//   { 
//     header: 'Level', 
//     key: 'level', 
//     width: '60px',
//     render: (val) => <span className="font-bold text-slate-700 text-sm">{val}</span>
//   },
//   { 
//     header: 'Member', 
//     key: 'member',
//     width: '180px',
//     render: (member) => (
//       <div className="flex items-center gap-2">
//         <img src={member.avatar} alt="" className="w-9 h-9 rounded-full border border-gray-100 shrink-0" />
//         <div className="min-w-0">
//           <p className="font-bold text-slate-900 text-xs truncate">{member.name}</p>
//           <p className="text-[10px] text-slate-400">{member.id}</p>
//         </div>
//       </div>
//     )
//   },
//   { 
//     header: 'Direct Members (5/5)', 
//     key: 'directMembers',
//     render: (members, row) => ( // Use the second argument 'row' to access confirmedMembers
//       <div className="grid grid-cols-2 gap-x-8 gap-y-1 py-1 border-l border-r border-gray-100 px-4 min-w-[450px]">
//         {/* Left Side: Uses the 'members' key (directMembers) */}
//         <div className="space-y-1">
//           {members?.map((m, idx) => (
//             <div key={idx} className="flex items-center gap-2">
//               <span className="text-slate-300 text-[10px] w-3">{idx + 1}</span>
//               <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] shrink-0 font-bold">
//                 {idx + 1}
//               </span>
//               <span className="text-blue-800 font-semibold text-[11px] truncate">{m.name}</span>
//               <span className="text-slate-400 text-[10px]">{m.id}</span>
//             </div>
//           ))}
//         </div>

//         {/* Right Side: CORRECTED to use 'row.confirmedMembers' */}
//         <div className="space-y-1">
//           {row.confirmedMembers?.map((cm, idx) => (
//             <div key={idx} className="flex items-center gap-2">
//               <div className="bg-green-100 text-green-600 rounded p-0.5 shrink-0">
//                  <Icons icon="heroicons:check-badge-solid" size={14} />
//               </div>
//               <span className="text-slate-600 font-medium text-[11px] truncate">{cm.name}</span>
//               <span className="text-slate-400 text-[10px]">{cm.id}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   },
//   { 
//     header: 'New Chain', 
//     key: 'isChainComplete',
//     width: '120px',
//     render: (isComplete) => (
//       <div className="flex items-center justify-center">
//         {isComplete ? (
//           <div className="w-7 h-7 bg-green-500 text-white rounded shadow-sm flex items-center justify-center">
//             <Icons icon="heroicons:check-solid" size={18} />
//           </div>
//         ) : (
//           <button className="group flex items-center gap-1.5 px-3 py-1.5 bg-white text-orange-500 border border-orange-200 rounded-md hover:bg-orange-50 transition-all shadow-sm">
//              <Icons icon="heroicons:bolt-solid" size={14} className="text-orange-400" />
//              <span className="text-[10px] font-bold uppercase tracking-wide">New Chain +5</span>
//              <Icons icon="heroicons:chevron-right-solid" size={10} className="text-slate-300 group-hover:translate-x-0.5 transition-transform" />
//           </button>
//         )}
//       </div>
//     )
//   },
// ];

// Inside your Constants.jsx or where hierachyTable is defined
export const hierachyTable = [
  { 
    header: 'Level', 
    key: 'level', 
    width: '60px',
    render: (val) => <span className="font-bold text-slate-700 text-sm">{val}</span>
  },
 { 
  header: 'Member', 
  key: 'member', 
  width: '180px',
  render: (member) => (
    <div className="flex items-center gap-3">
      {/* Reduced size to w-7 h-7 and added rounded-md for a smaller, sharper icon */}
      <img 
        src={`https://ui-avatars.com/api/?name=${member.name}&background=random&bold=true`} 
        alt={member.name} 
        className="w-7 h-7 rounded-md shadow-sm shrink-0 object-cover"
      />
      <div className="min-w-0">
        <p className="font-bold text-slate-900 text-[11px] truncate leading-none mb-1">
          {member.name}
        </p>
        <p className="text-[9px] text-slate-400 font-mono uppercase tracking-tighter">
          {member.id}
        </p>
      </div>
    </div>
  )
},
  { 
    header: 'Direct Members (Progress)', 
    key: 'directMembers',
    render: (members, row) => (
      <div className="grid grid-cols-2 gap-x-8 gap-y-1 py-1 border-l border-r border-gray-100 px-4 min-w-[450px]">
        {/* Left Side: Direct Members */}
        <div className="space-y-1">
          {members?.length > 0 ? members.map((m, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] shrink-0 font-bold">
                {idx + 1}
              </span>
              <span className="text-blue-800 font-semibold text-[11px] truncate">{m.name}</span>
              <span className="text-slate-400 text-[9px] font-mono">{m.id}</span>
            </div>
          )) : <span className="text-slate-300 text-[10px] italic">No members yet</span>}
        </div>

        {/* Right Side: Confirmed/Active Status */}
        <div className="space-y-1">
          {row.confirmedMembers?.map((cm, idx) => (
            <div key={idx} className="flex items-center gap-2">
               <div className="text-green-500 shrink-0">
                 <Icons icon="heroicons:check-badge-solid" size={14} />
               </div>
               <span className="text-slate-600 font-medium text-[11px] truncate">{cm.name}</span>
               <span className="text-slate-400 text-[9px] font-mono">{cm.id}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  { 
    header: 'Chain Status', 
    key: 'isChainComplete',
    width: '120px',
    render: (isComplete) => (
      <div className="flex items-center justify-center">
        {isComplete ? (
          <div className="w-7 h-7 bg-green-500 text-white rounded shadow-sm flex items-center justify-center">
            <Icons icon="heroicons:check-solid" size={18} />
          </div>
        ) : (
          <button className="group flex items-center gap-1.5 px-3 py-1.5 bg-white text-orange-500 border border-orange-200 rounded-md hover:bg-orange-50 transition-all shadow-sm">
             <Icons icon="heroicons:bolt-solid" size={14} className="text-orange-400" />
             <span className="text-[10px] font-bold uppercase tracking-wide">Pending</span>
          </button>
        )}
      </div>
    )
  },
];

export const hierachyData = [
  {
    level: 1,
    member: { name: 'John Doe', id: '#10234', avatar: 'https://i.pravatar.cc/150?u=1' },
    directMembers: [
      { id: '#20657', name: 'Sara Patel' },
      { id: '#18345', name: 'Tom Smith' },
      { id: '#20267', name: 'Lisa Wong' },
      { id: '#25031', name: 'Brian Adams' },
    ],
    confirmedMembers: [
       { id: '#10234', name: 'John Doe' }
    ],
    isChainComplete: true,
  },
  {
    level: 2,
    member: { name: 'Sara Patel', id: '#20657', avatar: 'https://i.pravatar.cc/150?u=2' },
    directMembers: [
      { id: '#30045', name: 'Ajay Mehta' },
      { id: '#28192', name: 'David Lee' },
      { id: '#30468', name: 'Rachel Fisher' },
      { id: '#29106', name: 'Eva Malik' },
    ],
    confirmedMembers: [
      { id: '#30045', name: 'Ajja, Mehta' },
      { id: '#28192', name: 'David Lee' },
      { id: '#30468', name: 'Rachel Fisher' },
      { id: '#29106', name: 'Eva Malik' },
    ],
    isChainComplete: false,
  }
];


export const pieReportData = [
  { name: 'Level 1', value: 40, color: '#3B82F6' },
  { name: 'Level 2', value: 10, color: '#FBBF24' },
  { name: 'Level 3', value: 10, color: '#F87171' },
  { name: 'Level 4', value: 15, color: '#34D399' },
  { name: 'Level 5', value: 25, color: '#6366F1' }
]

// --- Updated Table Configuration (Using 'render' as per your reference) ---
export const rankTable = [
  {
    header: "ID",
    key: "id",
    render: (val) => <span className="font-bold text-gray-500">#{val}</span>
  },
  {
    header: "Rank Name",
    key: "rank",
    render: (val) => <span className="font-black uppercase text-gray-800">{val || "N/A"}</span>
  },
  {
    header: "Min. Referrals",
    key: "referral_count",
    render: (val) => <span className="font-bold">{val ?? 0}</span>
  },
  {
  header: "Total Commission",
  key: "total_commission",
    render: (val) => {
      const num = parseFloat(val);
      return <span className="text-green-600 font-bold">₹{isNaN(num) ? "0" : num.toLocaleString('en-IN')}</span>
    }
  }
];