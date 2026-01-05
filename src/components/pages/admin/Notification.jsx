import React, { useState } from 'react';
import { 
  FiRefreshCw, 
  FiCheckCircle, 
  FiUser, 
  FiAlertCircle, 
  FiLock, 
  FiDollarSign,
  FiEye,
  FiCheck,
  FiX,
  FiChevronRight
} from 'react-icons/fi';

const Notifications = () => {
  // Notification types
  const notificationTypes = [
    { id: 'all', label: 'All', icon: <FiAlertCircle />, color: 'bg-gray-100 text-gray-800' },
    { id: 'user', label: 'User Activity', icon: <FiUser />, color: 'bg-blue-100 text-blue-800' },
    { id: 'financial', label: 'Financial Approvals', icon: <FiDollarSign />, color: 'bg-green-100 text-green-800' },
    { id: 'system', label: 'System Alerts', icon: <FiAlertCircle />, color: 'bg-orange-100 text-orange-800' },
    { id: 'security', label: 'Security', icon: <FiLock />, color: 'bg-red-100 text-red-800' }
  ];

  // Initial notifications data
  const initialNotifications = [
    {
      id: 1,
      type: 'financial',
      title: 'Withdrawal Request',
      message: 'User ID #7892 requested $15,000 withdrawal - Pending approval',
      date: 'Dec 8, 2023, 11:40 AM',
      status: 'pending',
      userImage: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',
      bgColor: 'border-l-4 border-l-green-500',
      canApproveReject: true
    },
    {
      id: 2,
      type: 'user',
      title: 'New User Request',
      message: 'New registration request from john.doe@example.com - Needs review',
      date: 'Dec 8, 2023, 10:15 AM',
      status: 'pending',
      userImage: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',
      bgColor: 'border-l-4 border-l-blue-500',
      canApproveReject: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Software Update Available',
      message: 'New system update v2.4.1 is ready to install',
      date: 'Dec 7, 2023, 02:30 PM',
      status: 'pending',
      userImage: 'https://play-lh.googleusercontent.com/vkCOl70qqVOMrBKBNRKnyiMom7AVzEju0fItGgfdZehnbI0GF10D7_FZL7RfmtCXfA',
      bgColor: 'border-l-4 border-l-orange-500',
      canApproveReject: true
    },
    {
      id: 4,
      type: 'security',
      title: 'Unusual Attempted Login',
      message: 'Multiple failed login attempts detected from unknown IP address',
      date: 'Dec 7, 2023, 09:45 AM',
      status: 'pending',
      userImage: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',
      bgColor: 'border-l-4 border-l-red-500',
      canApproveReject: true
    }
   
  
  ];

  // State management
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Filter notifications based on selected type
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === filter);

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      status: 'read',
      bgColor: 'border-l-4 border-l-gray-300',
      canApproveReject: false
    }));
    setNotifications(updatedNotifications);
  };

  // Refresh notifications - WORKING NOW
  const refreshNotifications = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add a new notification when refreshing
      const newNotification = {
        id: notifications.length + 1,
        type: 'system',
        title: 'System Alert',
        message: 'New system notification received after refresh',
        date: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric' 
        }),
        status: 'pending',
        userImage: 'https://play-lh.googleusercontent.com/vkCOl70qqVOMrBKBNRKnyiMom7AVzEju0fItGgfdZehnbI0GF10D7_FZL7RfmtCXfA',
        bgColor: 'border-l-4 border-l-orange-500',
        canApproveReject: true
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setLoading(false);
      alert('Notifications refreshed! New notification added.');
    }, 800);
  };

  // Handle approve action - ALL NOTIFICATIONS
  const handleApprove = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { 
        ...notification, 
        status: 'approved',
        bgColor: 'border-l-4 border-l-green-500',
        message: `${notification.message.split(' - ')[0]} - Approved ✓`,
        canApproveReject: false
      } : notification
    );
    setNotifications(updatedNotifications);
    alert(`Notification #${id} approved successfully!`);
  };

  // Handle reject action - ALL NOTIFICATIONS
  const handleReject = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { 
        ...notification, 
        status: 'rejected',
        bgColor: 'border-l-4 border-l-red-500',
        message: `${notification.message.split(' - ')[0]} - Rejected ✗`,
        canApproveReject: false
      } : notification
    );
    setNotifications(updatedNotifications);
    alert(`Notification #${id} rejected successfully!`);
  };

  // Handle view details action
  const handleViewDetails = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      alert(`Viewing details for: ${notification.title}\n\n${notification.message}\n\nDate: ${notification.date}\nType: ${notification.type}\nStatus: ${notification.status}`);
    }
  };

  // Mark a single notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, status: 'read' } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Get notification type icon with color
  const getNotificationIcon = (type) => {
    switch(type) {
    //   case 'user': return <FiUser className="text-blue-500 text-xl" />;
    //   case 'financial': return <FiDollarSign className="text-green-500 text-xl" />;
    //   case 'system': return <FiAlertCircle className="text-orange-500 text-xl" />;
    //   case 'security': return <FiLock className="text-red-500 text-xl" />;
    //   default: return <FiAlertCircle className="text-gray-500 text-xl" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': 
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">Action Required</span>;
      case 'approved':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">Rejected</span>;
      case 'read':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">Read</span>;
      default:
        return null;
    }
  };

  // Count pending notifications
  const pendingCount = notifications.filter(n => n.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h1>
            {pendingCount > 0 && (
              <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded-full">
                {pendingCount} pending
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${loading ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'} border-gray-300 transition-colors`}
              onClick={refreshNotifications}
              disabled={loading}
            >
              <FiRefreshCw className={`text-lg ${loading ? 'animate-spin' : ''}`} />
              <span className="font-medium">{loading ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            
            <button 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${pendingCount === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white text-green-600 hover:bg-green-50'} border-gray-300 transition-colors`}
              onClick={markAllAsRead}
              disabled={pendingCount === 0}
            >
              <FiCheckCircle className="text-lg" />
              <span className="font-medium">Mark All Read</span>
            </button>
          </div>
        </div>

        {/* Notification Type Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {notificationTypes.map(type => (
            <button
              key={type.id}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${filter === type.id ? `${type.color} border-transparent font-semibold` : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              onClick={() => setFilter(type.id)}
            >
              <span className="text-lg">{type.icon}</span>
              <span className="text-sm md:text-base">{type.label}</span>
              <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full ${type.color.split(' ')[0]} ${type.color.split(' ')[1]}`}>
                {notifications.filter(n => n.type === type.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List - One Card per Row */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-sm">
            <FiCheckCircle className="text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
            <p className="text-gray-500 text-center max-w-md">
              You're all caught up! No new notifications in this category.
            </p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${notification.bgColor} bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="p-5 flex items-start justify-between">
                {/* Left side - Content */}
                <div className="flex gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img 
                        src={notification.userImage} 
                        alt="Notification" 
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                      />
                      <div className="absolute -top-1 -right-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold text-gray-800 truncate">
                        {notification.title}
                      </h3>
                      {getStatusBadge(notification.status)}
                    </div>
                    
                    <p className="text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{notification.date}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{notification.type} Notification</span>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600 font-medium">ID: #{notification.id}</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Action Buttons - ALL NOTIFICATIONS HAVE APPROVE/REJECT/VIEW */}
                <div className="flex-shrink-0 ml-4">
                  <div className="flex flex-col gap-2 w-48">
                    {/* View Details Button - ALWAYS VISIBLE */}
                    <button 
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(notification.id);
                      }}
                    >
                      <FiEye className="text-base" />
                      <span>View Details</span>
                    </button>
                    
                    {/* Approve/Reject Buttons - FOR PENDING STATUS ONLY */}
                    {notification.status === 'pending' && (
                      <div className="flex gap-2 w-full">
                        <button 
                          className="w-1/2 flex items-center justify-center gap-1 px-3 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(notification.id);
                          }}
                        >
                          <FiCheck className="text-base" />
                          <span>Approve</span>
                        </button>
                        <button 
                          className="w-1/2 flex items-center justify-center gap-1 px-3 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(notification.id);
                          }}
                        >
                          <FiX className="text-base" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                    
                    {/* Status buttons for approved/rejected notifications */}
                    {(notification.status === 'approved' || notification.status === 'rejected') && (
                      <div className="flex gap-2 w-full">
                        <button 
                          className="w-full flex items-center justify-center gap-1 px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors text-sm cursor-default"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{notification.status === 'approved' ? '✓ Approved' : '✗ Rejected'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;