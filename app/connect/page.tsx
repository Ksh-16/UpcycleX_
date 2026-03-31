"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { makers, makerCategories } from "@/lib/data";

export default function ConnectPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMakers = useMemo(() => {
    return makers.filter((maker) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          maker.name.toLowerCase().includes(query) ||
          maker.specialty.toLowerCase().includes(query) ||
          maker.location.toLowerCase().includes(query) ||
          maker.materialsUsed.some((m) => m.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "All" && maker.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* Header */}
        <div className="flex flex-wrap w-full mb-12">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Connect with Makers</h1>
            <div className="h-1 w-20 bg-green-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Find skilled artisans who can transform your waste materials into beautiful, functional products.
          </p>
        </div>

        {/* Filters */}
        <div
          className="rounded-xl p-6 mb-8 flex flex-wrap gap-4 items-center"
          style={{
            background: "linear-gradient(145deg,#17580eb9,#8cc8328b,#0b906f)",
            boxShadow: "inset 0 6px 18px rgba(71, 30, 30, 0.6), inset 0 -6px 18px rgba(253, 24, 24, 0.08)",
          }}
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by skill, location, or name..."
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
            {makerCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Makers Grid */}
        {filteredMakers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMakers.map((maker) => (
              <div key={maker.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header with gradient */}
                <div className="h-24 relative" style={{ background: "linear-gradient(to right, #10b981, #059669)" }}>
                  <div className="absolute -bottom-10 left-6">
                    <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                      <Image src={maker.image} alt={maker.name} fill className="object-cover" />
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {maker.category || maker.specialty}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 pt-14">
                  <h3 className="font-semibold text-gray-900">{maker.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {maker.location}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(maker.rating) ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">({maker.reviewCount} reviews)</span>
                  </div>

                  <p className="text-gray-600 text-sm mt-3 line-clamp-2">{maker.bio}</p>

                  {/* Materials */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {maker.materialsUsed.slice(0, 3).map((material) => (
                      <span key={material} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {material}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="border-t mt-4 pt-4 grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <div>
                      <span className="font-medium text-gray-700">Min. Qty:</span> {maker.minQuantity || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Lead Time:</span> {maker.leadTime || "N/A"}
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-3 mt-4">
                    <a href={`mailto:${maker.contactEmail}`} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        Email
                      </button>
                    </a>
                    {maker.contactPhone && (
                      <a href={`tel:${maker.contactPhone}`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                          Call
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No makers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-green-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Are You a Maker?</h2>
          <p className="text-gray-600 mb-6">
            Join our community of skilled artisans and connect with people who have materials for you to transform.
          </p>
          <button className="text-white bg-green-600 py-2 px-6 rounded-lg hover:bg-green-500 transition">
            Join as a Maker
          </button>
        </div>
      </div>
    </section>
  );
}
