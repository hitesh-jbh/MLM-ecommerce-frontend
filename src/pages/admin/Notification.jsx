// import React, { useState } from 'react';
// import useSWR from 'swr';
// import { useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { 
//   notificationStats, 
//   markRead, 
//   markAllRead,
//   adminNotification,
//   createNotification 
// } from "../../utils/service/apiService";
// import Icons from "../../components/ui/Icon";
// import { 
//   CheckCheck, 
//   RefreshCcw, 
//   User, 
//   Clock, 
//   ExternalLink,
//   Copy,
//   Inbox,
//   Plus, 
//   X,
//   Send,
//   Eye
// } from 'lucide-react';

// const Notifications = () => {
//   const { token } = useSelector((state) => state.auth);
//   const [filter, setFilter] = useState('all');
//   const [isMarkingAll, setIsMarkingAll] = useState(false);
  
//   // Modal States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     message: '',
//     type: 'ANNOUNCEMENT',
//     userIds: [] // Empty array signifies "ALL USERS" for broadcast
//   });

//   // 1. Fetch Stats
//   const { data: statsRes, mutate: mutateStats } = useSWR(
//     token ? ["/api/notification/stats", token] : null,
//     ([_, tkn]) => notificationStats(tkn).then(res => res.data),
//     { revalidateOnFocus: true }
//   );

//   // 2. Fetch Notification List
//   const { 
//     data: notifRes, 
//     mutate: mutateNotifs, 
//     isValidating: isSyncing 
//   } = useSWR(
//     token ? ["/api/notification", token] : null,
//     ([_, tkn]) => adminNotification(tkn).then(res => res.data?.data || res.data || [])
//   );

//   const stats = statsRes?.counts || {};
//   const pendingCount = statsRes?.pending || 0;
//   const notifications = Array.isArray(notifRes) ? notifRes : [];

//   // --- API HANDLERS ---

//   const handleCreateNotification = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.message) return toast.error("Please fill all fields");
    
//     setIsCreating(true);
//     try {
//       // Ensure the payload matches the backend expectations for a global broadcast
//       const payload = {
//         ...formData,
//         userIds: formData.userIds.length > 0 ? formData.userIds : null,
//         isGlobal: formData.userIds.length === 0 // common flag for broadcast
//       };

//       await createNotification(token, payload);
//       toast.success("Broadcast dispatched successfully");
//       setIsModalOpen(false);
//       setFormData({ title: '', message: '', type: 'ANNOUNCEMENT', userIds: [] });
//       mutateNotifs(); 
//       mutateStats();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to send notification");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleMarkRead = async (notification) => {
//     const targetId = notification._id || notification.id;
//     try {
//       await markRead(token, targetId);
//       mutateNotifs();
//       mutateStats();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   const handleMarkAllRead = async () => {
//     if (pendingCount === 0) return;
//     setIsMarkingAll(true);
//     try {
//       await markAllRead(token);
//       await Promise.all([mutateNotifs(), mutateStats()]);
//       toast.success("Dashboard cleared");
//     } catch (error) {
//       toast.error("Operation failed");
//     } finally {
//       setIsMarkingAll(false);
//     }
//   };

//   // --- UTILS ---
//   const copyToClipboard = (uid) => {
//     if (!uid) return;
//     navigator.clipboard.writeText(uid.toString());
//     toast.info(`ID: ${uid} copied`, { autoClose: 1000, hideProgressBar: true });
//   };

//   const getCountForType = (typeId) => {
//     const keyMap = { user: 'user_activity', financial: 'financial', system: 'system_alerts', security: 'security' };
//     return typeId === 'all' ? (stats.all?.total || 0) : (stats[keyMap[typeId]]?.total || 0);
//   };

//   const notificationTypes = [
//     { id: 'all', label: 'All', icon: "heroicons:bell-alert" },
//     { id: 'user', label: 'User Activity', icon: "solar:user-hands-bold-duotone" },
//     { id: 'financial', label: 'Financial', icon: "solar:card-transfer-bold-duotone" },
//     { id: 'system', label: 'System Alerts', icon: "solar:shield-warning-bold-duotone" },
//     { id: 'security', label: 'Security', icon: "solar:lock-password-bold-duotone" }
//   ];

//   const filteredNotifications = notifications.filter(n => filter === 'all' || n.type?.toLowerCase() === filter.toLowerCase());

//   return (
//     <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 relative font-sans">
//       <ToastContainer position="top-right" theme="light" />
      
//       {/* --- MODAL: CREATE NOTIFICATION --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//           <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
//             <div className="p-8">
//               <div className="flex justify-between items-center mb-8">
//                 <div>
//                   <h2 className="text-2xl font-black tracking-tight uppercase">Send Alert</h2>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Broadcast System</p>
//                 </div>
//                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                   <X size={20} className="text-gray-400" />
//                 </button>
//               </div>

//               <form onSubmit={handleCreateNotification} className="space-y-5">
//                 <div>
//                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Notification Title</label>
//                   <input 
//                     type="text"
//                     required
//                     placeholder="Maintenance alert..."
//                     className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm transition-all"
//                     value={formData.title}
//                     onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Message Content</label>
//                   <textarea 
//                     rows="4"
//                     required
//                     placeholder="Describe the alert detail..."
//                     className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm resize-none transition-all"
//                     value={formData.message}
//                     onChange={(e) => setFormData({...formData, message: e.target.value})}
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Alert Type</label>
//                     <select 
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-xs outline-none cursor-pointer"
//                       value={formData.type}
//                       onChange={(e) => setFormData({...formData, type: e.target.value})}
//                     >
//                       <option value="ANNOUNCEMENT">Announcement</option>
//                       <option value="SYSTEM">System</option>
//                       <option value="SECURITY">Security</option>
//                       <option value="FINANCIAL">Financial</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Targeting</label>
//                     <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl font-bold text-[10px] text-gray-500 flex items-center gap-2 grayscale">
//                       <Icons icon="solar:globus-bold" size={14} /> ALL USERS
//                     </div>
//                   </div>
//                 </div>

//                 <button 
//                   disabled={isCreating}
//                   className="w-full mt-4 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50"
//                 >
//                   {isCreating ? <RefreshCcw className="animate-spin" size={16}/> : <Send size={16} />}
//                   {isCreating ? "Broadcasting..." : "Dispatch Notification"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- HEADER --- */}
//       <div className="max-w-5xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <h1 className="text-3xl font-black tracking-tighter uppercase">Status Update</h1>
//               {pendingCount > 0 && (
//                 <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded">
//                    {pendingCount} NEW
//                 </span>
//               )}
//             </div>
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Administrator Control Center</p>
//           </div>
          
//           <div className="flex gap-2">
//             <button 
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg active:scale-95"
//             >
//               <Plus size={14} strokeWidth={3} /> Create
//             </button>

//             <button 
//               onClick={handleMarkAllRead}
//               disabled={pendingCount === 0 || isMarkingAll}
//               className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-50 disabled:opacity-30 disabled:grayscale"
//             >
//               <CheckCheck size={14} />
//               {isMarkingAll ? 'Processing...' : 'Mark All As Read'}
//             </button>
//           </div>
//         </div>

//         {/* --- FILTERS --- */}
//         <div className="flex flex-wrap gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-2xl w-fit">
//           {notificationTypes.map(type => (
//             <button
//               key={type.id}
//               onClick={() => setFilter(type.id)}
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
//                 filter === type.id 
//                   ? 'bg-white text-black shadow-sm font-black' 
//                   : 'text-gray-500 hover:text-black font-bold'
//               }`}
//             >
//               <Icons icon={type.icon} size={16} />
//               <span className="text-[10px] uppercase tracking-wider">{type.label}</span>
//               <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${filter === type.id ? 'bg-black text-white' : 'bg-gray-300/50'}`}>
//                 {getCountForType(type.id)}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* --- NOTIFICATION LIST --- */}
//         <div className="space-y-4">
//           {filteredNotifications.length > 0 ? (
//             filteredNotifications.map(notification => (
//               <div 
//                 key={notification._id || notification.id} 
//                 className={`group bg-white p-7 rounded-[2rem] border border-gray-100 flex flex-col gap-6 transition-all hover:shadow-xl hover:translate-y-[-2px] ${notification.status === 'read' || notification.is_read ? 'opacity-70 grayscale-[0.3]' : 'shadow-sm'}`}
//               >
//                 <div className="flex justify-between items-start gap-4">
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-black uppercase tracking-tight text-gray-700">
//                       {notification.title}
//                     </h3>
//                     <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-2xl">
//                       {notification.message}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-gray-50">
//                   <div className="flex items-center gap-4">
//                     <p className="text-[11px] text-gray-400 font-bold italic">
//                       {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : '1/21/2026'}
//                     </p>
                    
