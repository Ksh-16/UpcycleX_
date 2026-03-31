"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { wasteTypes, makers } from "@/lib/data";
import { useWasteStore, useAuthStore } from "@/lib/store";

export default function UploadPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const addUpload = useWasteStore((state) => state.addUpload);

  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    wasteType: "",
    description: "",
    quantity: "",
    location: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchedMaker, setMatchedMaker] = useState<typeof makers[0] | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const result = e.target.result as string;
        setImagePreview(result);
        setImages([result]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const matched = makers.find((m) =>
      m.materialsUsed.some(
        (mat) =>
          mat.toLowerCase().includes(formData.wasteType.toLowerCase()) ||
          formData.wasteType.toLowerCase().includes(mat.toLowerCase())
      )
    ) || makers[0];

    setMatchedMaker(matched);

    addUpload({
      userId: user?.id || "guest",
      wasteType: formData.wasteType,
      description: formData.description,
      quantity: formData.quantity,
      location: formData.location,
      images: images,
      matchedMakerId: matched.id,
    });

    setIsSubmitting(false);
    setStep("success");
  };

  if (step === "success" && matchedMaker) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Upload Successful!</h1>
            <p className="text-gray-500 lg:w-2/3 mx-auto">
              Your waste listing has been submitted. We have found a maker who can transform your materials!
            </p>
          </div>

          {/* Matched Maker Card */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Recommended Maker</h3>
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image src={matchedMaker.image} alt={matchedMaker.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{matchedMaker.name}</h4>
                <p className="text-green-600 text-sm">{matchedMaker.specialty}</p>
                <p className="text-gray-500 text-sm">{matchedMaker.location}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {matchedMaker.materialsUsed.slice(0, 3).map((material) => (
                    <span key={material} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href={`mailto:${matchedMaker.contactEmail}`} className="flex-1">
                <button className="w-full text-white bg-green-600 py-2 px-4 rounded hover:bg-green-500 transition">
                  Contact Maker
                </button>
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/marketplace")}
              className="text-white bg-green-600 py-2 px-6 rounded hover:bg-green-500 transition"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-12">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Upload Waste for Upcycling</h1>
            <div className="h-1 w-20 bg-green-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Share photos of your waste materials and get AI-powered upcycling suggestions. Connect with skilled makers who can transform your waste.
          </p>
        </div>

        <div className="flex flex-wrap -m-4">
          {/* Upload Card */}
          <div className="p-4 lg:w-1/2 w-full">
            <div
              className="h-full rounded-xl p-8"
              style={{
                background: "linear-gradient(145deg,#17580eb9,#8cc8328b,#0b906f)",
                boxShadow: "inset 0 6px 18px rgba(71, 30, 30, 0.6), inset 0 -6px 18px rgba(253, 24, 24, 0.08)",
              }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">Upload Waste Image</h2>

              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-white/50 rounded-xl p-8 text-center cursor-pointer hover:border-white transition mb-6"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full h-48">
                    <Image src={imagePreview} alt="Preview" fill className="object-contain rounded-lg" />
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <p className="text-white mb-2">Click to upload or drag and drop</p>
                    <p className="text-white/70 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* AI Suggestion Box */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <h3 className="text-white font-medium mb-2">AI Suggestions</h3>
                <p className="text-white/80 text-sm">
                  Upload an image to get AI-powered upcycling suggestions and connect with makers.
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="p-4 lg:w-1/2 w-full">
            <div className="bg-white rounded-xl shadow-md p-8 h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Waste Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Waste Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type</label>
                  <select
                    value={formData.wasteType}
                    onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                  >
                    <option value="">Select waste type</option>
                    {wasteTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (approx.)</label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                    placeholder="e.g., 5 kg, 10 pieces"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    placeholder="Enter your city"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the condition of your waste materials"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-green-600 py-3 px-6 rounded-lg hover:bg-green-500 transition disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Finding Makers...
                    </>
                  ) : (
                    "Submit & Find Makers"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
