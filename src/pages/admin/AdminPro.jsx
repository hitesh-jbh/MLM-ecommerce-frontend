import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// UI Components
import UserProfile from "../user/UserProfile";
import Wallet from "../../components/ui/Wallet";
import LineChart from "../../components/partials/widget/chart/LineChart";
import HierachyGraph from '../../components/partials/widget/chart/HierachyGraph';

// Logic & Data
import { getProfile } from "../../utils/service/apiService";
import { loginSuccess, logout } from "../../utils/slice/authSlice";
import { salesData, treeData } from "../../utils/Constants";

const AdminPro = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreshProfile = async () => {
      const activeToken = token || localStorage.getItem("token");
      if (activeToken) {
        try {
          const response = await getProfile(activeToken);
          dispatch(loginSuccess({ user: response.data, token: activeToken }));
        } catch (error) {
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
            dispatch(logout());
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchFreshProfile();
  }, [token, dispatch]);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  if (loading) return <div className="p-10 text-center font-medium">Syncing with Database...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black p-2 md:p-2 lg:p-2 space-y-10">
      
      {/* HEADER SECTION */}
      <section className="animate-in fade-in duration-700">
        <UserProfile user={user} />
      </section>

      {/* DASHBOARD GRID - Stacked vertically for better visibility */}
      <div className="flex flex-col gap-8 md:gap-10">
        
        {/* Performance Analytics - Full Width */}
        <div className="bg-white border border-gray-100 p-6 md:p-8 shadow-sm rounded-xl">
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Performance Analytics
          </h2>
          <div className="h-[300px] md:h-[300px] w-full">
            <LineChart data={salesData} xKey="month" yKey="total" lineColor="#000" />
          </div>
        </div>

        {/* Network Hierarchy - Full Width */}
        <div className="bg-white border border-gray-100 p-6 md:p-8 shadow-sm rounded-xl overflow-hidden">
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Referral Network
          </h2>
          <div className="h-[300px] md:h-[300px] w-full">
            <HierachyGraph data={treeData} />
          </div>
        </div>
      </div>

      {/* FINANCIAL SECTION */}
      <section className="bg-white border border-gray-100 p-8 shadow-sm rounded-xl">
        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
          Account Balance
        </h2>
        <Wallet balance={user.walletBalance || 0} />
      </section>

    </div>
  );
};

export default AdminPro;