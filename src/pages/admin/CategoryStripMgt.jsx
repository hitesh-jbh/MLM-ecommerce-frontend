import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaPlus, FaTimes, FaMinus, FaPen, FaFolder } from 'react-icons/fa';
import { LuImage } from "react-icons/lu"; 
import { toast } from 'react-toastify';
import api from '../../utils/api/axiosInstance';

const CategoryManagement = () => {
  const queryClient = useQueryClient();
  
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  
  // formData में 'id' जोड़ दिया है ताकि पता चले कि Edit हो रहा है या Add
  const [formData, setFormData] = useState({ id: null, name: '', parent_id: '', image: null });
  const [preview, setPreview] = useState(null);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: async () => {
      const res = await api.get('/api/categories');
      return res.data.data || res.data || [];
    }
  });

  const mainCategories = categories.filter(cat => !cat.parent_id);

  const toggleRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // --- MODAL HANDLERS ---
  const closeModals = () => {
    setIsMainModalOpen(false);
    setIsSubModalOpen(false);
    setFormData({ id: null, name: '', parent_id: '', image: null });
    setPreview(null);
  };

  const handleAddNewMain = () => {
    closeModals();
    setIsMainModalOpen(true);
  };

  const handleEditMain = (cat) => {
    setFormData({ id: cat.id || cat._id, name: cat.name, parent_id: '', image: null });
    setIsMainModalOpen(true);
  };

  const handleAddNewSub = (parentId = '') => {
    closeModals();
    setFormData({ id: null, name: '', parent_id: parentId, image: null });
    setIsSubModalOpen(true);
  };

  const handleEditSub = (sub) => {
    setFormData({ id: sub.id || sub._id, name: sub.name, parent_id: sub.parent_id || '', image: null });
    setPreview(sub.image_url || sub.image);
    setIsSubModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // --- UNIFIED SAVE API (Add & Edit) ---
  const saveCategoryMutation = useMutation({
    mutationFn: async (categoryData) => {
      const form = new FormData();
      form.append('name', categoryData.name);
      
      const slug = categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      form.append('slug', slug);
      
      if (categoryData.parent_id) form.append('parent_id', categoryData.parent_id);
      
      // इमेज तभी भेजेंगे जब कोई नई फाइल सेलेक्ट की गई हो
      if (categoryData.image) form.append('image', categoryData.image);
      
      // अगर ID है, तो PUT (Edit), नहीं तो POST (Add)
      if (categoryData.id) {
        return await api.put(`/api/categories/${categoryData.id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        return await api.post('/api/categories/add', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminCategories']);
      toast.success(formData.id ? 'Category updated successfully!' : 'Category created successfully!');
      closeModals();
    },
    onError: (error) => toast.error(`Error: ${error.response?.data?.message || 'Failed to save'}`)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await api.delete(`/api/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminCategories']);
      toast.success('Deleted successfully!');
    }
  });

  const submitMainCategory = (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error('Name is required');
    saveCategoryMutation.mutate(formData);
  };

  const submitSubCategory = (e) => {
    e.preventDefault();
    if (!formData.parent_id) return toast.error('Please select a Parent');
    if (!formData.name) return toast.error('Name is required');
    // नया बनाते समय इमेज ज़रूरी है, एडिट करते समय नहीं
    if (!formData.id && !formData.image) return toast.error('Image is required');
    
    saveCategoryMutation.mutate(formData);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="p-8 bg-[#f9fafb] min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Categories</h1>
          <p className="text-gray-500 text-sm mt-1 font-sans">Organize how products are grouped and browsed across the storefront.</p>
        </div>
        <div>
          <button 
            onClick={handleAddNewMain}
            className="flex items-center gap-2 bg-[#0f172a] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-black transition shadow-sm text-sm"
          >
            <FaPlus size={14} /> New Category
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden font-sans">
        
        <div className="grid grid-cols-12 gap-4 py-4 px-6 border-b border-gray-200 bg-[#fbfbfb] text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <div className="col-span-6 md:col-span-5">Category</div>
          <div className="col-span-2 hidden md:block">Type</div>
          <div className="col-span-2 hidden md:block">Parent</div>
          <div className="col-span-2 hidden md:block">Created</div>
          <div className="col-span-6 md:col-span-1 text-right"></div>
        </div>

        <div className="flex flex-col">
          {isLoading ? (
            <div className="p-10 text-center text-gray-500">Loading categories...</div>
          ) : mainCategories.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No categories found.</div>
          ) : (
            mainCategories.map((mainCat) => {
              const mainId = mainCat.id || mainCat._id;
              const subCats = mainCat.subCategories?.length > 0 
                ? mainCat.subCategories 
                : categories.filter(c => c.parent_id === mainId);
              
              const hasSubs = subCats.length > 0;
              const isExpanded = expandedRows[mainId] !== false; 

              return (
                <div key={mainId} className="flex flex-col">
                  
                  {/* --- ROOT ROW --- */}
                  <div className="group grid grid-cols-12 gap-4 items-center py-5 px-6 border-b border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="col-span-6 md:col-span-5 flex items-center gap-5">
                      <button 
                        onClick={() => hasSubs && toggleRow(mainId)}
                        className={`w-6 h-6 flex items-center justify-center border rounded bg-white text-slate-600 transition-colors ${hasSubs ? 'border-slate-300 hover:border-slate-500 cursor-pointer shadow-sm' : 'border-slate-200 opacity-40 cursor-default'}`}
                      >
                        {hasSubs && isExpanded ? <FaMinus size={10} /> : (hasSubs ? <FaPlus size={10} /> : null)}
                      </button>
                      
                      <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center border border-slate-200 shrink-0 shadow-sm text-slate-500">
                         <FaFolder size={20} />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-[15px]">{mainCat.name}</span>
                        <span className="text-[13px] text-slate-500 font-mono mt-0.5">/{mainCat.slug}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-2 hidden md:flex items-center">
                      <span className="px-3 py-1 rounded-md bg-[#ecfdf5] text-[#065f46] text-[12px] font-semibold tracking-wide border border-[#d1fae5]">Root</span>
                    </div>
                    
                    <div className="col-span-2 hidden md:flex items-center text-[14px] text-slate-400 font-medium">—</div>

                    <div className="col-span-2 hidden md:flex items-center text-[14px] text-slate-500">
                      {formatDate(mainCat.created_at)}
                    </div>
                    
                    {/* ROOT ACTIONS */}
                    <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-2 text-slate-400">
                      <button onClick={() => handleAddNewSub(mainId)} className="p-2 hover:bg-slate-200 hover:text-slate-800 rounded-md transition-colors" title="Add Sub-Category">
                        <FaPlus size={16} />
                      </button>
                      <button onClick={() => handleEditMain(mainCat)} className="p-2 hover:bg-slate-200 hover:text-slate-800 rounded-md transition-colors" title="Edit">
                        <FaPen size={16} />
                      </button>
                      <button 
                        onClick={() => { if(window.confirm('Delete this Root Category?')) deleteMutation.mutate(mainId); }}
                        className="p-2 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors" title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>

                  {/* --- SUB CATEGORIES --- */}
                  {isExpanded && hasSubs && (
                    <div className="relative bg-white">
                      <div className="absolute left-[35px] top-0 bottom-0 w-px bg-slate-300 z-0"></div>

                      {subCats.map((sub, index) => {
                        const isLast = index === subCats.length - 1;
                        return (
                          <div key={sub.id || sub._id} className="group relative grid grid-cols-12 gap-4 items-center py-4 px-6 border-b border-gray-100 hover:bg-slate-50 transition-colors z-10">
                            
                            <div className="col-span-6 md:col-span-5 flex items-center gap-4 pl-[48px] relative">
                              <div className="absolute left-0 top-1/2 w-6 h-px bg-slate-300 -translate-y-1/2"></div>
                              <div className="absolute left-[22px] top-1/2 w-2 h-2 border-[1.5px] border-slate-400 rounded-full bg-white -translate-y-1/2 z-10"></div>
                              
                              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 overflow-hidden shrink-0 shadow-sm ml-1">
                                {sub.image_url || sub.image ? (
                                  <img src={sub.image_url || sub.image} alt={sub.name} className="w-full h-full object-cover" />
                                ) : (
                                  <LuImage className="text-gray-400" size={20} />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-800 text-[14.5px]">{sub.name}</span>
                                <span className="text-[12px] text-gray-500 font-mono mt-0.5">/{sub.slug}</span>
                              </div>
                            </div>

                            <div className="col-span-2 hidden md:flex items-center">
                              <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-[12px] font-semibold tracking-wide border border-slate-200">Sub</span>
                            </div>

                            <div className="col-span-2 hidden md:flex items-center text-[14px] text-gray-500 font-medium">
                              {mainCat.name}
                            </div>

                            <div className="col-span-2 hidden md:flex items-center text-[14px] text-gray-500">
                              {formatDate(sub.created_at)}
                            </div>

                            {/* SUB ACTIONS */}
                            <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-2 text-slate-400">
                              <button onClick={() => handleEditSub(sub)} className="p-2 hover:bg-slate-200 hover:text-slate-800 rounded-md transition-colors" title="Edit">
                                <FaPen size={15} />
                              </button>
                              <button 
                                onClick={() => { if(window.confirm('Delete this Sub-Category?')) deleteMutation.mutate(sub.id || sub._id); }}
                                className="p-2 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors" title="Delete"
                              >
                                <FaTrash size={15} />
                              </button>
                            </div>
                            
                            {isLast && <div className="absolute left-[34px] top-1/2 bottom-0 w-[3px] bg-white z-0"></div>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* =========================================
          DYNAMIC MODAL: ROOT CATEGORY
      ========================================= */}
      {isMainModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{formData.id ? 'Edit Root Category' : 'Add Root Category'}</h2>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-800 transition"><FaTimes size={18}/></button>
            </div>
            <form onSubmit={submitMainCategory} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition text-sm" placeholder="e.g. Jewellery" required />
              </div>
              <button type="submit" disabled={saveCategoryMutation.isPending} className="w-full bg-[#0f172a] text-white font-medium py-2.5 rounded-lg hover:bg-black transition disabled:bg-gray-400 text-sm">
                {saveCategoryMutation.isPending ? 'Saving...' : (formData.id ? 'Update Category' : 'Save Category')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================
          DYNAMIC MODAL: SUB CATEGORY
      ========================================= */}
      {isSubModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{formData.id ? 'Edit Sub-Category' : 'Add Sub-Category'}</h2>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-800 transition"><FaTimes size={18}/></button>
            </div>
            <form onSubmit={submitSubCategory} className="p-6">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Category</label>
                <select value={formData.parent_id} onChange={(e) => setFormData({...formData, parent_id: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition text-sm bg-white" required>
                  <option value="">Select Parent...</option>
                  {mainCategories.map(cat => <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Category Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition text-sm" placeholder="e.g. Rings" required />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
                <div className="flex items-center gap-4">
                  {preview ? (
                    <img src={preview} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-gray-200 shadow-sm" />
                  ) : (
                    <div className="h-16 w-16 bg-gray-50 border border-gray-200 border-dashed rounded-lg flex items-center justify-center text-gray-400"><LuImage size={24} /></div>
                  )}
                  <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                    {preview ? 'Change Image' : 'Upload Image'}
                    <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required={!formData.id && !preview} />
                  </label>
                </div>
              </div>
              <button type="submit" disabled={saveCategoryMutation.isPending} className="w-full bg-[#0f172a] text-white font-medium py-2.5 rounded-lg hover:bg-black transition disabled:bg-gray-400 text-sm">
                {saveCategoryMutation.isPending ? 'Saving...' : (formData.id ? 'Update Sub-Category' : 'Save Sub-Category')}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryManagement;