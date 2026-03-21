import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createRank, viewRank } from '../../utils/service/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { Loader2, Trophy, Plus, Users, DollarSign, X, ArrowLeft, Award, Save, Home } from 'lucide-react';
import { GenericTable } from '../../components/partials/table/GenericTable';
import PageHeader from "../../components/partials/table/PageHeader";
import { rankTable } from '../../utils/constants';
import Icons from '../ui/Icon';

const RankMgt = () => {
    const token = useSelector((state) => state.auth?.token);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // --- Data Fetching ---
    const { data: rankData, isLoading, refetch: mutate } = useQuery({
        queryKey: ["/api/rank", token],
        queryFn: async () => {
            const res = await viewRank(token);
            console.log("Raw API Response:", res); // Check the structure here

            // Fix: Try multiple common paths, fallback to empty array
            // If res.data is the array itself, use it.
            const rawData = res.data?.ranks || res.data?.data || (Array.isArray(res.data) ? res.data : []);

            return rawData;
        },
        enabled: !!token,
        refetchOnWindowFocus: false,
        retry: false
    });

    // --- Search Logic ---
    const filteredRanks = useMemo(() => {
        const baseData = Array.isArray(rankData) ? rankData : [];

        if (!searchTerm.trim()) return baseData;

        return baseData.filter(item =>
            item.rank?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [rankData, searchTerm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = {
            rank: formData.get("rank"),
            referral_count: Number(formData.get("referral_count")),
            total_commission: Number(formData.get("total_commission")),
        };

        setIsSubmitting(true);
        try {
            const res = await createRank(token, payload);
            if (res.status === 200 || res.status === 201) {
                toast.success("New Rank Created Successfully");
                mutate();
                setIsModalOpen(false);
                e.target.reset();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create rank");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen bg-[#FBFBFB]">
            <ToastContainer position="bottom-right" theme="light" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 mb-6">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-black transition-all font-black text-[10px] uppercase tracking-widest bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            <ArrowLeft size={14} /> Back
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                        <div className="p-3 bg-black text-white rounded-2xl">
                            <Trophy size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Rank Management</h1>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-black/10"
                >
                    <Plus size={18} /> Create New Rank
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-32 flex flex-col items-center justify-center text-gray-300">
                        <Loader2 className="animate-spin mb-4" size={40} />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Hierarchy...</p>
                    </div>
                ) : (
                    <GenericTable
                        title={searchTerm ? `Results for "${searchTerm}"` : "Active Tiers"}
                        columns={rankTable}
                        // PASSING FILTERED DATA
                        data={filteredRanks}
                    />
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <Award className="text-amber-500" size={20} />
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">New Rank Configuration</h2>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-black">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rank Title</label>
                                <div className="relative">
                                    <input name="rank" required placeholder="e.g. Platinum" className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-black outline-none transition-all font-bold text-sm" />
                                    <Trophy size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Referral Requirement</label>
                                <div className="relative">
                                    <input name="referral_count" type="number" required placeholder="0" className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-black outline-none transition-all font-bold text-sm" />
                                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Total Commission Target (₹)</label>
                                <div className="relative">
                                    <input name="total_commission" type="number" required placeholder="0.00" className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-black outline-none transition-all font-bold text-sm" />
                                    <Icons icon="mdi:rupee" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                {isSubmitting ? "Processing..." : "Deploy Rank"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RankMgt;