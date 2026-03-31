"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/lib/store";
import { categories } from "@/lib/data";
import { generateId } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function SellerPage() {
  const [mounted, setMounted] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const { user } = useAuthStore();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    material: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("seller-products");
    if (stored) {
      setSellerProducts(JSON.parse(stored));
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setNewProduct({ ...newProduct, image: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const product: Product = {
      id: generateId(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      material: newProduct.material,
      image: newProduct.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      sellerId: user?.id || "seller",
      sellerName: user?.name || "Your Store",
      rating: 4.5,
      reviewCount: 0,
      inStock: true,
      createdAt: new Date().toISOString(),
    };

    const updatedProducts = [...sellerProducts, product];
    setSellerProducts(updatedProducts);
    localStorage.setItem("seller-products", JSON.stringify(updatedProducts));

    setIsSubmitting(false);
    setShowSuccess(true);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      material: "",
      image: "",
    });

    setTimeout(() => {
      setShowSuccess(false);
      setShowAddProduct(false);
    }, 2000);
  };

  const stats = [
    { label: "Total Products", value: sellerProducts.length, color: "bg-blue-100 text-blue-600" },
    { label: "Total Sales", value: `Rs. ${sellerProducts.length * 2500}`, color: "bg-green-100 text-green-600" },
    { label: "Views", value: sellerProducts.length * 45, color: "bg-purple-100 text-purple-600" },
    { label: "Orders", value: Math.floor(sellerProducts.length * 0.8), color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* Header */}
        <div className="flex flex-wrap w-full mb-8 justify-between items-center">
          <div className="mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Seller Dashboard</h1>
            <div className="h-1 w-20 bg-green-500 rounded"></div>
          </div>
          <button
            onClick={() => setShowAddProduct(true)}
            className="text-white bg-green-600 py-2 px-6 rounded-lg hover:bg-green-500 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Product
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-md p-6">
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
          </div>

          {sellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {sellerProducts.map((product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="relative h-48">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.material}</p>
                    <p className="mt-2 font-semibold text-green-600">Rs. {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No products yet</h3>
              <p className="text-gray-500 mb-4">Start selling by adding your first upcycled product.</p>
              <button
                onClick={() => setShowAddProduct(true)}
                className="text-white bg-green-600 py-2 px-6 rounded-lg hover:bg-green-500 transition"
              >
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white rounded-xl p-6">
            <button
              onClick={() => setShowAddProduct(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {showSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Added!</h3>
                <p className="text-gray-500">Your product has been added to the marketplace.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Product</h2>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)</label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        required
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        {categories.filter(c => c !== "All Categories").map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material Used</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Recycled Denim"
                      value={newProduct.material}
                      onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    {newProduct.image ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setNewProduct({ ...newProduct, image: "" })}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 transition">
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span className="text-sm text-gray-500">Click to upload image</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 text-white bg-green-600 py-2 px-4 rounded-lg hover:bg-green-500 transition disabled:opacity-50"
                    >
                      {isSubmitting ? "Adding..." : "Add Product"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