//                     {notification.userId && (
//                       <button 
//                         onClick={() => copyToClipboard(notification.userId)}
//                         className="bg-gray-50 hover:bg-gray-100 text-gray-400 text-[9px] font-black px-2 py-1 rounded flex items-center gap-1 transition-colors uppercase"
//                       >
//                         Target: {notification.userId} <Copy size={10} />
//                       </button>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2">
//                     {(notification.status === 'read' || notification.is_read) ? (
//                       <div className="flex items-center gap-1 text-[10px] font-black text-gray-300 uppercase tracking-widest px-3 py-1">
//                         <CheckCheck size={14} /> Seen
//                       </div>
//                     ) : (
//                       <button 
//                         onClick={() => handleMarkRead(notification)}
//                         className="flex items-center gap-2 px-5 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100"
//                       >
//                         <Eye size={12} /> Mark Seen
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center grayscale">
//               <Inbox size={48} className="text-gray-200 mb-4" />
//               <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Inbox Empty</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;




import React, { useState } from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { 
  notificationStats, 
  markRead, 
  markAllRead,
  adminNotification,
  createNotification // Import the new API
} from "../../utils/service/apiService";
import Icons from "../../components/ui/Icon";
import { 
  CheckCheck, 
  RefreshCcw, 
  User, 
  Clock, 
  ExternalLink,
  Copy,
  Inbox,
  Plus, // Import Plus icon
  X,
  Send
} from 'lucide-react';

