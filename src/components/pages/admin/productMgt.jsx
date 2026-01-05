// import React, { useState } from "react";
// import KpiCard from "./KpiCards";
// import Icons from "../../ui/Icon";
// import { GenericTable } from "./GenericTable";
// import { productData, productTable } from "../../../utils/Constants";
// import { addProduct } from "../../../utils/Service/apiService"; // Ensure correct path

// function ProductMgt() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(false); // New: Loading state for button
//     const [error, setError] = useState(null); // New: Error feedback

//     const KpiData = [
//         { id: "1", title: "Total Products", value: "320" },
//         { id: "2", title: "In Stock Products", value: "240" },
//         { id: "3", title: "Out Of Stock", value: "20" },
//     ];

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setIsLoading(true);

//         const formData = new FormData(e.target);
//         const data = Object.fromEntries(formData.entries());
        
//         // Data Transformation: Ensure numeric values are sent as numbers
//         const payload = {
//             ...data,
//             price: parseFloat(data.price),
//             stock: parseInt(data.stock, 10)
//         };

//         try {
//             const response = await addProduct(payload);
            
//             if (response.data.success) {
//                 console.log("Product added successfully!");
//                 // OPTIONAL: Refresh your table data here if fetching from API
//                 setIsModalOpen(false); 
//             }
//         } catch (err) {
//             console.error("API Error:", err);
//             setError(err.response?.data?.message || "Failed to add product. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
            
//             {/* KPI Grid */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {KpiData.map((item) => (
//                     <KpiCard key={item.id} {...item} />
//                 ))}
//             </div>

//             {/* Action Bar */}
//             <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//                 <button 
//                     onClick={() => { setIsModalOpen(true); setError(null); }}
//                     className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-800 transition-all active:scale-95 w-full md:w-auto"
//                 >
//                     <Icons icon="heroicons:plus" size={18} className="text-white" />
//                     <span className="text-sm font-medium">Add New Product</span>
//                 </button>
//             </div>

//             {/* Add Product Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//                     <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
//                         <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                             <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
//                             <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
//                                 <Icons icon="heroicons:x-mark" size={20} />
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                             {/* Error Alert */}
//                             {error && (
//                                 <div className="p-3 text-xs font-semibold bg-red-50 text-red-600 border-l-4 border-red-600 rounded">
//                                     {error}
//                                 </div>
//                             )}

//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Name</label>
//                                 <input 
//                                     name="name" 
//                                     type="text" 
//                                     required 
//                                     placeholder="e.g. Premium T-Shirt"
//                                     className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-1">
//                                     <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Price</label>
//                                     <input 
//                                         name="price" 
//                                         type="number" 
//                                         step="0.01"
//                                         required 
//                                         placeholder="0.00"
//                                         className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                     />
//                                 </div>
//                                 <div className="space-y-1">
//                                     <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Stock Count</label>
//                                     <input 
//                                         name="stock" 
//                                         type="number" 
//                                         required 
//                                         placeholder="0"
//                                         className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Category</label>
//                                 <input 
//                                     name="category" 
//                                     type="text" 
//                                     required 
//                                     placeholder="e.g. Books, Electronics"
//                                     className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                 />
//                             </div>

//                             <div className="flex justify-center gap-3 pt-6">
//                                 <button 
//                                     type="button" 
//                                     disabled={isLoading}
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button 
//                                     type="submit"
//                                     disabled={isLoading}
//                                     className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-md shadow-sm transition-colors disabled:bg-gray-600"
//                                 >
//                                     {isLoading && <Icons icon="line-md:loading-twotone-loop" size={16} />}
//                                     {isLoading ? "Saving..." : "Save Product"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Edit Product Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//                     <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
//                         <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                             <h2 className="text-lg font-bold text-gray-900">Edit Product</h2>
//                             <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
//                                 <Icons icon="heroicons:x-mark" size={20} />
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                             {/* Error Alert */}
//                             {error && (
//                                 <div className="p-3 text-xs font-semibold bg-red-50 text-red-600 border-l-4 border-red-600 rounded">
//                                     {error}
//                                 </div>
//                             )}

