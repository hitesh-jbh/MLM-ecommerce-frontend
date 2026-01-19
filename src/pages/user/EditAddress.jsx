import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSWR, { mutate } from 'swr';
import { setAddresses, addAddress, updateAddress, setDefault, removeAddress } from '../../utils/Slice/addressSlice';
import Icons from '../../components/ui/Icon';
import { saveAddress, getAddress } from '../../utils/service/apiService';

const EditAddress = () => {
  const dispatch = useDispatch();
  
  // 1. Get Token from Redux or Storage
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  // 2. SWR Implementation
  // Key uses an array so SWR re-fetches automatically if the token changes
  const { data: response, error, isLoading } = useSWR(
    token ? ['/api/addresses', token] : null,
    ([_, tkn]) => getAddress(tkn),
    {
      revalidateOnFocus: false, // Prevents refreshing every time you switch browser tabs
      onSuccess: (res) => {
        if (res.data?.success) {
          dispatch(setAddresses(res.data.data));
        }
      }
    }
  );

  const addresses = response?.data?.data || [];
  
  // Local UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (address = null) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData);

    const payload = {
      full_name: rawData.fullName,
      street_address: rawData.street,
      apartment: rawData.apartment || "",
      city: rawData.city,
      zip: rawData.zipCode,
      phone: rawData.phone,
      // If adding new, make it default if it's the first one
      is_default: editingAddress ? editingAddress.is_default : (addresses.length === 0 ? 1 : 0)
    };

    try {
      const res = await saveAddress(token, payload);
      if (res.data?.success || res.status === 200) {
        // 3. Trigger SWR Revalidation
        // This keeps the server and UI in perfect sync
        mutate(['/api/addresses', token]);
        
        handleCloseModal();
      }
    } catch (err) {
      console.error("Save Error:", err);
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        <p className="mt-4 font-black uppercase tracking-widest text-xs">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#F9F9F9] min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#0F172A]">Saved Addresses</h1>
        <div className="h-1 w-20 bg-black mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ADD NEW BOX */}
        <button 
          onClick={() => handleOpenModal()}
          className="h-[240px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center hover:border-black hover:bg-white transition-all group"
        >
          <div className="bg-black text-white p-3 rounded-full group-hover:scale-110 transition-transform">
            <Icons icon="solar:add-circle-bold" size={24} />
          </div>
          <span className="mt-4 text-[11px] font-black uppercase tracking-tighter">Add New Address</span>
        </button>

        {/* ADDRESS CARDS */}
        {addresses.map((addr) => (
          <div 
            key={addr.id} 
            className={`relative h-[240px] p-8 rounded-3xl border-2 transition-all ${
              addr.is_default === 1 ? 'border-black bg-white shadow-xl' : 'border-transparent bg-white shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <button 
                onClick={() => dispatch(setDefault(addr.id))}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  addr.is_default === 1 ? 'bg-black border-black' : 'border-gray-200'
                }`}
              >
                {addr.is_default === 1 && <Icons icon="solar:check-read-bold" size={14} className="text-white" />}
              </button>
              <div className="flex gap-3">
                 <button onClick={() => handleOpenModal(addr)} className="text-gray-400 hover:text-black transition-colors">
                  <Icons icon="solar:pen-bold" size={20} />
                </button>
                <button 
                  onClick={() => dispatch(removeAddress(addr.id))} 
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Icons icon="solar:trash-bin-minimalistic-bold" size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-black text-base text-[#0F172A] uppercase truncate">{addr.full_name}</p>
              <p className="text-xs text-gray-500 font-medium truncate">{addr.street_address}</p>
              <p className="text-xs text-gray-500 font-medium truncate">{addr.city}, {addr.zip}</p>
              <p className="text-xs font-bold text-black mt-4 pt-4 border-t border-gray-100">{addr.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#0F172A]">
                {editingAddress ? 'Edit Address' : 'New Address'}
              </h2>
              <div className="h-1 w-12 bg-black mt-1"></div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Full Name</label>
                  <input required name="fullName" defaultValue={editingAddress?.full_name} className="w-full border-b border-gray-200 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
                </div>
                
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Street Address</label>
                  <input required name="street" defaultValue={editingAddress?.street_address} className="w-full border-b border-gray-200 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
                </div>

                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Apt / Suite (Optional)</label>
                  <input name="apartment" defaultValue={editingAddress?.apartment} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
                </div>

                <div className="flex gap-8">
                  <div className="flex-1 group">
                    <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">City</label>
                    <input required name="city" defaultValue={editingAddress?.city} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
                  </div>
                  <div className="flex-1 group">
                    <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Zip Code</label>
                    <input required name="zipCode" defaultValue={editingAddress?.zip} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Phone Number</label>
                  <input required name="phone" defaultValue={editingAddress?.phone} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button" 
                  disabled={isSubmitting}
                  onClick={handleCloseModal}
                  className="flex-1 py-4 text-xs font-black uppercase border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-4 text-xs font-black uppercase bg-black text-white rounded-2xl hover:bg-[#1e1e1e] transition-all shadow-lg shadow-black/10 disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Saving...' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAddress;
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addAddress, updateAddress, setDefault, removeAddress } from '../../utils/Slice/addressSlice';
// import Icons from '../../components/ui/Icon';
// import { saveAddress, getAddress } from '../../utils/service/apiService';

// const EditAddress = () => {
//   const addresses = useSelector((state) => state.addresses?.items || []);
//   const dispatch = useDispatch();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);

//   const handleOpenModal = (address = null) => {
//     setEditingAddress(address);
//     setIsModalOpen(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const addressData = Object.fromEntries(formData);

//     if (editingAddress) {
//       dispatch(updateAddress({ ...editingAddress, ...addressData }));
//     } else {
//       dispatch(addAddress({ ...addressData, isDefault: false }));
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-10">
//         <h1 className="text-2xl font-black uppercase tracking-tight">Saved Addresses</h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {/* ADD NEW TRIGGER */}
//         <button 
//           onClick={() => handleOpenModal()}
//           className="h-[240px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center hover:border-black transition-all group"
//         >
//           <Icons icon="solar:add-circle-bold" size={32} />
//           <span className="mt-4 text-[11px] font-black uppercase">Add New Address</span>
//         </button>

//         {/* DISPLAY CARDS */}
//         {addresses.map((addr) => (
//           <div 
//             key={addr.id} 
//             onClick={() => dispatch(setDefault(addr.id))}
//             className={`relative h-[240px] p-6 rounded-2xl border-2 cursor-pointer transition-all ${
//               addr.isDefault ? 'border-black shadow-xl' : 'border-gray-100 bg-white'
//             }`}
//           >
//             <div className="flex justify-between items-start mb-6">
//               <div className={`w-5 h-5 rounded-full flex items-center justify-center ${addr.isDefault ? 'bg-black' : 'border-2 border-gray-200'}`}>
//                 {addr.isDefault && <Icons icon="solar:check-read-bold" size={12} className="text-white" />}
//               </div>
//               <div className="flex gap-2">
//                  <button onClick={(e) => { e.stopPropagation(); handleOpenModal(addr); }} className="text-gray-400 hover:text-black">
//                   <Icons icon="solar:pen-bold" size={18} />
//                 </button>
//                 <button onClick={(e) => { e.stopPropagation(); dispatch(removeAddress(addr.id)); }} className="text-gray-300 hover:text-red-500">
//                   <Icons icon="solar:trash-bin-minimalistic-bold" size={18} />
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-1">
//               <p className="font-black text-sm uppercase">{addr.fullName}</p>
//               <p className="text-xs text-gray-500">{addr.street}, {addr.apartment}</p>
//               <p className="text-xs text-gray-500">{addr.city}, {addr.state} {addr.zipCode}</p>
//               <p className="text-[11px] font-bold text-black mt-4 pt-4 border-t border-gray-50">{addr.phone}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* THE MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <form onSubmit={handleFormSubmit} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
//             <h2 className="text-lg font-black uppercase mb-6">{editingAddress ? 'Edit' : 'New'} Address</h2>
//             <div className="space-y-4">
//               <input required name="fullName" defaultValue={editingAddress?.fullName} placeholder="FULL NAME" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
//               <input required name="street" defaultValue={editingAddress?.street} placeholder="STREET ADDRESS" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
//               <input name="apartment" defaultValue={editingAddress?.apartment} placeholder="APT / SUITE (OPTIONAL)" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
//               <div className="flex gap-4">
//                 <input required name="city" defaultValue={editingAddress?.city} placeholder="CITY" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
//                 <input required name="zipCode" defaultValue={editingAddress?.zipCode} placeholder="ZIP" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
//               </div>
//               <input required name="phone" defaultValue={editingAddress?.phone} placeholder="PHONE" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
//             </div>
//             <div className="flex gap-4 mt-10">
//               <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-[10px] font-black uppercase border border-gray-200 rounded-xl">Cancel</button>
//               <button type="submit" className="flex-1 py-3 text-[10px] font-black uppercase bg-black text-white rounded-xl">Save</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EditAddress;