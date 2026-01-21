import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, AlertCircle, Loader2 } from 'lucide-react';

const addressSchema = z.object({
    full_name: z.string().min(2, "Full name is required"),
    street_address: z.string().min(5, "Street address is required"),
    apartment: z.string().min(1, "Apartment/Flat is required"),
    city: z.string().min(2, "City is required"),
    zip: z.string().regex(/^[0-9]{6}$/, "Zip must be 6 digits"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
});

const AddressModal = ({ isOpen, onClose, onSave, isSaving }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(addressSchema)
    });

    if (!isOpen) return null;

    const onSubmit = (data) => {
        onSave(data);
        reset();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white border-2 border-black w-full max-w-lg p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 hover:rotate-90 transition-transform">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Add New Address</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Full Name" name="full_name" register={register} error={errors.full_name} placeholder="Udit Kumar" />
                        <InputGroup label="Phone" name="phone" register={register} error={errors.phone} placeholder="9999999222" />
                    </div>
                    <InputGroup label="Street Address" name="street_address" register={register} error={errors.street_address} placeholder="Kundan Colony" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputGroup label="Flat/Apartment" name="apartment" register={register} error={errors.apartment} placeholder="Flat 404" />
                        <InputGroup label="City" name="city" register={register} error={errors.city} placeholder="Delhi" />
                        <InputGroup label="Zip" name="zip" register={register} error={errors.zip} placeholder="452021" />
                    </div>
                    <button type="submit" disabled={isSaving} className="w-full bg-black text-white py-4 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 mt-4">
                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : "Save Address"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputGroup = ({ label, name, register, error, placeholder }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black uppercase text-zinc-400">{label}</label>
        <input {...register(name)} placeholder={placeholder} className={`border-b-2 p-2 text-sm outline-none transition-colors ${error ? 'border-red-500' : 'border-zinc-200 focus:border-black'}`} />
        {error && <span className="text-red-500 text-[9px] font-bold uppercase flex items-center gap-1 mt-1"><AlertCircle size={10}/> {error.message}</span>}
    </div>
);

export default AddressModal;