//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Name</label>
//                                 <input 
//                                     name="name" 
//                                     type="text" 
//                                     required 
//                                     placeholder="e.g. Premium T-Shirt"
//                                     className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-1">
//                                     <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Price</label>
//                                     <input 
//                                         name="price" 
//                                         type="number" 
//                                         step="0.01"
//                                         required 
//                                         placeholder="0.00"
//                                         className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                     />
//                                 </div>
//                                 <div className="space-y-1">
//                                     <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Stock Count</label>
//                                     <input 
//                                         name="stock" 
//                                         type="number" 
//                                         required 
//                                         placeholder="0"
//                                         className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Category</label>
//                                 <input 
//                                     name="category" 
//                                     type="text" 
//                                     required 
//                                     placeholder="e.g. Books, Electronics"
//                                     className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                 />
//                             </div>

//                             <div className="flex justify-center gap-3 pt-6">
//                                 <button 
//                                     type="button" 
//                                     disabled={isLoading}
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button 
//                                     type="submit"
//                                     disabled={isLoading}
//                                     className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-md shadow-sm transition-colors disabled:bg-gray-600"
//                                 >
//                                     {isLoading && <Icons icon="line-md:loading-twotone-loop" size={16} />}
//                                     {isLoading ? "Editing..." : "Edit Product"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Product Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//                     <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
//                         <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//                             <h2 className="text-lg font-bold text-gray-900">Delete Product</h2>
//                             <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
//                                 <Icons icon="heroicons:x-mark" size={20} />
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                             {/* Error Alert */}
//                             {error && (
//                                 <div className="p-3 text-xs font-semibold bg-red-50 text-red-600 border-l-4 border-red-600 rounded">
//                                     {error}
//                                 </div>
//                             )}

//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Name</label>
//                                 <input 
//                                     name="name" 
//                                     type="text" 
//                                     required 
//                                     placeholder="e.g. Premium T-Shirt"
//                                     className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-1">
//                                     <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Price</label>
//                                     <input 
//                                         name="price" 
//                                         type="number" 
//                                         step="0.01"
//                                         required 
//                                         placeholder="0.00"
//                                         className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                     />
//                                 </div>
//                                 <div className="space-y-1">
//                                     <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Stock Count</label>
//                                     <input 
//                                         name="stock" 
//                                         type="number" 
//                                         required 
//                                         placeholder="0"
//                                         className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold uppercase tracking-wider text-gray-800">Category</label>
//                                 <input 
//                                     name="category" 
//                                     type="text" 
//                                     required 
//                                     placeholder="e.g. Books, Electronics"
//                                     className="w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
//                                 />
//                             </div>

//                             <div className="flex justify-center gap-3 pt-6">
//                                 <button 
//                                     type="button" 
//                                     disabled={isLoading}
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button 
//                                     type="submit"
//                                     disabled={isLoading}
//                                     className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-md shadow-sm transition-colors disabled:bg-gray-600"
//                                 >
//                                     {isLoading && <Icons icon="line-md:loading-twotone-loop" size={16} />}
//                                     {isLoading ? "Deleting..." : "Delete Product"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Table Container */}
//             <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <GenericTable 
//                         title="Inventory Overview" 
//                         columns={productTable} 
//                         data={productData} 
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProductMgt;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KpiCard from "./KpiCards";
import Icons from "../../ui/Icon";
import { GenericTable } from "./GenericTable";
import { productTable } from "../../../utils/Constants";
import { 
    addProduct, 
    editProduct, 
    deleteProduct, 
    viewAllProducts 
} from "../../../utils/Service/apiService";

