import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Fixed: Use useNavigate hook
import useSWR from "swr";
import Icons from "../../components/ui/Icon";
import { GenericTable } from "../../components/partials/table/GenericTable";
import { productTable } from "../../utils/Constants";
import { addProduct, editProduct, deleteProduct } from "../../utils/service/apiService"; 
import { ToastContainer, toast } from "react-toastify";
import PageHeader from "../../components/partials/table/PageHeader";
import KpiCard from "../../components/admin_component/KpiCards";

function ProductMgt() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate(); // Fixed: useNavigate instead of Navigate

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeModal, setActiveModal] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // File States
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    const { data, mutate, isLoading } = useSWR('/api/product/');

    // Memoize raw data extraction
    const rawProducts = useMemo(() => {
        if (!data) return [];
        const items = data?.products || data?.data || data;
        return Array.isArray(items) ? items : [];
    }, [data]);

    // Extract unique categories for the PageHeader dropdown
    const categories = useMemo(() => {
        const uniqueCats = new Set(rawProducts.map(p => p.category).filter(Boolean));
        return ["All Categories", ...Array.from(uniqueCats)];
    }, [rawProducts]);

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return rawProducts.filter((product) => {
            const matchesSearch = 
                product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                product.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [rawProducts, searchQuery, selectedCategory]);

    const isFiltered = searchQuery !== "" || selectedCategory !== "All Categories";

    // Authentication Guard
    useEffect(() => { 
        if (!token) navigate('/login'); 
    }, [token, navigate]);

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("All Categories");
    };

    const handleClose = () => {
        setActiveModal(null);
        setSelectedProduct(null);
        setThumbnailFile(null);
        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview(null);
        galleryPreviews.forEach(url => URL.revokeObjectURL(url));
        setGalleryFiles([]);
        setGalleryPreviews([]);
    };

    const handleDelete = async () => {
        if (!selectedProduct) return;
        const id = selectedProduct._id || selectedProduct.id;
        setIsSubmitting(true);
        try {
            await deleteProduct(id, token);
            toast.success("Product deleted successfully");
            mutate();
            handleClose();
        } catch (err) {
            toast.error("Failed to delete product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.target;
        const id = selectedProduct?._id || selectedProduct?.id;

        try {
            if (activeModal === 'add') {
                const formData = new FormData();
                formData.append("name", form.name.value);
                formData.append("price", form.price.value);
                formData.append("stock", form.stock.value);
                formData.append("category", form.category.value);
                formData.append("description", form.description.value);
                
                if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
                galleryFiles.forEach(file => formData.append("images", file));

                await addProduct(token, formData);
                toast.success("Product Created!");
            } else {
                const payload = {
                    name: form.name.value,
                    price: Number(form.price.value),
                    stock: Number(form.stock.value),
                    category: form.category.value,
                    description: form.description.value,
                };
                await editProduct(id, token, payload);
                toast.success("Product Updated!");
            }
            mutate();
            handleClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
            <ToastContainer position="bottom-right" autoClose={2000} />
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Product Management</h1>
                    <p className="text-sm text-slate-500">Manage your inventory and product details</p>
                </div>
                <button onClick={() => setActiveModal('add')} className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-black/10">
                    <Icons icon="heroicons:plus" size={20}/> ADD PRODUCT
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <KpiCard title="Total Inventory" value={rawProducts.length} />
                 <KpiCard title="Items In Stock" value={rawProducts.filter(p => p.stock > 0).length} />
                 <KpiCard title="Out of Stock" value={rawProducts.filter(p => p.stock <= 0).length} />
             </div>

            <PageHeader 
                itemCount={filteredProducts.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onReset={handleReset}
                isFiltered={isFiltered}
                title="Products Found"
                onFilterClick={() => {}} 
            />

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                {isLoading ? (
                    <div className="p-20 text-center flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-black rounded-full animate-spin"></div>
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Loading Catalog...</span>
                    </div>
                ) : (
                    <GenericTable 
                        // Fixed: Pass filteredProducts, not rawProducts
                        columns={productTable(
                            (p) => { setSelectedProduct(p); setActiveModal('edit'); },
                            (p) => { setSelectedProduct(p); setActiveModal('delete'); }
                        )} 
                        data={filteredProducts} 
                    />
                )}
            </div>

            {/* ADD / EDIT MODAL */}
             {activeModal && activeModal !== 'delete' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-sm font-black uppercase tracking-wider">{activeModal} Product</h2>
                            <button onClick={handleClose} className="text-slate-400 hover:text-black"><Icons icon="heroicons:x-mark" size={22}/></button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                
                                {/* Image Upload (Only shown in ADD mode) */}
                                {activeModal === 'add' && (
                                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Main Thumbnail</label>
                                            <div className="relative h-28 border-2 border-dashed rounded-xl flex items-center justify-center bg-white overflow-hidden">
                                                {thumbnailPreview ? <img src={thumbnailPreview} className="h-full w-full object-cover" /> : <Icons icon="heroicons:photo" className="text-slate-200" size={30}/>}
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setThumbnailFile(file);
                                                    setThumbnailPreview(URL.createObjectURL(file));
                                                }} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Gallery</label>
                                            <div className="flex gap-2">
                                                {galleryPreviews.slice(0, 3).map((src, i) => (
                                                    <div key={i} className="h-12 w-12 rounded-lg border overflow-hidden"><img src={src} className="h-full w-full object-cover" /></div>
                                                ))}
                                                <label className="h-12 w-12 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer text-slate-300">
                                                    <Icons icon="heroicons:plus" />
                                                    <input type="file" multiple className="hidden" onChange={(e) => {
                                                        const files = Array.from(e.target.files);
                                                        setGalleryFiles(prev => [...prev, ...files]);
                                                        setGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
                                                    }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Form Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Name</label>
                                        <input name="name" defaultValue={selectedProduct?.name} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Price</label>
                                        <input name="price" type="number" step="0.01" defaultValue={selectedProduct?.price} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Stock</label>
                                        <input name="stock" type="number" defaultValue={selectedProduct?.stock} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Category</label>
                                        <input name="category" defaultValue={selectedProduct?.category} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Description</label>
                                        <textarea name="description" defaultValue={selectedProduct?.description} rows="3" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none resize-none" />
                                    </div>
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 disabled:bg-slate-300 transition-all">
                                    {isSubmitting ? "Processing..." : `${activeModal} Product`}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {activeModal === 'delete' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icons icon="heroicons:trash" size={40} className="text-red-500"/>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Product?</h2>
                        <p className="text-slate-500 mb-8 px-4">
                            Are you sure you want to delete <span className="font-bold text-slate-800">"{selectedProduct?.name}"</span>? 
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={handleClose} className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                                Cancel
                            </button>
                            <button onClick={handleDelete} disabled={isSubmitting} className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-200 disabled:bg-red-300 transition-all">
                                {isSubmitting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductMgt;