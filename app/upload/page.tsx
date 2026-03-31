"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  ImagePlus,
  X,
  MapPin,
  Package,
  FileText,
  CheckCircle,
  ArrowRight,
  Recycle,
} from "lucide-react";
import { useWasteStore, useAuthStore } from "@/lib/store";
import { wasteTypes, makers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const addUpload = useWasteStore((state) => state.addUpload);

  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    wasteType: "",
    description: "",
    quantity: "",
    location: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchedMaker, setMatchedMaker] = useState<typeof makers[0] | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Simulate image upload by creating preview URLs
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Find a matching maker based on waste type
    const matched = makers.find((m) =>
      m.materialsUsed.some(
        (mat) =>
          mat.toLowerCase().includes(formData.wasteType.toLowerCase()) ||
          formData.wasteType.toLowerCase().includes(mat.toLowerCase())
      )
    ) || makers[Math.floor(Math.random() * makers.length)];

    setMatchedMaker(matched);

    // Add upload to store
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
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Upload Successful!
            </h1>
            <p className="mb-8 text-muted-foreground">
              Your waste listing has been submitted. We&apos;ve found a maker who
              can transform your materials!
            </p>
          </div>

          {/* Matched Maker Card */}
          <div className="mb-8 rounded-xl border bg-card p-6">
            <h3 className="mb-4 font-semibold text-card-foreground">
              Recommended Maker
            </h3>
            <div className="flex gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-secondary">
                <img
                  src={matchedMaker.image}
                  alt={matchedMaker.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">
                  {matchedMaker.name}
                </h4>
                <p className="text-sm text-primary">{matchedMaker.specialty}</p>
                <p className="text-sm text-muted-foreground">
                  {matchedMaker.location}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {matchedMaker.materialsUsed.slice(0, 3).map((material) => (
                    <span
                      key={material}
                      className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Link href={`/connect`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <a
                href={`mailto:${matchedMaker.contactEmail}`}
                className="flex-1"
              >
                <Button className="w-full">Contact Maker</Button>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/my-uploads" className="flex-1">
              <Button variant="outline" className="w-full">
                View My Uploads
              </Button>
            </Link>
            <Link href="/marketplace" className="flex-1">
              <Button className="w-full">
                Browse Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-card-foreground">
            Upload Your Waste
          </h1>
          <p className="text-muted-foreground">
            Share details about your waste materials and get matched with makers
            who can transform them into beautiful products.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Benefits */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Recycle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-card-foreground">Eco-Friendly</p>
              <p className="text-xs text-muted-foreground">
                Reduce landfill waste
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-card-foreground">Free Pickup</p>
              <p className="text-xs text-muted-foreground">
                In select locations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-card-foreground">Get Matched</p>
              <p className="text-xs text-muted-foreground">
                With skilled makers
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Waste Type */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">
                Waste Type
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {wasteTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, wasteType: type })}
                  className={cn(
                    "rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all",
                    formData.wasteType === type
                      ? "border-primary bg-accent text-primary"
                      : "border-input text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">
                Details
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your waste materials - condition, age, any special characteristics..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Estimated Quantity
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 5 kg, 10 pieces, 2 bags"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ImagePlus className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">
                Photos
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-secondary"
                  >
                    <img
                      src={img}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-background transition-colors hover:border-primary hover:bg-accent">
                  <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Add Photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload clear photos of your waste materials (max 5 images)
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">
                Pickup Location
              </h2>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Address
              </label>
              <input
                type="text"
                required
                placeholder="Enter your city or full address"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!formData.wasteType || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Finding Makers...
              </>
            ) : (
              <>
                Submit & Find Makers
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
