import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../utils/slice/authSlice";
import api from "../../../utils/api/axiosInstance.js";
import logoImg from "../../../assets/Images/Dirora_logo.png";

import {
  viewAllProducts,
  viewCartItem,
  userNotification,
  adminNotification,
  markRead,
  markAllRead,
  viewNotification,
} from "../../../utils/service/apiService";
import Icons from "../../ui/Icon";
import { useQuery } from "@tanstack/react-query";
import Card3Modi from "../../ui/Card3Modi";
import { CheckCheck, Loader2, X, ChevronDown } from "lucide-react";

export default function Nav() {
  // Rank Configurations
  const RANK_CONFIG = {
    gold: { icon: "solar:medal-ribbon-bold", color: "text-yellow-600" },
    silver: { icon: "solar:medal-star-bold", color: "text-gray-400" },
    premium: { icon: "solar:star-bold", color: "text-dirora-purple" },
    default: { icon: "solar:user-bold", color: "text-gray-400" },
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // States for Detail Modal
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const searchRef = useRef(null);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth?.token);

  const isAdmin = user?.role === "super_admin" || user?.role === "admin";
  const isCustomer = user?.role === "user" || !isAdmin;

  const USE_MOCK_DATA = true;

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/api/categories");
      return res.data.data || res.data || [];
    },
  });

  const activeCategories = useMemo(() => {
    return categories;
  }, [categories]);

  // --- NOTIFICATION LOGIC ---
  const { data: notifications = [], refetch: refreshNotifications } = useQuery({
    queryKey: ["notifications", token, isAdmin],
    queryFn: async () => {
      const res = isAdmin
        ? await adminNotification(token)
        : await userNotification(token);
      return res.data?.data || res.data?.notifications || res.data || [];
    },
    enabled: !!(token && isLoggedIn),
    refetchOnWindowFocus: true,
  });

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const isUnread = (n) =>
    n.is_read === 0 || n.status === "unread" || n.status === "pending";
  const pendingNotifications = safeNotifications.filter(isUnread);

  const handleViewDetails = async (notifId) => {
    setIsModalLoading(true);
    try {
      const res = await viewNotification(token, notifId);
      setSelectedNotif(res.data?.data || res.data);
      refreshNotifications();
    } catch (error) {
      toast.error(error, "Failed to load details");
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleMarkRead = async (notifId) => {
    try {
      await markRead(token, notifId);
      refreshNotifications();
    } catch (error) {
      toast.error(error, "Failed to mark as read");
    }
  };

  const handleMarkAllRead = async () => {
    if (pendingNotifications.length === 0) return;
    setIsActionLoading(true);
    try {
      await markAllRead(token);
      await refreshNotifications();
      toast.success(isAdmin ? "Admin alerts cleared" : "Notifications cleared");
    } catch (error) {
      toast.error(error, "Failed to update");
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- CART & SEARCH ---
  const { data: cartData } = useQuery({
    queryKey: ["cart", token],
    queryFn: async () => {
      const res = await viewCartItem(token);
      return res.data;
    },
    enabled: !!token,
  });
  const cartItemsLength = cartData?.data?.items?.length || 0;

  const { data: allProducts = [] } = useQuery({
    queryKey: ["products-all"],
    queryFn: async () => {
      const res = await viewAllProducts();
      return res.data?.products || res.data || [];
    },
  });

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter((p) =>
      [p.name, p.category, p.brand].some((f) =>
        f?.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target))
        setIsProfileMenuOpen(false);
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      )
        setIsNotificationOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  if (
    location.pathname === "/profile" ||
    location.pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <div
      ref={searchRef}
      className="sticky top-0 z-[100] w-full bg-dirora-ivory shadow-sm"
    >
      <ToastContainer position="bottom-right" autoClose={2000} theme="light" />

      {/* NOTIFICATION DETAIL MODAL */}
      {/* ... (Modal Code Same) ... */}
      {selectedNotif && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-dirora-purple">
                Notification Detail
              </span>
              <button
                onClick={() => setSelectedNotif(null)}
                className="hover:rotate-90 transition-transform text-dirora-dark"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-xl font-serif font-bold mb-4 uppercase tracking-tight text-dirora-dark">
                {selectedNotif.title}
              </h2>
              <div className="bg-gray-50 p-5 border border-gray-100 rounded-sm mb-6">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedNotif.message}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Received:{" "}
                  {new Date(
                    selectedNotif.created_at || selectedNotif.createdAt,
                  ).toLocaleString()}
                </p>
                <button
                  onClick={() => setSelectedNotif(null)}
                  className="px-8 py-2.5 bg-dirora-purple text-white text-[10px] font-black uppercase tracking-widest hover:bg-opacity-90 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION SIDEBAR */}
      {/* ... (Sidebar Code Same) ... */}
      <div
        className={`fixed inset-0 bg-black/20 z-[200] transition-opacity duration-300 ${isNotificationOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          ref={notificationRef}
          className={`absolute right-0 top-0 h-screen w-full max-w-[360px] bg-white shadow-2xl transform transition-transform duration-300 ${isNotificationOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-dirora-dark">
                  {isAdmin ? "Admin Alerts" : "Notifications"}
                </h2>
                {pendingNotifications.length > 0 && (
                  <p className="text-[10px] font-bold text-dirora-purple uppercase mt-1">
                    {pendingNotifications.length} New
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="hover:rotate-90 transition-transform text-dirora-dark"
              >
                <Icons icon="solar:close-circle-linear" size={24} />
              </button>
            </div>

            {safeNotifications.length > 0 && (
              <div className="px-6 py-2 border-b bg-gray-50 flex justify-end">
                <button
                  onClick={handleMarkAllRead}
                  disabled={
                    isActionLoading || pendingNotifications.length === 0
                  }
                  className="text-[10px] font-bold uppercase text-dirora-purple disabled:opacity-50 flex items-center gap-1"
                >
                  {isActionLoading ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <CheckCheck size={14} />
                  )}
                  Mark all read
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {safeNotifications.length > 0 ? (
                safeNotifications.map((notif) => (
                  <div
                    key={notif.id || notif._id}
                    onClick={() => handleViewDetails(notif.id || notif._id)}
                    className={`p-4 rounded border cursor-pointer transition-all hover:border-dirora-purple/30 ${isUnread(notif) ? "bg-white border-dirora-purple/20 shadow-sm" : "bg-gray-50 opacity-60 border-transparent"}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p
                          className={`text-xs font-bold mb-1 ${isUnread(notif) ? "text-dirora-dark" : "text-gray-500"}`}
                        >
                          {notif.title}
                        </p>
                        <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                          {notif.message}
                        </p>
                      </div>
                      {isUnread(notif) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(notif.id || notif._id);
                          }}
                          className="text-[9px] font-black text-dirora-purple uppercase"
                        >
                          Read
                        </button>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[9px] text-gray-400 font-bold uppercase">
                        {notif.created_at || notif.createdAt
                          ? new Date(
                              notif.created_at || notif.createdAt,
                            ).toLocaleDateString()
                          : "Recent"}
                      </p>
                      {isModalLoading && (
                        <Loader2
                          size={10}
                          className="animate-spin text-dirora-purple"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <Icons
                    icon="solar:bell-bing-bold"
                    size={48}
                    className="text-dirora-dark"
                  />
                  <p className="text-[10px] font-black uppercase mt-2 text-dirora-dark">
                    Inbox Empty
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NAV CONTENT */}
      {/* NAV CONTENT (अब कम चौड़ा और लोगो लेफ्ट के करीब है) */}
      {/* 🚨 बदलाव: py-4 को py-2 किया (हाइट कम करने के लिए), और lg:px-16 को lg:px-4 किया (लोगो को लेफ्ट खिसकाने के लिए) */}
      <nav className="border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-1 md:py-0.5 bg-dirora-ivory relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          
          {/* DIRORA LOGO & HAMBURGER (Left Side) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-dirora-dark hover:text-dirora-purple focus:outline-none"
            >
              <Icons 
                icon={isMobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} 
                size={26} 
              />
            </button>

            {/* Logo */}
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer shrink-0"
            >
              <img
                src={logoImg}
                alt="Dirora.in"
                // 🚨 बदलाव: लोगो की हाइट h-[75px] से घटाकर h-[50px] या h-[55px] कर दी
                className="h-7 sm:h-9 md:h-[50px] w-auto object-contain transition-all duration-300" 
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div style={{ display: "none" }} className="items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-dirora-purple rounded flex items-center justify-center text-white font-black text-sm">
                  D
                </div>
              </div>
            </span>
          </div>

          {/* ... इसके नीचे का Desktop Menu और Right Actions वाला कोड सेम रहेगा ... */}

          {/* DYNAMIC CATEGORY MENU (HIDDEN ON MOBILE) */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-serif uppercase tracking-widest text-dirora-dark">
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-dirora-purple transition-colors duration-300"
            >
              Home
            </span>

            {isCategoriesLoading ? (
              <div className="flex gap-6">
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : (
              activeCategories.map((cat) => (
                <div key={cat.id} className="relative group py-4">
                  <span
                    onClick={() => navigate(`/collections/${cat.slug}`)}
                    className="flex items-center gap-1 cursor-pointer hover:text-dirora-purple transition-colors duration-300"
                  >
                    {cat.name}
                    {cat.subCategories && cat.subCategories.length > 0 && (
                      <ChevronDown
                        size={14}
                        className="group-hover:rotate-180 transition-transform duration-300"
                      />
                    )}
                  </span>

                  {cat.subCategories && cat.subCategories.length > 0 && (
                    <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white border border-gray-100 shadow-xl rounded-sm min-w-[200px] py-2 z-50">
                      {cat.subCategories.map((sub) => (
                        <span
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/collections/${cat.slug}/${sub.slug}`);
                          }}
                          className="px-6 py-3 text-xs font-sans tracking-wide text-gray-700 hover:text-dirora-purple hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}

            <span
              onClick={() => navigate("/sale")}
              className="cursor-pointer text-red-600 font-bold hover:text-red-700 transition-colors duration-300"
            >
              Sale
            </span>

            <span
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-dirora-purple transition-colors duration-300"
            >
              About
            </span>
          </div>

          {/* RIGHT ACTIONS (Ab mobile par bhi dikhenge, gap thoda adjust kiya) */}
          <div className="flex items-center gap-3 sm:gap-6 text-dirora-dark">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-dirora-purple hover:scale-110 transition-all"
            >
              <Icons icon="solar:magnifer-linear" size={24} />
            </button>

            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative hover:text-dirora-purple hover:scale-110 transition-all"
            >
              <Icons icon="solar:bell-linear" size={24} />
              {pendingNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-dirora-purple text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-dirora-ivory">
                  {pendingNotifications.length}
                </span>
              )}
            </button>

            {/* PROFILE DROPDOWN - Ab Mobile aur Desktop dono par chalega */}
            <div
              className="relative py-2"
              ref={profileMenuRef}
              onMouseEnter={() => setIsProfileMenuOpen(true)}
              onMouseLeave={() => setIsProfileMenuOpen(false)}
            >
              {isLoggedIn && user ? (
                <>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="p-1 focus:outline-none"
                  >
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-dirora-purple p-0.5 bg-white overflow-hidden hover:scale-105 transition">
                      {user.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Icons
                          icon="solar:user-bold"
                          size={18}
                          className="text-dirora-purple mx-auto mt-0.5 md:mt-1"
                        />
                      )}
                    </div>
                  </button>

                  <div
                    className={`absolute top-full right-0 mt-1 ${isProfileMenuOpen ? "flex" : "hidden"} flex-col bg-white border border-gray-100 shadow-2xl rounded-sm p-5 min-w-[220px] md:min-w-[260px] z-[120]`}
                  >
                    <div className="mb-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">
                        Account
                      </p>
                      <p className="text-dirora-dark font-serif font-bold text-sm truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider ${RANK_CONFIG[user.rank?.toLowerCase()]?.color || RANK_CONFIG.default.color}`}
                        >
                          {user.rank || "Member"}
                        </span>
                        <Icons
                          icon={
                            RANK_CONFIG[user.rank?.toLowerCase()]?.icon ||
                            RANK_CONFIG.default.icon
                          }
                          className={
                            RANK_CONFIG[user.rank?.toLowerCase()]?.color ||
                            RANK_CONFIG.default.color
                          }
                          size={14}
                        />
                      </div>
                      <p className="text-gray-500 text-xs truncate mt-2">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-1 border-t border-gray-100 pt-3">
                      {isAdmin && (
                        <span
                          onClick={() => {
                            navigate("/admin/dashboard");
                            setIsProfileMenuOpen(false);
                          }}
                          className="cursor-pointer flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase text-dirora-purple hover:bg-purple-50 rounded"
                        >
                          <Icons icon="solar:widget-bold" size={16} />
                          <span>Admin Panel</span>
                        </span>
                      )}
                      <span
                        onClick={() => {
                          navigate("/profile");
                          setIsProfileMenuOpen(false);
                        }}
                        className="cursor-pointer flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded"
                      >
                        <Icons icon="solar:user-rounded-linear" size={16} />
                        <span>Profile</span>
                      </span>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded mt-2 border-t pt-3"
                      >
                        <Icons icon="solar:logout-bold" size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <span
                  onClick={() => navigate("/login")}
                  className="p-1 block cursor-pointer hover:text-dirora-purple transition-colors"
                >
                  <Icons icon="solar:user-linear" size={24} />
                </span>
              )}
            </div>

            {isLoggedIn && isCustomer && (
              <span className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[11px] font-black transition-colors hover:bg-gray-50">
                <Icons
                  icon="solar:wallet-2-bold"
                  size={18}
                  className="text-dirora-purple"
                />
                <span className="text-dirora-dark">
                  ₹{(user.walletBalance || 0).toLocaleString("en-IN")}
                </span>
              </span>
            )}

            <span
              onClick={() => navigate("/cart")}
              className="relative hover:text-dirora-purple hover:scale-110 transition-all cursor-pointer"
            >
              <Icons icon="solar:cart-large-2-linear" size={24} />
              {cartItemsLength > 0 && (
                <span className="absolute -top-1 -right-1 bg-dirora-purple text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-dirora-ivory">
                  {cartItemsLength}
                </span>
              )}
            </span>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-1 text-dirora-dark hover:text-dirora-purple transition-colors focus:outline-none"
            >
              <Icons
                icon={
                  isMobileMenuOpen
                    ? "solar:close-circle-linear"
                    : "solar:hamburger-menu-linear"
                }
                size={26}
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN CONTENT (With Subcategories Accordion) */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ${isMobileMenuOpen ? "max-h-[80vh] opacity-100 visible py-6 overflow-y-auto" : "max-h-0 opacity-0 invisible overflow-hidden"}`}
        >
          <div className="flex flex-col px-6 space-y-6 text-[13px] font-serif uppercase tracking-widest text-dirora-dark">
            <span
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
              className="block cursor-pointer hover:text-dirora-purple font-bold"
            >
              Home
            </span>

            {/* Mobile Categories list with Subcategories Accordion */}
            <div className="space-y-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b pb-1 block">
                Categories
              </span>
              {activeCategories.map((cat) => (
                <div key={cat.id} className="border-b border-gray-50 pb-2">
                  {cat.subCategories && cat.subCategories.length > 0 ? (
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none hover:text-dirora-purple text-gray-700 font-bold">
                        <span>{cat.name}</span>
                        <ChevronDown
                          size={14}
                          className="group-open:rotate-180 transition-transform duration-300"
                        />
                      </summary>
                      <div className="flex flex-col pl-4 mt-3 space-y-3 border-l-2 border-gray-100 ml-1">
                        <span
                          onClick={() => {
                            navigate(`/collections/${cat.slug}`);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block cursor-pointer text-[11px] text-gray-500 hover:text-dirora-purple font-medium"
                        >
                          View All {cat.name}
                        </span>
                        {cat.subCategories.map((sub) => (
                          <span
                            key={sub.id}
                            onClick={() => {
                              navigate(`/collections/${cat.slug}/${sub.slug}`);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block cursor-pointer text-[11px] text-gray-500 hover:text-dirora-purple"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <span
                      onClick={() => {
                        navigate(`/collections/${cat.slug}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block cursor-pointer hover:text-dirora-purple text-gray-700 font-bold"
                    >
                      {cat.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <span
              onClick={() => {
                navigate("/sale");
                setIsMobileMenuOpen(false);
              }}
              className="block cursor-pointer text-red-600 font-bold hover:text-red-700 pt-2"
            >
              Sale
            </span>
            <span
              onClick={() => {
                navigate("/about");
                setIsMobileMenuOpen(false);
              }}
              className="block cursor-pointer hover:text-dirora-purple"
            >
              About
            </span>
          </div>
        </div>
      </nav>

      {/* SEARCH TOP DRAWER - MEGA MENU STYLE */}
      {/* ... (Search Code Same) ... */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-full bg-dirora-ivory shadow-2xl overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top ${isSearchOpen ? "translate-y-0" : "-translate-y-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-6 md:pt-8 pb-8 md:pb-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <span className="font-serif font-black text-xl uppercase tracking-tighter text-dirora-dark">
                Dirora.in
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-dirora-purple transition-colors"
              >
                <span>Close</span>
                <Icons
                  icon="solar:close-circle-linear"
                  size={24}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>

            <div className="relative group max-w-3xl mx-auto mb-8 md:mb-10">
              <Icons
                icon="solar:magnifer-linear"
                size={22}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                autoFocus={isSearchOpen}
                placeholder="What are you looking for?"
                className="w-full bg-transparent text-lg md:text-2xl font-serif font-light pl-10 md:pl-12 border-b border-gray-300 py-3 md:py-4 outline-none text-dirora-dark placeholder-gray-400 transition-colors focus:border-dirora-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-dirora-purple transition-all duration-700 ease-out group-focus-within:w-full"></div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto scrollbar-hide px-2">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setIsSearchOpen(false)}
                      className="hover:-translate-y-2 transition-transform duration-300"
                    >
                      <Card3Modi product={p} />
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery.length > 0 && (
                  <div className="py-10 flex flex-col items-center justify-center opacity-50">
                    <Icons
                      icon="solar:box-minimalistic-linear"
                      size={48}
                      className="mb-4 text-gray-400"
                    />
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 text-center">
                      {searchQuery.length < 2
                        ? "Keep typing..."
                        : "No results found"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
