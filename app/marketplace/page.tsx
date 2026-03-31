"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { products, categories } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2 w-fit">
          {product.material}
        </span>
        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex-grow">{product.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          {product.sellerName}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">Rs. {product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All Categories");
  const [priceRange, setPriceRange] = useState("All");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.sellerName.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== "All") {
      if (priceRange === "Under Rs. 500") {
        filtered = filtered.filter((p) => p.price < 500);
      } else if (priceRange === "Rs. 500 - Rs. 1000") {
        filtered = filtered.filter((p) => p.price >= 500 && p.price <= 1000);
      } else if (priceRange === "Above Rs. 1000") {
        filtered = filtered.filter((p) => p.price > 1000);
      }
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        {/* Header */}
        <div className="flex flex-wrap w-full mb-10">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Upcycled Marketplace</h1>
            <div className="h-1 w-20 bg-green-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Browse unique, handcrafted items made from upcycled materials. Every purchase supports sustainable makers.
          </p>
        </div>

        {/* Filters */}
        <div
          className="bg-white rounded-xl p-6 mb-8 flex flex-wrap gap-4 items-center"
          style={{
            background: "linear-gradient(145deg,#17580eb9,#8cc8328b,#0b906f)",
            boxShadow: "inset 0 6px 18px rgba(71, 30, 30, 0.6), inset 0 -6px 18px rgba(253, 24, 24, 0.08)",
          }}
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Price */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
          >
            <option value="All">All Prices</option>
            <option value="Under Rs. 500">Under Rs. 500</option>
            <option value="Rs. 500 - Rs. 1000">Rs. 500 - Rs. 1000</option>
            <option value="Above Rs. 1000">Above Rs. 1000</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      }>
        <MarketplaceContent />
      </Suspense>
    </div>
  );
}
