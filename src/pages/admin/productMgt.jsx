import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import KpiCard from "../../components/admin_component/KpiCards";
import Icons from "../../components/ui/Icon";
import { GenericTable } from "../../components/partials/table/GenericTable";
import { productTable } from "../../utils/Constants";
import { 
    addProduct, 
    editProduct, 
    deleteProduct 
} from "../../utils/Service/apiService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ProductMgt() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // --- State Management ---
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeModal, setActiveModal] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // --- Data Fetching with SWR ---
    const { data, error: swrError, mutate, isLoading } = useSWR('/api/product/');

    // --- Data Processing ---
    const allProducts = useMemo(() => {
        const rawData = data?.products || data;
        return Array.isArray(rawData) ? rawData : [];
    }, [data]);
    console.log(allProducts);

    // Security Check
    useEffect(() => { 
        if (!token) navigate('/login');
    }, [token, navigate]);

    // --- Handlers ---
    const handleClose = () => {
        setActiveModal(null);
        setSelectedProduct(null);
        setError(null);
    };

    // Const table to modify edit and delete product
    const tableColumns = useMemo(() => 
        productTable(
            (product) => { // Edit Handler
                setSelectedProduct(product);
                setActiveModal('edit');
            },
            (product) => { // Delete Handler
                setSelectedProduct(product);
                setActiveModal('delete');
            }
        ), 
    []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.target);
        const payload = {
            name: formData.get("name"),
            category: formData.get("category"),
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
            
            toast.success(`Product ${activeModal === 'add' ? 'added' : 'updated'} successfully!`);
            // Revalidate SWR cache to show fresh data
            mutate();
            handleClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        setIsSubmitting(true);
        try {
            const id = selectedProduct._id || selectedProduct.id;
            await deleteProduct(id);
            
            toast.success("Product deleted successfully!");
            // Revalidate SWR cache
            mutate();
            handleClose();
        } catch (err) {
            setError("Could not delete product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-screen bg-gray-50/30">
            <ToastContainer 
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />

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
                {/* <button onClick={() => setActiveModal('edit')} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition shadow-sm font-semibold">
                    <Icons icon="heroicons:pencil-square" size={18}/> Edit Product
                </button>
                <button onClick={() => setActiveModal('delete')} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition shadow-sm font-semibold">
                    <Icons icon="heroicons:trash" size={18}/> Delete Product
                </button> */}
            </div>

            {/* Table Component */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-20 text-center text-gray-400 font-bold animate-pulse">
                        REFRESHING INVENTORY...
                    </div>
                ) : (
                    <GenericTable title="Live Inventory" columns={tableColumns} data={allProducts} />
                )}
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

                            {(activeModal === 'edit' || activeModal === 'delete') && !selectedProduct ? (
                                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-3">Choose a product:</p>
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
                                        <div className="text-center py-4">
                                            <p className="text-gray-600 mb-8 text-lg">Are you sure you want to delete <br/><span className="font-black text-black">{selectedProduct.name}</span>?</p>
                                            <div className="flex gap-3">
                                                <button onClick={() => setSelectedProduct(null)} className="flex-1 py-3 font-bold text-gray-700 hover:text-black transition">Go Back</button>
                                                <button onClick={confirmDelete} disabled={isSubmitting} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
                                                    {isSubmitting ? "Deleting..." : "Yes, Delete"}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-gray-800">Product Name</label>
                                                <input name="name" defaultValue={selectedProduct?.name} required placeholder="Product Name" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-black transition" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase text-gray-800">Price</label>
                                                    <input name="price" type="number" step="0.01" defaultValue={selectedProduct?.price} required placeholder="0.00" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase text-gray-800">Stock</label>
                                                    <input name="stock" type="number" defaultValue={selectedProduct?.stock} required placeholder="0" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-gray-800">Category</label>
                                                <input name="category" defaultValue={selectedProduct?.category} required placeholder="Category" className="w-full px-4 py-2.5 border border-gray-800 rounded-lg outline-none" />
                                            </div>
                                            <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                                                <button type="submit" disabled={isSubmitting} className="px-8 py-2.5 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition">
                                                    {isSubmitting ? "Saving..." : "Save Product"}
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