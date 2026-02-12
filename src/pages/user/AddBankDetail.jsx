import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addBank, getBank, updateBank, deleteBank } from "../../utils/service/apiService"; 
import Icons from "../../components/ui/Icon";

// --- Validation Schema Matched to Backend Keys (image_ee9ba8.png) ---
const bankSchema = z.object({
  account_holder_name: z.string().min(3, "NAME MUST BE AT LEAST 3 CHARACTERS"),
  account_number: z.string().min(9, "INVALID ACCOUNT NUMBER").regex(/^\d+$/, "NUMBERS ONLY"),
  ifsc_code: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "INVALID IFSC (e.g. SBIN0123456)"),
  bank_name: z.string().min(2, "BANK NAME IS REQUIRED"),
  registered_email: z.string().email("INVALID REGISTERED EMAIL"),
  registered_mobile: z.string().min(10, "MIN 10 DIGITS").max(12, "MAX 12 DIGITS").regex(/^\d+$/, "NUMBERS ONLY"),
});

const AddBankDetail = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBank, setEditingBank] = useState(null);

  // --- 1. GET API Implementation (Accessing res.data.data) ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: async () => {
      const res = await getBank();
      // res.data is the full object { success: true, data: [...] }
      return res.data?.data || []; 
    },
  });

  // Safe array fallback to prevent image_ef08c3.png crash
  const accounts = Array.isArray(data) ? data : [];

  // --- 2. POST API Implementation ---
  const addMutation = useMutation({
    mutationFn: addBank,
    onSuccess: () => {
      queryClient.invalidateQueries(["bankAccounts"]);
      handleCloseModal();
    },
  });

  // --- 3. PUT API Implementation ---
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateBank(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["bankAccounts"]);
      handleCloseModal();
    },
  });

  // --- 4. DELETE API Implementation ---
  const deleteMutation = useMutation({
    mutationFn: deleteBank,
    onSuccess: () => {
      queryClient.invalidateQueries(["bankAccounts"]);
    },
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(bankSchema),
    mode: "onChange",
  });

  // Prefill form when editing using backend keys
  useEffect(() => {
    if (editingBank) {
      setValue("account_holder_name", editingBank.account_holder_name);
      setValue("account_number", editingBank.account_number);
      setValue("ifsc_code", editingBank.ifsc_code);
      setValue("bank_name", editingBank.bank_name);
      setValue("registered_email", editingBank.registered_email);
      setValue("registered_mobile", editingBank.registered_mobile);
    }
  }, [editingBank, setValue]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBank(null);
    reset();
  };

  const onFormSubmit = (formData) => {
    const payload = {
      ...formData,
      ifsc_code: formData.ifsc_code.toUpperCase(),
      is_default: editingBank ? editingBank.is_default : true, 
    };

    if (editingBank) {
      updateMutation.mutate({ id: editingBank.id, payload });
    } else {
      addMutation.mutate(payload);
    }
  };

  // Guard against crashes while loading or on error (image_ef6e1c.png)
  if (isLoading) return <div className="p-10 text-center font-black uppercase">Loading Accounts...</div>;
  if (isError) return <div className="p-10 text-center text-red-500 font-black uppercase">Failed to load data</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Bank Accounts</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Manage your payout destinations
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-zinc-800 transition-all"
        >
          Add Bank Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-gray-100 rounded-3xl py-24 flex flex-col items-center justify-center text-gray-300">
            <Icons icon="solar:bank-bold" size={48} />
            <p className="mt-4 text-xs font-bold uppercase tracking-widest">No bank accounts linked</p>
          </div>
        ) : (
          accounts.map((acc) => (
            <div
              key={acc.id}
              className={`p-8 rounded-3xl border-2 transition-all flex items-center justify-between ${
                acc.is_default ? "border-black bg-white shadow-lg" : "border-gray-100 bg-gray-50/50"
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
                  <Icons icon="heroicons:building-library" size={28} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-tight">
                    {acc.bank_name} • {acc.account_number}
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">
                    IFSC: {acc.ifsc_code} • {acc.account_holder_name}
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">
                    Status: {acc.status} 
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => { setEditingBank(acc); setIsModalOpen(true); }}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <Icons icon="solar:pen-bold" size={20} />
                </button>
                <button
                  onClick={() => { if(window.confirm("Delete this account?")) deleteMutation.mutate(acc.id); }}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Icons icon="solar:trash-bin-minimalistic-bold" size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl relative overflow-y-auto max-h-[90vh] scrollbar-hide"
          >
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-black">
                {editingBank ? "Update Bank Account" : "Link New Account"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="md:col-span-2">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Account Holder Name</label>
                <input {...register("account_holder_name")} placeholder="AS PER BANK RECORDS" className="w-full border-b-2 py-3 focus:border-black outline-none text-xs font-bold uppercase" />
                {errors.account_holder_name && <p className="text-red-600 text-[9px] font-bold mt-1 uppercase">{errors.account_holder_name.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Account Number</label>
                <input {...register("account_number")} placeholder="ENTER ACCOUNT NUMBER" className="w-full border-b-2 py-3 focus:border-black outline-none text-xs font-bold uppercase" />
                {errors.account_number && <p className="text-red-600 text-[9px] font-bold mt-1 uppercase">{errors.account_number.message}</p>}
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">IFSC Code</label>
                <input {...register("ifsc_code")} placeholder="HDFC0123456" className="w-full border-b-2 py-3 focus:border-black outline-none text-xs font-bold uppercase" />
                {errors.ifsc_code && <p className="text-red-600 text-[9px] font-bold mt-1 uppercase">{errors.ifsc_code.message}</p>}
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Bank Name</label>
                <input {...register("bank_name")} placeholder="E.G. HDFC BANK" className="w-full border-b-2 py-3 focus:border-black outline-none text-xs font-bold uppercase" />
                {errors.bank_name && <p className="text-red-600 text-[9px] font-bold mt-1 uppercase">{errors.bank_name.message}</p>}
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Registered Email</label>
                <input {...register("registered_email")} placeholder="EMAIL@BANK.COM" className="w-full border-b-2 py-3 focus:border-black outline-none text-xs font-bold uppercase" />
                {errors.registered_email && <p className="text-red-600 text-[9px] font-bold mt-1 uppercase">{errors.registered_email.message}</p>}
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Registered Number</label>
                <input {...register("registered_mobile")} placeholder="98XXXXXXXX" className="w-full border-b-2 py-3 focus:border-black outline-none text-xs font-bold uppercase" />
                {errors.registered_mobile && <p className="text-red-600 text-[9px] font-bold mt-1 uppercase">{errors.registered_mobile.message}</p>}
              </div>
            </div>

            <div className="flex gap-6 mt-16">
              <button type="button" onClick={handleCloseModal} className="flex-1 py-5 text-[10px] font-black uppercase border-2 rounded-2xl">
                Discard
              </button>
              <button 
                type="submit" 
                disabled={addMutation.isPending || updateMutation.isPending}
                className="flex-1 py-5 text-[10px] font-black uppercase bg-black text-white rounded-2xl shadow-xl disabled:bg-gray-400"
              >
                {addMutation.isPending || updateMutation.isPending ? "Processing..." : (editingBank ? "Update Details" : "Link Account")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBankDetail;






// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   addBankAccount,
//   removeBankAccount,
//   setPrimaryAccount,
// } from "../../utils/slice/bankSlice";
// import Icons from "../../components/ui/Icon";

// // --- Validation Schema updated with RBI IFSC Rules & New Fields ---
// const bankSchema = z.object({
//   holderName: z.string().min(3, "NAME MUST BE AT LEAST 3 CHARACTERS"),
//   accountNumber: z
//     .string()
//     .min(9, "INVALID ACCOUNT NUMBER")
//     .regex(/^\d+$/, "NUMBERS ONLY"),
//   // RBI IFSC: 4 Alpha, 5th is '0', 6-11 Alphanumeric
//   ifsc: z
//     .string()
//     .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "INVALID IFSC (e.g. SBIN0123456)"),
//   bankName: z.string().min(2, "BANK NAME IS REQUIRED"),
//   registeredEmail: z.string().email("INVALID REGISTERED EMAIL"),
//   registeredNumber: z
//     .string()
//     .min(10, "MIN 10 DIGITS")
//     .max(12, "MAX 12 DIGITS")
//     .regex(/^\d+$/, "NUMBERS ONLY"),
// });

// const AddBankDetail = () => {
//   const accounts = useSelector((state) => state.banks?.accounts || []);
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(bankSchema),
//     mode: "onChange",
//   });

//   const onFormSubmit = (data) => {
//     const payload = {
//       ...data,
//       ifsc: data.ifsc.toUpperCase(),
//       last4: data.accountNumber.slice(-4),
//     };
//     dispatch(addBankAccount(payload));
//     setIsModalOpen(false);
//     reset();
//   };

//   const errorStyle =
//     "text-[9px] text-red-600 font-bold mt-1 uppercase tracking-tighter";

//   return (
//     <div className="max-w-6xl mx-auto p-6 font-sans">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-2xl font-black uppercase tracking-tight">
//             Bank Accounts
//           </h1>
//           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
//             Manage your payout destinations
//           </p>
//         </div>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-zinc-800 transition-all shadow-lg shadow-black/10"
//         >
//           Add Bank Account
//         </button>
//       </div>

//       {/* Account Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {accounts.length === 0 ? (
//           <div className="col-span-full border-2 border-dashed border-gray-100 rounded-3xl py-24 flex flex-col items-center justify-center text-gray-300">
//             <Icons icon="solar:bank-bold" size={48} />
//             <p className="mt-4 text-xs font-bold uppercase tracking-widest">
//               No bank accounts linked
//             </p>
//           </div>
//         ) : (
//           accounts.map((acc) => (
//             <div
//               key={acc.id}
//               onClick={() => dispatch(setPrimaryAccount(acc.id))}
//               className={`p-8 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${
//                 acc.isPrimary
//                   ? "border-black shadow-xl bg-white scale-[1.02]"
//                   : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
//               }`}
//             >
//               <div className="flex items-center gap-6">
//                 <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-inner">
//                   <Icons
//                     icon="solar:bank-bold"
//                     size={28}
//                     className="text-white"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-black text-sm uppercase tracking-tight">
//                     {acc.bankName} •••• {acc.last4}
//                   </p>
//                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">
//                     IFSC: {acc.ifsc} • {acc.holderName}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 {acc.isPrimary && (
//                   <div className="bg-black text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest">
//                     Primary
//                   </div>
//                 )}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     dispatch(removeBankAccount(acc.id));
//                   }}
//                   className="text-gray-300 hover:text-red-500 transition-colors"
//                 >
//                   <Icons icon="solar:trash-bin-minimalistic-bold" size={20} />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* MODAL */}
//       {/* MODAL FIX */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
//           <form
//             onSubmit={handleSubmit(onFormSubmit)}
//             /* Added scrollbar-hide and expanded width to max-w-2xl */
//             className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl relative overflow-y-auto max-h-[90vh] scrollbar-hide"
//           >
//             <div className="mb-10 text-center">
//               <h2 className="text-2xl font-black uppercase tracking-tighter text-black">
//                 Link New Account
//               </h2>
//               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
//                 Enter your official bank details
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
//               {/* Full Width Fields */}
//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                   Account Holder Name
//                 </label>
//                 <input
//                   {...register("holderName")}
//                   placeholder="AS PER BANK RECORDS"
//                   className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none text-xs font-bold uppercase tracking-widest bg-transparent"
//                 />
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                   Account Number
//                 </label>
//                 <input
//                   {...register("accountNumber")}
//                   type="password"
//                   placeholder="ENTER ACCOUNT NUMBER"
//                   className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none text-xs font-bold uppercase tracking-widest bg-transparent"
//                 />
//               </div>

//               {/* Two-Column Fields */}
//               <div className="space-y-1">
//                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                   IFSC Code
//                 </label>
//                 <input
//                   {...register("ifsc")}
//                   placeholder="BANK0######"
//                   className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none text-xs font-bold uppercase tracking-widest bg-transparent"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                   Bank Name
//                 </label>
//                 <input
//                   {...register("bankName")}
//                   placeholder="E.G. HDFC BANK"
//                   className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none text-xs font-bold uppercase tracking-widest bg-transparent"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                   Registered Email
//                 </label>
//                 <input
//                   {...register("registeredEmail")}
//                   placeholder="EMAIL@BANK.COM"
//                   className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none text-xs font-bold uppercase tracking-widest bg-transparent"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">
//                   Registered Number
//                 </label>
//                 <input
//                   {...register("registeredNumber")}
//                   placeholder="98XXXXXXXX"
//                   className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none text-xs font-bold uppercase tracking-widest bg-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-6 mt-16">
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="flex-1 py-5 text-[10px] font-black uppercase border-2 border-gray-100 rounded-2xl hover:bg-gray-50 text-black"
//               >
//                 Discard
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 py-5 text-[10px] font-black uppercase bg-black text-white rounded-2xl shadow-xl"
//               >
//                 Link Account
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddBankDetail;