const Notifications = () => {
  const { token } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState('all');
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'ANNOUNCEMENT',
    userIds: []
  });

  // 1. Fetch Stats
  const { data: statsRes, mutate: mutateStats } = useSWR(
    token ? ["/api/notification/stats", token] : null,
    ([_, tkn]) => notificationStats(tkn).then(res => res.data),
    { revalidateOnFocus: true }
  );

  // 2. Fetch Notification List
  const { 
    data: notifRes, 
    mutate: mutateNotifs, 
    isValidating: isSyncing 
  } = useSWR(
    token ? ["/api/notification", token] : null,
    ([_, tkn]) => adminNotification(tkn).then(res => res.data?.data || res.data || [])
  );

  const stats = statsRes?.counts || {};
  const pendingCount = statsRes?.pending || 0;
  const notifications = Array.isArray(notifRes) ? notifRes : [];

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return toast.error("Please fill all fields");
    
    setIsCreating(true);
    try {
      await createNotification(token, formData);
      toast.success("Notification sent successfully");
      setIsModalOpen(false);
      setFormData({ title: '', message: '', type: '', userIds: [] });
      mutateNotifs(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send notification");
    } finally {
      setIsCreating(false);
    }
  };

  // ... (Keep existing formatDate, handleMarkRead, handleMarkAllRead, copyToClipboard)
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Recent" : date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  };

  const handleMarkRead = async (notification) => {
    const targetId = notification._id || notification.id;
    try {
      await markRead(token, targetId);
      mutateNotifs();
      mutateStats();
      toast.success("Marked as read");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark as read");
    }
  };

  const handleMarkAllRead = async () => {
    if (pendingCount === 0) return;
    setIsMarkingAll(true);
    try {
      await markAllRead(token);
      await Promise.all([mutateNotifs(), mutateStats()]);
      toast.success("All notifications cleared");
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setIsMarkingAll(false);
    }
  };

  const copyToClipboard = (uid) => {
    if (!uid) return;
    navigator.clipboard.writeText(uid.toString());
    toast.info(`ID: ${uid} copied`, { autoClose: 1000, hideProgressBar: true });
  };

  const getCountForType = (typeId) => {
    const keyMap = { user: 'user_activity', financial: 'financial', system: 'system_alerts', security: 'security' };
    return typeId === 'all' ? (stats.all?.total || 0) : (stats[keyMap[typeId]]?.total || 0);
  };

  const notificationTypes = [
    { id: 'all', label: 'All', icon: "heroicons:bell-alert" },
    { id: 'user', label: 'User Activity', icon: "solar:user-hands-bold-duotone" },
    { id: 'financial', label: 'Financial', icon: "solar:card-transfer-bold-duotone" },
    { id: 'system', label: 'System Alerts', icon: "solar:shield-warning-bold-duotone" },
    { id: 'security', label: 'Security', icon: "solar:lock-password-bold-duotone" }
  ];

  const filteredNotifications = notifications.filter(n => filter === 'all' || n.type === filter);

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 relative">
      <ToastContainer position="top-right" theme="light" pauseOnFocusLoss={false} />
      
      {/* --- CREATE NOTIFICATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase">Send Alert</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Broadcast System</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleCreateNotification} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">Notification Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. System Maintenance"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">Message Content</label>
                  <textarea 
                    rows="4"
                    required
                    placeholder="Describe the alert detail..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-sm resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">Alert Type</label>
                        <select 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-xs outline-none"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="ANNOUNCEMENT">Announcement</option>
                            <option value="SYSTEM">System</option>
                            <option value="SECURITY">Security</option>
                            <option value="FINANCIAL">Financial</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">Targeting</label>
                        <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl font-bold text-[10px] text-gray-500 flex items-center gap-2">
                            <Icons icon="solar:globus-bold" size={14} /> ALL USERS
                        </div>
                    </div>
                </div>

                <button 
                  disabled={isCreating}
                  className="w-full mt-4 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isCreating ? <RefreshCcw className="animate-spin" size={16}/> : <Send size={16} />}
                  {isCreating ? "Broadcasting..." : "Dispatch Notification"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 text-left">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">Notification Center</h1>
              {pendingCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded animate-pulse">
                  {pendingCount} NEW
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Administrator Dashboard Alerts</p>
          </div>
          
          <div className="flex gap-2">
            {/* --- CREATE BUTTON --- */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
            >
              <Plus size={14} strokeWidth={3} />
              Create
            </button>

            <button 
              onClick={() => { mutateNotifs(); mutateStats(); }}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:border-black transition-all shadow-sm"
              title="Sync Data"
            >
              <RefreshCcw size={18} className={isSyncing ? 'animate-spin text-blue-500' : 'text-gray-400'} />
            </button>

            <button 
              onClick={handleMarkAllRead}
              disabled={pendingCount === 0 || isMarkingAll}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                pendingCount === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-zinc-800 shadow-lg active:scale-95'
              }`}
            >
              <CheckCheck size={14} className={isMarkingAll ? 'animate-bounce' : ''} />
              {isMarkingAll ? 'Processing...' : 'Mark All Read'}
            </button>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl w-fit">
          {notificationTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                filter === type.id 
                  ? 'bg-white text-black shadow-sm font-black' 
                  : 'text-gray-500 hover:text-black font-bold hover:bg-white/50'
              }`}
            >
              <Icons icon={type.icon} size={18} />
              <span className="text-[10px] uppercase tracking-wider">{type.label}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${filter === type.id ? 'bg-black text-white' : 'bg-gray-200'}`}>
                {getCountForType(type.id)}
              </span>
            </button>
          ))}
        </div>

        {/* ... (Keep the Notification List mapping code same as before) */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div 
                key={notification._id || notification.id} 
                className={`group relative bg-white p-5 rounded-[1.5rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-xl ${notification.status === 'read' ? 'opacity-60 grayscale-[0.5]' : 'shadow-sm border-l-4 border-l-blue-500'}`}
              >
                <div className="flex items-center gap-4 flex-1 w-full text-left">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-gray-300" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <button 
                        onClick={() => copyToClipboard(notification.userId || notification.user_id)}
                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                        title="Copy User ID"
                      >
                        ID: {notification.userId || notification.user_id || "N/A"}
                        <Copy size={8} />
                      </button>
                      <h3 className="text-sm font-black uppercase tracking-tight text-gray-900">
                        {notification.title}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                        <p className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1.5">
                          <Clock size={12} /> 
                          {formatDate(notification.createdAt || notification.date)}
                        </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  {notification.status !== 'read' && (
                    <button 
                      onClick={() => handleMarkRead(notification)}
                      className="flex-1 md:flex-none px-6 py-2.5 bg-blue-50 text-blue-700 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded-xl border border-blue-100"
                    >
                      Mark Read
                    </button>
                  )}
                  <button className="flex-1 md:flex-none p-2.5 bg-gray-50 text-gray-900 hover:bg-black hover:text-white transition-all rounded-xl border border-transparent">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
              <Inbox size={32} className="text-gray-200 mb-4" />
              <p className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Inbox is Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;