import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// UI Components
import UserProfile from "./UserProfile";
import Wallet from "../../components/ui/Wallet";
import LineChart from "../../components/partials/widget/chart/LineChart";
import HierachyGraph from '../../components/partials/widget/chart/HierachyGraph';

// Logic & Data
import { getProfile } from "../../utils/Service/apiService";
import { loginSuccess, logout } from "../../utils/Slice/authSlice";
import { salesData, treeData } from "../../utils/Constants";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchFreshProfile = async () => {
  //     // Check local storage if Redux token is gone (on refresh)
  //     const activeToken = token || localStorage.getItem("token");

  //     if (activeToken) {
  //       try {
  //         // Identify user by matching the token to the DB ID
  //         const response = await getProfile(activeToken);
          
  //         dispatch(loginSuccess({
  //           user: response.data, // Data directly from your 'users' table
  //           token: activeToken
  //         }));
  //       } catch (error) {
  //         console.error("Session expired");
  //         localStorage.removeItem("token");
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       setLoading(false);
  //     }
  //   };
  //   console.log(user);

  //   fetchFreshProfile();
  // }, [token, dispatch]);

  // if (loading) return <div>Syncing with Database...</div>;
  // if (!user) return navigate("/login");

  useEffect(() => {
    const fetchFreshProfile = async () => {
      const activeToken = token || localStorage.getItem("token");

      if (activeToken) {
        try {
          const response = await getProfile(activeToken);
          dispatch(loginSuccess({
            user: response.data, 
            token: activeToken
          }));
        } catch (error) {
          // Only log out if the token is actually invalid (401/403)
          if (error.response?.status === 401 || error.response?.status === 403) {
            console.error("Session expired");
            localStorage.removeItem("token");
            dispatch(logout());
          } else {
            console.error("Server Error (500):", error.message);
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

  // Handle navigation inside a useEffect or after loading
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Syncing with Database...</div>;
  if (!user) return null;

  return (
    <div className="bg-[#F9F9F9] text-black">
      
      {/* HEADER SECTION: Displays User Identity found by Token */}
      <section className="animate-in fade-in duration-700">
        <UserProfile user={user} />
      </section>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Sales/Earnings Analytics */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Performance Analytics
          </h2>
          <div className="h-[300px] w-full">
            <LineChart data={salesData} xKey="month" yKey="total" lineColor="#000" />
          </div>
        </div>

        {/* Network Hierarchy */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Referral Network
          </h2>
          <div className="h-[300px] w-full">
            <HierachyGraph data={treeData} />
          </div>
        </div>
      </div>

      {/* FINANCIAL SECTION */}
      <section className="bg-white border border-gray-100 p-8 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
          Account Balance
        </h2>
        <Wallet balance={user.walletBalance || 0} />
      </section>

    </div>
  );
};

export default Profile;