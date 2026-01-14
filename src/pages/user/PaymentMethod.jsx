import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPaymentMethod, setDefaultPayment, removePaymentMethod } from '../../utils/Slice/paymentSlice';
import Icons from '../../components/ui/Icon';

const PaymentMethods = () => {
  const payments = useSelector((state) => state.payments?.items || []);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCard = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Logic to determine brand (Simulated)
    const brand = data.cardNumber.startsWith('4') ? 'visa' : 'mastercard';
    const last4 = data.cardNumber.slice(-4);

    dispatch(addPaymentMethod({
      type: 'card',
      brand,
      last4,
      expiry: data.expiry,
      holderName: data.holderName,
      isDefault: false
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-black uppercase tracking-tight">Payment Options</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-zinc-800 transition-all"
        >
          Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {payments.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-gray-100 rounded-3xl py-20 flex flex-col items-center justify-center text-gray-400">
            <Icons icon="solar:card-2-bold" size={48} />
            <p className="mt-4 text-xs font-bold uppercase tracking-widest">No saved cards found</p>
          </div>
        ) : (
          payments.map((method) => (
            <div 
              key={method.id}
              onClick={() => dispatch(setDefaultPayment(method.id))}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                method.isDefault ? 'border-black shadow-lg bg-white' : 'border-gray-100 bg-gray-50/50'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                  <Icons icon={method.brand === 'visa' ? 'logos:visa' : 'logos:mastercard'} size={32} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">•••• •••• •••• {method.last4}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                    Expires {method.expiry} • {method.holderName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {method.isDefault && <Icons icon="solar:check-read-bold" size={18} className="text-black" />}
                <button 
                  onClick={(e) => { e.stopPropagation(); dispatch(removePaymentMethod(method.id)); }}
                  className="text-gray-300 hover:text-red-500"
                >
                  <Icons icon="solar:trash-bin-minimalistic-bold" size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD CARD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddCard} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-200">
            <h2 className="text-lg font-black uppercase mb-8 tracking-tighter">Add Payment Method</h2>
            
            <div className="space-y-6">
              <div className="relative">
                <input required name="cardNumber" maxLength="16" placeholder="CARD NUMBER" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase tracking-widest" />
                <div className="absolute right-0 top-2 text-gray-300">
                   <Icons icon="solar:card-bold" size={18} />
                </div>
              </div>
              
              <input required name="holderName" placeholder="CARDHOLDER NAME" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase tracking-widest" />
              
              <div className="flex gap-6">
                <input required name="expiry" placeholder="MM/YY" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase tracking-widest" />
                <input required name="cvv" maxLength="3" type="password" placeholder="CVV" className="w-full border-b-2 border-gray-100 py-2 focus:border-black outline-none text-xs font-bold uppercase tracking-widest" />
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-[10px] font-black uppercase border-2 border-gray-100 rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 py-4 text-[10px] font-black uppercase bg-black text-white rounded-xl shadow-xl shadow-black/10">Save Card</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;