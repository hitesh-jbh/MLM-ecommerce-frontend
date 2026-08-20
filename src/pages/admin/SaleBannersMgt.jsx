import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash, FaPlus, FaImage, FaTimes, FaLink } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../utils/api/axiosInstance";

const SaleBannersMgt = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Match the state structure of Hero Banners (using link_url for consistency)
  const [formData, setFormData] = useState({
    title: "",
    link_url: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Fetch Banners
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["adminSaleBanners"], // Updated queryKey to avoid clashing with Hero Banners
    queryFn: async () => {
      const res = await api.get("/api/banners"); // Ensure your backend filters by 'type' if needed
      return res.data.data || res.data || [];
    },
  });

  // Add Banner Mutation
  const addBannerMutation = useMutation({
    mutationFn: async (newBanner) => {
      const form = new FormData();
      form.append("title", newBanner.title);
      form.append("link_url", newBanner.link_url); // Standardized to link_url
      form.append("image", newBanner.image);
      
      // Uncomment this if your backend uses 'type' to differentiate between Hero and Sale banners
      // form.append('type', 'sale'); 

      return await api.post("/api/banners", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminSaleBanners"]);
      toast.success("Sale Banner added successfully!");
      closeModal();
    },
    onError: () => toast.error("Failed to add sale banner"),
  });

  // Delete Banner Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => await api.delete(`/api/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminSaleBanners"]);
      toast.success("Sale Banner deleted successfully!");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", link_url: "", image: null });
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please select an image!");
    addBannerMutation.mutate(formData);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Sale Banners Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage promotional and sale banners (Full Preview)
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm"
        >
          <FaPlus /> Upload Sale Banner
        </button>
      </div>

      {/* List / Empty States */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 font-medium">Loading sale banners...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white border border-gray-200 border-dashed rounded-xl p-12 text-center">
          <div className="mx-auto h-16 w-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <FaImage size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">No Sale Banners Found</h3>
          <p className="text-gray-500 mt-1 mb-4 text-sm">
            You haven't uploaded any promotional banners yet.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 font-medium hover:underline"
          >
            Upload your first sale banner
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {banners.map((banner) => (
            <div
              key={banner.id || banner._id}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative transition-shadow hover:shadow-md"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {banner.title || "Untitled Sale Banner"}
                  </h3>
                  {banner.link_url || banner.link ? (
                    <p className="text-sm text-blue-600 flex items-center gap-1.5 mt-0.5">
                      <FaLink size={12} className="text-gray-400" />
                      Redirects to:{" "}
                      <span className="font-medium">{banner.link_url || banner.link}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <FaLink size={12} /> No redirection link set
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this sale banner?",
                      )
                    )
                      deleteMutation.mutate(banner.id || banner._id);
                  }}
                  className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  title="Delete Sale Banner"
                >
                  <FaTrash size={14} /> Delete
                </button>
              </div>

              {/* Full Width Image Preview */}
              <div
                className="w-full bg-gray-100 flex justify-center items-center overflow-hidden"
                style={{ maxHeight: "400px" }}
              >
                <img
                  src={banner.image_url || banner.imageUrl || banner.image}
                  alt={banner.title}
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Dialog Box */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                Upload Sale Banner
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto max-h-[85vh]"
            >
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-md">
                <p className="text-amber-800 text-sm font-medium">
                  <span className="font-bold">Note for Admin:</span> Make sure to upload wide banners that fit the promotional sections seamlessly.
                </p>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition"
                  placeholder="e.g. Diwali Mega Sale - 50% Off"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Link (Optional)
                </label>
                <input
                  type="text"
                  value={formData.link_url}
                  onChange={(e) =>
                    setFormData({ ...formData, link_url: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="e.g. /collections/sale"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Where should the user go when they click this banner?
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Banner Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-black transition-colors bg-gray-50">
                  <div className="space-y-3 text-center w-full">
                    {preview ? (
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Preview"
                          className="mx-auto h-32 w-full object-cover rounded-lg shadow-sm border border-gray-200"
                        />
                      </div>
                    ) : (
                      <div className="mx-auto h-16 w-16 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                        <FaImage className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white px-4 py-2 rounded-md shadow-sm font-medium text-black hover:text-gray-700 border border-gray-200 transition">
                        <span>
                          {preview ? "Change Image" : "Select an Image"}
                        </span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                          required={!preview}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={addBannerMutation.isPending}
                className="w-full bg-black text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 flex justify-center items-center gap-2"
              >
                {addBannerMutation.isPending
                  ? "Uploading..."
                  : "Save & Publish Banner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleBannersMgt;