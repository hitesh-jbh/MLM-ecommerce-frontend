import React, { useState } from 'react';
import Sidebar from '../../components/partials/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Icons from '../../components/ui/Icon';

export const AdminProfile = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    /* h-screen + overflow-hidden on the parent is the key to preventing layout degradation */
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar: Fixed width, height matches screen, scrolls independently if menu is long */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        w-72 shrink-0 border-r border-gray-200 bg-white h-full
      `}>
        <Sidebar closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      </aside>

      {/* Main Container: This section handles the header and the scrollable content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Mobile Header: Visible only on small devices */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <Icons icon="heroicons:bars-3-bottom-left-solid" size={24} />
          </button>
          <span className="font-bold text-amber-900 tracking-tight">Admin Console</span>
          <div className="w-8" /> {/* Visual Balance Spacer */}
        </header>

        {/* Content Area: Only this part will scroll when content is large */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="p-4 md:p-8 lg:p-10 w-full max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};


// import React from 'react'
// import Sidebar from '../../pages/admin/Sidebar'
// import { Outlet } from 'react-router-dom'

//  export const AdminProfile = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
//         <Sidebar />
//       </aside>

//       <main className="flex-1 overflow-y-auto p-6 md:p-10">
//         <div className="max-w-7xl mx-auto">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   )
// }
