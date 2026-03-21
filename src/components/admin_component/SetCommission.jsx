import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setCommission, viewCommission } from '../../utils/service/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { Loader2, Percent, Save, ShieldCheck, Activity,ArrowLeft,  Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SetCommission = () => {
    const token = useSelector((state) => state.auth?.token);
    const navigate = useNavigate();
    
    // --- Data Fetching ---
    const { data: commissionData, isLoading, refetch: mutate } = useQuery({
        queryKey: ["/api/admin/commission-levels", token],
        queryFn: () => viewCommission(token).then(res => res.data?.levels || []), // Access res.data.levels
        enabled: !!token
    });

    const levels = [1, 2, 3, 4, 5];
    const [commissionValues, setCommissionValues] = useState({});
    // Tracks the ID of the level currently being updated
    const [activeUpdatingLevel, setActiveUpdatingLevel] = useState(null);

    // Sync input state when data is fetched from the backend
    useEffect(() => {
        if (commissionData && Array.isArray(commissionData)) {
            const initialValues = {};
            commissionData.forEach(item => {
                initialValues[item.level] = item.percentage;
            });
            setCommissionValues(initialValues);
        }
    }, [commissionData]);

    const handleInputChange = (level, value) => {
        // Only allow changes if no other level is currently being updated
        if (activeUpdatingLevel !== null) return; 
        setCommissionValues(prev => ({ ...prev, [level]: value }));
    };

    const handleUpdate = async (level) => {
        // Block if another update is already in progress
        if (activeUpdatingLevel !== null) return;

        const percentage = Number(commissionValues[level]);

        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
            toast.error(`Invalid percentage for Level ${level}`);
            return;
        }

        setActiveUpdatingLevel(level); // Lock UI to this specific level
        
        try {
            const response = await setCommission(token, level, { percentage });
            if (response.data.success) {
                toast.success(`L${level} Updated`);
                await mutate(); // Refresh the list
            }
        } catch (error) {
            toast.error(error.response?.data?.message || `Update Failed`);
        } finally {
            setActiveUpdatingLevel(null); // Unlock UI
        }
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-400">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="text-[10px] font-black uppercase tracking-widest">Loading Settings...</p>
        </div>
    );

    return (
        <div className="p-4 md:p-6 max-w-xl mx-auto space-y-4">
            <ToastContainer position="bottom-right" theme="light" hideProgressBar autoClose={2000} />
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-black transition-all font-black text-[10px] uppercase tracking-widest bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                    <ArrowLeft size={14} /> Back
                </button>
            </div>

            <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-black text-white rounded-xl shadow-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <h1 className="text-lg font-black text-gray-800 tracking-tight uppercase">Commission Percentage Settings</h1>
                </div>
                {activeUpdatingLevel && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100 animate-pulse">
                        <Lock size={12} className="text-amber-500" />
                        <span className="text-[9px] font-black text-amber-600 uppercase">Update Locked</span>
                    </div>
                )}
            </div>

            <div className="grid gap-2">
                {levels.map((level) => {
                    const liveItem = commissionData?.find(d => d.level === level);
                    const isUpdatingThis = activeUpdatingLevel === level;
                    const isOtherUpdating = activeUpdatingLevel !== null && activeUpdatingLevel !== level;
                    
                    return (
                        <div 
                            key={level} 
                            className={`bg-white border rounded-2xl p-3 flex items-center justify-between transition-all shadow-sm ${
                                isOtherUpdating ? 'opacity-40 grayscale pointer-events-none' : 'border-gray-100'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center font-black text-white text-[10px]">
                                    {level}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-gray-800 text-[9px] uppercase tracking-widest">Level {level}</span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                                        Live: <span className="text-black">{liveItem?.percentage || '0.00'}%</span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative w-24">
                                    <input 
                                        type="number" 
                                        disabled={isOtherUpdating}
                                        value={commissionValues[level] || ""}
                                        onChange={(e) => handleInputChange(level, e.target.value)}
                                        className="w-full h-9 pl-3 pr-7 bg-gray-50 border border-transparent rounded-lg font-black text-[11px] outline-none focus:bg-white focus:border-black transition-all"
                                        placeholder="0.00"
                                    />
                                    <Percent size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>

                                <button 
                                    onClick={() => handleUpdate(level)}
                                    disabled={activeUpdatingLevel !== null}
                                    className="h-9 px-4 bg-black text-white rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center gap-2 hover:bg-zinc-800 disabled:bg-gray-100 transition-all active:scale-95 shadow-md"
                                >
                                    {isUpdatingThis ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />}
                                    <span>{isUpdatingThis ? 'Saving' : 'Save'}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SetCommission;