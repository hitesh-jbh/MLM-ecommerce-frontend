import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

// UI Components
import UserProfile from "./UserProfile";
import Wallet from "../../components/ui/Wallet";
import LineChart from "../../components/partials/widget/chart/LineChart";
import HierachyGraph from '../../components/partials/widget/chart/HierachyGraph';

// Logic & Data
import { getProfile, getWallet } from "../../utils/service/apiService";
import { fetcher } from "../../utils/Api/axiosInstance";
import { loginSuccess, logout } from "../../utils/Slice/authSlice";
import { salesData } from "../../utils/Constants";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  // Determine Role - adjusting "customer" string to match your backend's naming convention
  const isCustomer = user?.role === "customer";

  // SWR for Referral Tree (Refreshes every 60s)
  const { data: referralTreeData, isValidating: isTreeValidating } = useSWR(
    token ? ["/api/referral", token] : null, 
    ([url, t]) => fetcher(url, t),
    { refreshInterval: 60000 }
  );

  // SWR for Wallet Balance (Only fetches if user is a customer)
  const { data: walletRes, isValidating: isWalletValidating } = useSWR(
    (token && isCustomer) ? ["/api/wallet", token] : null,
    ([_, tkn]) => getWallet(tkn).then(res => res.data),
    { refreshInterval: 15000 }
  );

  // Initial Sync: Ensures Redux has the latest user data on mount
  useEffect(() => {
    const syncProfile = async () => {
      const activeToken = token || localStorage.getItem("token");
      if (!activeToken) { 
        navigate("/login"); 
        return; 
      }

      try {
        const profRes = await getProfile(activeToken);
        const userData = profRes.data.user || profRes.data;
        dispatch(loginSuccess({ user: userData, token: activeToken }));
      } catch (err) {
        if (err.response?.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      }
    };
    
    if (!user) syncProfile();
  }, [token, dispatch, navigate, user]);

  // Global Loading State
  if (!user && !referralTreeData) return (
    <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
      <div className="text-gray-500 font-black uppercase tracking-tighter animate-pulse">
        Syncing Secure Data...
      </div>
    </div>
  );

  return (
    <div className="bg-[#F9F9F9] text-black min-h-screen p-4 md:p-8">
      {/* Header Profile Section */}
      <section className="mb-10">
        <UserProfile user={user} />
      </section>

      {/* Main Analytics Grid */}
      <div className={`grid grid-cols-1 ${isCustomer ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-10 mb-10`}>
        
        {/* Performance Analytics */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Performance Analytics
          </h2>
          <div className="h-[300px] w-full">
            <LineChart data={salesData} xKey="month" yKey="total" lineColor="#000" />
          </div>
        </div>

        {/* Referral Network */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Referral Network
            </h2>
            {isTreeValidating && (
              <span className="text-[10px] text-gray-400 animate-pulse font-mono">SYNCING...</span>
            )}
          </div>
          <div className="h-[300px] w-full">
            {referralTreeData ? (
              <HierachyGraph data={referralTreeData} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300 text-xs font-bold uppercase">
                Loading Network...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Financial Overview - CUSTOMER ONLY */}
      {isCustomer && (
        <section className="bg-white border border-gray-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Financial Overview
            </h2>
            {isWalletValidating && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold">LIVE</span>
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping"></div>
              </div>
            )}
          </div>
          <Wallet balance={walletRes?.balance || user?.walletBalance || 0} />
        </section>
      )}
    </div>
  );
};

export default Profile;