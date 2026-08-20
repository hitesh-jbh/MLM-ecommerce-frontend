import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Icons from "../../components/ui/Icon";
import { GenericTable } from "../../components/partials/table/GenericTable";
import { productTable } from "../../utils/constants";
import {
  addProduct,
  editProduct,
  deleteProduct,
} from "../../utils/service/apiService";
import { ToastContainer, toast } from "react-toastify";
import PageHeader from "../../components/partials/table/PageHeader";
import KpiCard from "../../components/admin_component/KpiCards";

function ProductMgt() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🌟 New States for Category Logic
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");

  // File States
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const { data, mutate, isLoading } = useSWR("/api/product/");
  const { data: categoryRes } = useSWR("/api/categories");

  const rawProducts = useMemo(() => {
    if (!data) return [];
    const items = data?.products || data?.data || data;
    return Array.isArray(items) ? items : [];
  }, [data]);

  const categoryList = useMemo(() => {
    if (!categoryRes) return [];
    const items = categoryRes?.data || categoryRes;
    return Array.isArray(items) ? items : [];
  }, [categoryRes]);

  // 🌟 Helper for active subcategories
  const activeSubCategories = useMemo(() => {
    if (!selectedMainCategoryId) return [];
    const mainCat = categoryList.find((c) => String(c.id) === String(selectedMainCategoryId));
    return mainCat?.subCategories || [];
  }, [categoryList, selectedMainCategoryId]);

  const categories = useMemo(() => {
    const uniqueCats = new Set(
      rawProducts.map((p) => p.category_name || p.category).filter(Boolean),
    );
    return ["All Categories", ...Array.from(uniqueCats)];
  }, [rawProducts]);

  const filteredProducts = useMemo(() => {
    return rawProducts
      .map((p) => ({
        ...p,
        category: p.category_name || p.category || "Uncategorized",
      }))
      .filter((product) => {
        const matchesSearch =
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "All Categories" ||
          product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  }, [rawProducts, searchQuery, selectedCategory]);

  const isFiltered = searchQuery !== "" || selectedCategory !== "All Categories";

  useEffect(() => {
    if (!token) navigate("/login");
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
    galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setSelectedMainCategoryId("");
    setSelectedSubCategoryId("");
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
      toast.error(err, "Failed to delete product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const id = selectedProduct?._id || selectedProduct?.id;

    // 🌟 Decide which ID to send: Sub-category ID if chosen, else Main category ID
    const finalCategoryId = selectedSubCategoryId || selectedMainCategoryId;

    try {
      if (activeModal === "add") {
        const formData = new FormData();
        formData.append("name", form.name.value);
        formData.append("price", form.price.value);
        formData.append("mrp", form.mrp.value);
        formData.append("stock", form.stock.value);
        formData.append("category", finalCategoryId); 
        formData.append("description", form.description.value);

        if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
        galleryFiles.forEach((file) => formData.append("images", file));

        await addProduct(token, formData);
        toast.success("Product Created!");
      } else {
        const payload = {
          name: form.name.value,
          price: Number(form.price.value),
          mrp: form.mrp.value ? Number(form.mrp.value) : null,
          stock: Number(form.stock.value),
          category: finalCategoryId, 
          description: form.description.value,
        };
        await editProduct(id, token, payload);
        toast.success("Product Updated!");
      }
      mutate();
      handleClose();
    } catch (err) {
      console.log(err);
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
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Product Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage your inventory and product details
          </p>
        </div>
        <button
          onClick={() => setActiveModal("add")}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-black/10"
        >
          <Icons icon="heroicons:plus" size={20} /> ADD PRODUCT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard title="Total Inventory" value={rawProducts.length} />
        <KpiCard title="Items In Stock" value={rawProducts.filter((p) => p.stock > 0).length} />
        <KpiCard title="Out of Stock" value={rawProducts.filter((p) => p.stock <= 0).length} />
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
            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">
              Loading Catalog...
            </span>
          </div>
        ) : (
          <GenericTable
            columns={productTable(
              (p) => {
                setSelectedProduct(p);
                setActiveModal("edit");
                
                // 🌟 Smart logic to pre-fill Edit form dropdowns
                let mainId = "";
                let subId = "";
                for (const cat of categoryList) {
                  if (String(cat.id) === String(p.category_id || p.category)) {
                    mainId = cat.id;
                    break;
                  }
                  if (cat.subCategories) {
                    const sub = cat.subCategories.find((s) => String(s.id) === String(p.category_id || p.category));
                    if (sub) {
                      mainId = cat.id;
                      subId = sub.id;
                      break;
                    }
                  }
                }
                setSelectedMainCategoryId(mainId);
                setSelectedSubCategoryId(subId);
              },
              (p) => {
                setSelectedProduct(p);
                setActiveModal("delete");
              },
            )}
            data={filteredProducts}
          />
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {activeModal && activeModal !== "delete" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-sm font-black uppercase tracking-wider">
                {activeModal} Product
              </h2>
              <button onClick={handleClose} className="text-slate-400 hover:text-black">
                <Icons icon="heroicons:x-mark" size={22} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {activeModal === "add" && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">
                        Main Thumbnail (Portrait)
                      </label>
                      <div className="relative h-56 w-40 mx-auto border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-white overflow-hidden group">
                        {thumbnailPreview ? (
                          <div className="relative h-full w-full flex items-center justify-center bg-slate-900/5">
                            <img src={thumbnailPreview} className="h-full w-full object-cover" alt="Preview" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setThumbnailFile(null);
                                setThumbnailPreview(null);
                              }}
                              className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                            >
                              <Icons icon="heroicons:x-mark" size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 gap-1 cursor-pointer p-2 text-center">
                            <Icons icon="heroicons:photo" size={32} />
                            <span className="text-[10px] font-semibold">Upload Portrait Image</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setThumbnailFile(file);
                              setThumbnailPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Gallery</label>
                      <div className="flex flex-wrap gap-2">
                        {galleryPreviews.map((src, i) => (
                          <div key={i} className="h-25 w-25 rounded-lg border overflow-hidden relative group bg-slate-100">
                            <img src={src} className="h-full w-full object-cover" />
                          </div>
                        ))}
                        <label className="h-20 w-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer text-slate-400 hover:border-black bg-white transition-all">
                          <Icons icon="heroicons:plus" size={20} />
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setGalleryFiles((prev) => [...prev, ...files]);
                              setGalleryPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Name</label>
                    <input
                      name="name"
                      defaultValue={selectedProduct?.name}
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Selling Price (Price)</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.price}
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Original Price (MRP - Optional)</label>
                    <input
                      name="mrp"
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.mrp}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Stock</label>
                    <input
                      name="stock"
                      type="number"
                      defaultValue={selectedProduct?.stock}
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none"
                    />
                  </div>

                  {/* 🌟 Dynamic Dropdown Logic Starts Here */}
                  <div className={activeSubCategories.length > 0 ? "col-span-1" : "col-span-1"}>
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Main Category</label>
                    <select
                      name="main_category"
                      value={selectedMainCategoryId}
                      onChange={(e) => {
                        setSelectedMainCategoryId(e.target.value);
                        setSelectedSubCategoryId(""); // Reset sub-category on change
                      }}
                      required
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none bg-white"
                    >
                      <option value="" disabled>Select Category</option>
                      {categoryList.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {activeSubCategories.length > 0 && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Sub Category</label>
                      <select
                        name="sub_category"
                        value={selectedSubCategoryId}
                        onChange={(e) => setSelectedSubCategoryId(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none bg-white"
                      >
                        <option value="" disabled>Select Sub-Category</option>
                        {activeSubCategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>{sub.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* 🌟 Dynamic Dropdown Logic Ends Here */}

                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Description</label>
                    <textarea
                      name="description"
                      defaultValue={selectedProduct?.description}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-black outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 disabled:bg-slate-300 transition-all"
                >
                  {isSubmitting ? "Processing..." : `${activeModal} Product`}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {activeModal === "delete" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons icon="heroicons:trash" size={40} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Product?</h2>
            <p className="text-slate-500 mb-8 px-4">
              Are you sure you want to delete <span className="font-bold text-slate-800">"{selectedProduct?.name}"</span>?
            </p>
            <div className="flex gap-4">
              <button onClick={handleClose} className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={isSubmitting} className="flex-1 py-3.5 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-200 transition-all">
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