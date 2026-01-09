import React, { useState } from 'react';
import UserSidebar from './UserSidebar';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Hamburger icon

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // h-screen prevents the whole page from stretching
    <div className="flex h-[500px] overflow-hidden bg-gray-50/50">
      
      {/* Sidebar - Height is handled by the parent container */}
      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 flex-shrink-0">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]">Profile</h2>
          <button onClick={toggleSidebar} className="p-2 text-black">
            <FaBars size={20} />
          </button>
        </header>

        {/* MAIN CONTENT AREA - This is the only part that scrolls */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;