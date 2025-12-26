import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../ui/BreadCrumb";
import { Package, CheckCircle } from "lucide-react";

export default function OrderHistory() {
  const orders = useSelector((state) => state.order.orderHistory);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-medium mb-4">No orders yet</h2>
        <Link to="/" className="bg-black text-white px-6 py-2 rounded-md">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb 
          title="Order History" 
          showTitle={true} 
          align="center"
          items={[{ label: "Profile", href: "/profile" }, { label: "Orders" }]}
        />

        <div className="mt-8 space-y-8">
          {orders.map((order) => (
            <div key={order.id || Math.random()} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Header with Safety Checks */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Order Placed</p>
                    <p className="text-sm font-medium">{order.date ?? "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Total Amount</p>
                    <p className="text-sm font-bold text-black">
                      {/* Fixes the NaN error by ensuring it's a number */}
                      ₹ {Number(order.totalAmount || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Order ID</p>
                  <p className="text-sm font-mono text-gray-600">
                    {/* Fixes the split error by checking if ID exists first */}
                    #{order.id?.includes('-') ? order.id.split('-')[1] : "XXXX"}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-6 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Confirmed</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="py-4 flex gap-6 first:pt-0 last:pb-0">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg bg-gray-50" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold mt-3">₹ {Number(item.price || 0).toFixed(2)}</p>
                      </div>
                      <Link to={`/product/${item.id}`} className="self-center px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-black hover:text-white transition-all">
                        Buy it again
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}