function ProductMgt() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // --- State Management ---
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeModal, setActiveModal] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Data Fetching ---
    const loadProducts = async () => {
        try {
            const res = await viewAllProducts();
            // Supports both { data: [...] } and { data: { products: [...] } }
            const data = res.data?.products || res.data;
            setAllProducts(Array.isArray(data) ? data : []); 
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => { 
        if (!token) {
            navigate('/login');
        } else {
            loadProducts();
        }
    }, [token, navigate]);

    // --- Handlers ---
    const handleClose = () => {
        setActiveModal(null);
        setSelectedProduct(null);
        setError(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const payload = {
            name: formData.get("name"),
            category: formData.get("category"), // Correctly capturing category
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock"))
        };

        try {
            if (activeModal === 'add') {
                await addProduct(payload);
            } else {
                const id = selectedProduct._id || selectedProduct.id;
                await editProduct(id, payload);
            }
            await loadProducts();
            handleClose();
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed. Check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        setIsLoading(true);
        try {
            const id = selectedProduct._id || selectedProduct.id;
            await deleteProduct(id);
            await loadProducts();
            handleClose();
        } catch (err) {
            setError("Could not delete product.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/30">
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <KpiCard title="Total Inventory" value={allProducts.length} />
                <KpiCard title="Items In Stock" value={allProducts.filter(p => p.stock > 0).length} />
                <KpiCard title="Out of Stock" value={allProducts.filter(p => p.stock <= 0).length} />
            </div>

            {/* Global Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => setActiveModal('add')} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition shadow-sm font-semibold">
                    <Icons icon="heroicons:plus" size={18}/> Add Product
                </button>
                <button onClick={() => setActiveModal('edit')} className="flex items-center gap-2 bg-black text-white border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-800  transition shadow-sm font-semibold">
                    <Icons icon="heroicons:pencil-square" size={18}/> Edit Product
                </button>
                <button onClick={() => setActiveModal('delete')} className="flex items-center gap-2 bg-black text-white border border-red-100 px-5 py-2.5 rounded-xl hover:bg-gray-800  transition shadow-sm font-semibold">
                    <Icons icon="heroicons:trash" size={18}/> Delete Product
                </button>
            </div>

            {/* Table Component */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <GenericTable title="Live Inventory" columns={productTable} data={allProducts} />
            </div>

            {/* --- Unified Modal System --- */}
            {activeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-sm font-black uppercase tracking-widest text-gray-600">
                                {activeModal} Product {selectedProduct && `• ${selectedProduct.name}`}
                            </h2>
                            <button onClick={handleClose} className="p-1 hover:bg-gray-200 rounded-full transition">
                                <Icons icon="heroicons:x-mark" size={22}/>
                            </button>
                        </div>

                        <div className="p-6">
                            {error && <div className="mb-5 p-3 bg-red-50 text-red-700 text-xs font-bold border-l-4 border-red-500 rounded">{error}</div>}

                            {/* Step 1: Select Product (For Edit/Delete) */}
                            {(activeModal === 'edit' || activeModal === 'delete') && !selectedProduct ? (
                                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-3">Choose a product to {activeModal}:</p>
                                    {allProducts.map(product => (
                                        <div 
                                            key={product._id || product.id} 
                                            onClick={() => setSelectedProduct(product)}
                                            className="group flex justify-between items-center p-4 border border-gray-100 rounded-xl cursor-pointer hover:border-black hover:bg-gray-50 transition-all"
                                        >
                                            <div>
                                                <p className="font-bold text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.category || "No Category"}</p>
                                            </div>
                                            <Icons icon="heroicons:chevron-right" size={18} className="text-gray-300 group-hover:text-black transition-transform group-hover:translate-x-1"/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activeModal === 'delete' ? (
                                        /* Delete Confirmation */
                                        <div className="text-center py-4">
                                            <p className="text-gray-600 mb-8 text-lg">Are you sure you want to delete <br/><span className="font-black text-black">{selectedProduct.name}</span>?</p>
                                            <div className="flex gap-3">
                                                <button onClick={() => setSelectedProduct(null)} className="flex-1 py-3 font-bold text-gray-700 hover:text-black transition">Go Back</button>
                                                <button onClick={confirmDelete} disabled={isLoading} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
                                                    {isLoading ? "Deleting..." : "Yes, Delete"}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Add/Edit Form */
                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-gray-800">Product Name</label>
                                                <input name="name" defaultValue={selectedProduct?.name} required placeholder="e.g. Cotton Polo Shirt" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-black transition" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase text-gray-800">Price (INR)</label>
                                                    <input name="price" type="number" step="0.01" defaultValue={selectedProduct?.price} required placeholder="0.00" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-black transition" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase text-gray-800">Stock Count</label>
                                                    <input name="stock" type="number" defaultValue={selectedProduct?.stock} required placeholder="0" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-black transition" />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-gray-800">Category</label>
                                                <input name="category" defaultValue={selectedProduct?.category} required placeholder="e.g. Apparel" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-black transition" />
                                            </div>

                                            <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                                                {activeModal === 'edit' && (
                                                    <button type="button" onClick={() => setSelectedProduct(null)} className="px-5 py-2.5 font-bold text-gray-400 hover:text-black transition">Back</button>
                                                )}
                                                <button type="submit" disabled={isLoading} className="px-8 py-2.5 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition">
                                                    {isLoading ? "Saving..." : "Save Product"}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductMgt;