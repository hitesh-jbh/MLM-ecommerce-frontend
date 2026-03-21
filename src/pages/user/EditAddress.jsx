import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { setAddresses } from '../../utils/slice/addressSlice';
import Icons from '../../components/ui/Icon';
import { saveAddress, getAddress, editAddress, deleteAddress } from '../../utils/service/apiService';
import { toast } from 'react-toastify';

const EditAddress = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetching Data
  const { data: response, isLoading } = useQuery({
    queryKey: ['addresses', token],
    queryFn: () => getAddress(token),
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (response?.data?.success) dispatch(setAddresses(response.data.data));
  }, [response, dispatch]);

  const addresses = response?.data?.data || [];

  // Handlers
  const handleOpenModal = (address = null) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const openDeleteModal = (addressId) => {
    setAddressToDelete(addressId);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingAddress(null);
    setAddressToDelete(null);
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
      is_default: editingAddress ? editingAddress.is_default : (addresses.length === 0 ? 1 : 0)
    };

    try {
      const res = editingAddress 
        ? await editAddress(token, editingAddress.id, payload)
        : await saveAddress(token, payload);

      if (res.data?.success || res.status === 200) {
        toast.success(editingAddress ? "Address updated!" : "Address saved!");
        queryClient.invalidateQueries({ queryKey: ['addresses', token] });
        closeModals();
      }
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      const res = await deleteAddress(token, addressToDelete);
      if (res.data?.success || res.status === 200) {
        toast.success("Address removed", { theme: 'light' });
        queryClient.invalidateQueries({ queryKey: ['addresses', token] });
        closeModals();
      }
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black">LOADING...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#F9F9F9] min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#0F172A]">My Addresses</h1>
        <div className="h-1 w-20 bg-black mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ADD NEW CARD */}
        <button onClick={() => handleOpenModal()} className="h-[240px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center hover:border-black transition-all group bg-white shadow-sm">
          <div className="bg-black text-white p-3 rounded-full group-hover:scale-110 transition-transform">
            <Icons icon="solar:add-circle-bold" size={24} />
          </div>
          <span className="mt-4 text-[11px] font-black uppercase tracking-tighter">Add New</span>
        </button>

        {/* ADDRESS CARDS */}
        {addresses.map((addr) => (
          <div key={addr.id} className={`relative h-[240px] p-8 rounded-3xl border-2 bg-white transition-all ${addr.is_default === 1 ? 'border-black shadow-xl' : 'border-transparent shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${addr.is_default === 1 ? 'bg-black border-black' : 'border-gray-100'}`}>
                {addr.is_default === 1 && <Icons icon="solar:check-read-bold" size={14} className="text-white" />}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(addr)} className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-black"><Icons icon="solar:pen-bold" size={18} /></button>
                <button onClick={() => openDeleteModal(addr.id)} className="p-2 bg-red-50 rounded-lg text-red-300 hover:text-red-500"><Icons icon="solar:trash-bin-minimalistic-bold" size={18} /></button>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-black text-base uppercase truncate">{addr.full_name}</p>
              <p className="text-xs text-gray-500 font-medium truncate">{addr.street_address}, {addr.city}</p>
              <p className="text-xs font-bold mt-4 pt-4 border-t border-gray-100 uppercase">{addr.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <Icons icon="solar:trash-bin-minimalistic-bold" size={40} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#0F172A]">Delete Address?</h3>
            <p className="text-gray-500 text-xs font-bold uppercase mt-2 px-4 leading-relaxed">
              This action cannot be undone. Are you sure you want to remove this address?
            </p>
            <div className="flex gap-3 mt-8">
              <button onClick={closeModals} className="flex-1 py-4 text-xs font-black uppercase border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={confirmDelete} disabled={isSubmitting} className="flex-1 py-4 text-xs font-black uppercase bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-200 disabled:bg-gray-400">
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT/NEW MODAL (REMAINS THE SAME) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#0F172A]">
                    {editingAddress ? 'Update Details' : 'New Address'}
                </h2>
                <div className="h-1 w-12 bg-black mt-1"></div>
              </div>
              <button onClick={closeModals} className="text-gray-300 hover:text-black transition-colors">
                 <Icons icon="solar:close-circle-bold" size={28} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-700">Full Name</label>
                  <input required name="fullName" defaultValue={editingAddress?.full_name} className="w-full border-b border-gray-200 py-2 focus:border-black outline-none text-sm font-bold uppercase bg-transparent" />
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-700">Street Address</label>
                  <input required name="street" defaultValue={editingAddress?.street_address} className="w-full border-b border-gray-200 py-2 focus:border-black outline-none text-sm font-bold uppercase bg-transparent" />
                </div>
                <div className="flex gap-8">
                  <div className="flex-1 group">
                    <label className="text-[10px] font-black uppercase text-gray-700">City</label>
                    <input required name="city" defaultValue={editingAddress?.city} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase bg-transparent" />
                  </div>
                  <div className="flex-1 group">
                    <label className="text-[10px] font-black uppercase text-gray-700">Zip Code</label>
                    <input required name="zipCode" defaultValue={editingAddress?.zip} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase bg-transparent" />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-700">Phone Number</label>
                  <input required name="phone" defaultValue={editingAddress?.phone} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase bg-transparent" />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={closeModals} className="flex-1 py-4 text-xs font-black uppercase border-2 border-gray-100 rounded-2xl">Discard</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-4 text-xs font-black uppercase bg-black text-white rounded-2xl disabled:bg-gray-400">
                  {isSubmitting ? 'Syncing...' : 'Confirm'}
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
// import useSWR, { mutate } from 'swr';
// import { setAddresses, addAddress, updateAddress, setDefault, removeAddress } from '../../utils/slice/addressSlice';
// import Icons from '../../components/ui/Icon';
// import { saveAddress, getAddress } from '../../utils/service/apiService';

// const EditAddress = () => {
//   const dispatch = useDispatch();
  
//   // 1. Get Token from Redux or Storage
//   const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

//   // 2. SWR Implementation
//   // Key uses an array so SWR re-fetches automatically if the token changes
//   const { data: response, error, isLoading } = useSWR(
//     token ? ['/api/addresses', token] : null,
//     ([_, tkn]) => getAddress(tkn),
//     {
//       revalidateOnFocus: false, // Prevents refreshing every time you switch browser tabs
//       onSuccess: (res) => {
//         if (res.data?.success) {
//           dispatch(setAddresses(res.data.data));
//         }
//       }
//     }
//   );

//   const addresses = response?.data?.data || [];
  
//   // Local UI State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleOpenModal = (address = null) => {
//     setEditingAddress(address);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingAddress(null);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formData = new FormData(e.target);
//     const rawData = Object.fromEntries(formData);

//     const payload = {
//       full_name: rawData.fullName,
//       street_address: rawData.street,
//       apartment: rawData.apartment || "",
//       city: rawData.city,
//       zip: rawData.zipCode,
//       phone: rawData.phone,
//       // If adding new, make it default if it's the first one
//       is_default: editingAddress ? editingAddress.is_default : (addresses.length === 0 ? 1 : 0)
//     };

//     try {
//       const res = await saveAddress(token, payload);
//       if (res.data?.success || res.status === 200) {
//         // 3. Trigger SWR Revalidation
//         // This keeps the server and UI in perfect sync
//         mutate(['/api/addresses', token]);
        
//         handleCloseModal();
//       }
//     } catch (err) {
//       console.error("Save Error:", err);
//       alert("Failed to save address. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Loading State UI
//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//         <p className="mt-4 font-black uppercase tracking-widest text-xs">Loading Profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-[#F9F9F9] min-h-screen">
//       <div className="mb-10 text-center">
//         <h1 className="text-3xl font-black uppercase tracking-widest text-[#0F172A]">Saved Addresses</h1>
//         <div className="h-1 w-20 bg-black mx-auto mt-2"></div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {/* ADD NEW BOX */}
//         <button 
//           onClick={() => handleOpenModal()}
//           className="h-[240px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center hover:border-black hover:bg-white transition-all group"
//         >
//           <div className="bg-black text-white p-3 rounded-full group-hover:scale-110 transition-transform">
//             <Icons icon="solar:add-circle-bold" size={24} />
//           </div>
//           <span className="mt-4 text-[11px] font-black uppercase tracking-tighter">Add New Address</span>
//         </button>

//         {/* ADDRESS CARDS */}
//         {addresses.map((addr) => (
//           <div 
//             key={addr.id} 
//             className={`relative h-[240px] p-8 rounded-3xl border-2 transition-all ${
//               addr.is_default === 1 ? 'border-black bg-white shadow-xl' : 'border-transparent bg-white shadow-sm'
//             }`}
//           >
//             <div className="flex justify-between items-start mb-6">
//               <button 
//                 onClick={() => dispatch(setDefault(addr.id))}
//                 className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
//                   addr.is_default === 1 ? 'bg-black border-black' : 'border-gray-200'
//                 }`}
//               >
//                 {addr.is_default === 1 && <Icons icon="solar:check-read-bold" size={14} className="text-white" />}
//               </button>
//               <div className="flex gap-3">
//                  <button onClick={() => handleOpenModal(addr)} className="text-gray-400 hover:text-black transition-colors">
//                   <Icons icon="solar:pen-bold" size={20} />
//                 </button>
//                 <button 
//                   onClick={() => dispatch(removeAddress(addr.id))} 
//                   className="text-gray-300 hover:text-red-500 transition-colors"
//                 >
//                   <Icons icon="solar:trash-bin-minimalistic-bold" size={20} />
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-1">
//               <p className="font-black text-base text-[#0F172A] uppercase truncate">{addr.full_name}</p>
//               <p className="text-xs text-gray-500 font-medium truncate">{addr.street_address}</p>
//               <p className="text-xs text-gray-500 font-medium truncate">{addr.city}, {addr.zip}</p>
//               <p className="text-xs font-bold text-black mt-4 pt-4 border-t border-gray-100">{addr.phone}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
//             <div className="mb-8">
//               <h2 className="text-2xl font-black uppercase tracking-tight text-[#0F172A]">
//                 {editingAddress ? 'Edit Address' : 'New Address'}
//               </h2>
//               <div className="h-1 w-12 bg-black mt-1"></div>
//             </div>

//             <form onSubmit={handleFormSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 <div className="group">
//                   <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Full Name</label>
//                   <input required name="fullName" defaultValue={editingAddress?.full_name} className="w-full border-b border-gray-200 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
//                 </div>
                
//                 <div className="group">
//                   <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Street Address</label>
//                   <input required name="street" defaultValue={editingAddress?.street_address} className="w-full border-b border-gray-200 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
//                 </div>

//                 <div className="group">
//                   <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Apt / Suite (Optional)</label>
//                   <input name="apartment" defaultValue={editingAddress?.apartment} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
//                 </div>

//                 <div className="flex gap-8">
//                   <div className="flex-1 group">
//                     <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">City</label>
//                     <input required name="city" defaultValue={editingAddress?.city} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
//                   </div>
//                   <div className="flex-1 group">
//                     <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Zip Code</label>
//                     <input required name="zipCode" defaultValue={editingAddress?.zip} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
//                   </div>
//                 </div>

//                 <div className="group">
//                   <label className="text-[10px] font-black uppercase text-gray-400 group-focus-within:text-black">Phone Number</label>
//                   <input required name="phone" defaultValue={editingAddress?.phone} className="w-full border-b border-gray-100 py-2 focus:border-black outline-none text-sm font-bold uppercase transition-colors" />
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-6">
//                 <button 
//                   type="button" 
//                   disabled={isSubmitting}
//                   onClick={handleCloseModal}
//                   className="flex-1 py-4 text-xs font-black uppercase border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="flex-1 py-4 text-xs font-black uppercase bg-black text-white rounded-2xl hover:bg-[#1e1e1e] transition-all shadow-lg shadow-black/10 disabled:bg-gray-400"
//                 >
//                   {isSubmitting ? 'Saving...' : 'Save Address'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditAddress;
