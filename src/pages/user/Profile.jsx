import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

// UI Components
import UserProfile from "./UserProfile";
import Wallet from "../../components/ui/Wallet";
import LineChart from "../../components/partials/widget/chart/LineChart";
import HierachyGraph from '../../components/partials/widget/chart/HierachyGraph';
import Icons from "../../components/ui/Icon";

// Logic & Data
import { 
  getProfile, 
  getWallet, 
  performanceAnalytics,
  userDashboardStats // Ensure this is imported
} from "../../utils/service/apiService";
import { fetcher } from "../../utils/api/axiosInstance";
import { loginSuccess, logout } from "../../utils/slice/authSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const isCustomer = user?.role === "customer";

  // SWR for Performance Analytics
  const { data: performanceData, isValidating: isPerfLoading } = useSWR(
    token ? ["/api/user/performance-analytics", token] : null,
    ([_, tkn]) => performanceAnalytics(tkn).then(res => res.data),
    { revalidateOnFocus: false }
  );

  // SWR for Dashboard Stats - THIS DATA FLOWS TO USERPROFILE
  const { data: dashStats, isValidating: isStatsLoading } = useSWR(
    token ? ["/api/user/dashboard-stats", token] : null,
    ([_, tkn]) => userDashboardStats(tkn).then(res => res.data),
    { refreshInterval: 30000 }
  );

  // SWR for Referral Tree
  const { data: referralTreeData, isValidating: isTreeValidating } = useSWR(
    token ? ["/api/referral", token] : null, 
    ([url, t]) => fetcher(url, t),
    { refreshInterval: 60000 }
  );

  // SWR for Wallet Balance
  const { data: walletRes, isValidating: isWalletValidating } = useSWR(
    (token && isCustomer) ? ["/api/wallet", token] : null,
    ([_, tkn]) => getWallet(tkn).then(res => res.data),
    { refreshInterval: 15000 }
  );

  useEffect(() => {
    const syncProfile = async () => {
      if (!token) { navigate("/login"); return; }
      try {
        const profRes = await getProfile(token);
        const userData = profRes.data?.user || profRes.data;
        dispatch(loginSuccess({ user: userData, token }));
      } catch (err) {
        if (err.response?.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      }
    };
    syncProfile();
  }, [token, dispatch, navigate]);

  if (!user) return (
    <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
      <div className="text-gray-500 font-black uppercase tracking-tighter animate-pulse">
        Syncing Secure Data...
      </div>
    </div>
  );

  return (
    <div className="bg-[#F9F9F9] text-black min-h-screen p-4 md:p-8">
      <section className="mb-10">
        {/* PASS DASHBOARD STATS DOWN HERE */}
        <UserProfile 
          user={user} 
          stats={dashStats?.data} 
          loading={isStatsLoading} 
        />
      </section>

      <div className={`grid grid-cols-1 ${isCustomer ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-10 mb-10`}>
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Performance Analytics
            </h2>
            {isPerfLoading && (
              <Icons icon="solar:refresh-linear" size={14} className="animate-spin text-gray-300" />
            )}
          </div>
          
          <div className="h-[300px] w-full flex flex-col items-center justify-center">
            {/* Check for data existence and length */}
            {performanceData?.chartData && performanceData.chartData.length > 0 ? (
              <LineChart 
                data={performanceData.chartData} 
                xKey="month" 
                yKey="total" 
                lineColor="#000" 
              />
            ) : (
              /* ENHANCED FALLBACK UI */
              <div className="text-center group">
                <div className="mb-4 flex justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                  {/* A simple placeholder visual for a chart */}
                  <Icons icon="solar:chart-2-bold-duotone" size={48} className="text-gray-400" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  No Analytics Available
                </p>
                <p className="text-[9px] text-gray-300 uppercase mt-1">
                  Activity data will appear here once recorded
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-8 shadow-sm relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Referral Network</h2>
            {isTreeValidating && <span className="text-[10px] text-gray-400 animate-pulse font-mono uppercase">Syncing Node...</span>}
          </div>
          <div className="h-[300px] w-full">
            {referralTreeData ? (
              <HierachyGraph data={referralTreeData} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300 text-[10px] font-black uppercase tracking-widest">Mapping Network...</div>
            )}
          </div>
        </div>
      </div>

      {isCustomer && (
        <section className="bg-white border border-gray-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Financial Overview</h2>
            {isWalletValidating && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase">Live</span>
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
