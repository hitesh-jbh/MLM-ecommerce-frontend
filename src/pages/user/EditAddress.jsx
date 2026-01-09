import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, updateAddress, setDefault, removeAddress } from '../../utils/Slice/addressSlice';
import Icons from '../../ui/Icon';

const EditAddress = () => {
  const addresses = useSelector((state) => state.addresses?.items || []);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleOpenModal = (address = null) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const addressData = Object.fromEntries(formData);

    if (editingAddress) {
      dispatch(updateAddress({ ...editingAddress, ...addressData }));
    } else {
      dispatch(addAddress({ ...addressData, isDefault: false }));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-black uppercase tracking-tight">Saved Addresses</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ADD NEW TRIGGER */}
        <button 
          onClick={() => handleOpenModal()}
          className="h-[240px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center hover:border-black transition-all group"
        >
          <Icons icon="solar:add-circle-bold" size={32} />
          <span className="mt-4 text-[11px] font-black uppercase">Add New Address</span>
        </button>

        {/* DISPLAY CARDS */}
        {addresses.map((addr) => (
          <div 
            key={addr.id} 
            onClick={() => dispatch(setDefault(addr.id))}
            className={`relative h-[240px] p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              addr.isDefault ? 'border-black shadow-xl' : 'border-gray-100 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${addr.isDefault ? 'bg-black' : 'border-2 border-gray-200'}`}>
                {addr.isDefault && <Icons icon="solar:check-read-bold" size={12} className="text-white" />}
              </div>
              <div className="flex gap-2">
                 <button onClick={(e) => { e.stopPropagation(); handleOpenModal(addr); }} className="text-gray-400 hover:text-black">
                  <Icons icon="solar:pen-bold" size={18} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); dispatch(removeAddress(addr.id)); }} className="text-gray-300 hover:text-red-500">
                  <Icons icon="solar:trash-bin-minimalistic-bold" size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-black text-sm uppercase">{addr.fullName}</p>
              <p className="text-xs text-gray-500">{addr.street}, {addr.apartment}</p>
              <p className="text-xs text-gray-500">{addr.city}, {addr.state} {addr.zipCode}</p>
              <p className="text-[11px] font-bold text-black mt-4 pt-4 border-t border-gray-50">{addr.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* THE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleFormSubmit} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <h2 className="text-lg font-black uppercase mb-6">{editingAddress ? 'Edit' : 'New'} Address</h2>
            <div className="space-y-4">
              <input required name="fullName" defaultValue={editingAddress?.fullName} placeholder="FULL NAME" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
              <input required name="street" defaultValue={editingAddress?.street} placeholder="STREET ADDRESS" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
              <input name="apartment" defaultValue={editingAddress?.apartment} placeholder="APT / SUITE (OPTIONAL)" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
              <div className="flex gap-4">
                <input required name="city" defaultValue={editingAddress?.city} placeholder="CITY" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
                <input required name="zipCode" defaultValue={editingAddress?.zipCode} placeholder="ZIP" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
              </div>
              <input required name="phone" defaultValue={editingAddress?.phone} placeholder="PHONE" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase" />
            </div>
            <div className="flex gap-4 mt-10">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-[10px] font-black uppercase border border-gray-200 rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 py-3 text-[10px] font-black uppercase bg-black text-white rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditAddress;