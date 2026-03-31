"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  ImagePlus,
  X,
  Check,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { products, categories } from "@/lib/data";
import { formatCurrency, generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

export default function SellerDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const { user, isAuthenticated } = useAuthStore();

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
    // Load seller's products from localStorage
    const stored = localStorage.getItem("seller-products");
    if (stored) {
      setSellerProducts(JSON.parse(stored));
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Products",
      value: sellerProducts.length,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Sales",
      value: formatCurrency(sellerProducts.length * 2500),
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Views This Month",
      value: sellerProducts.length * 45,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Orders",
      value: Math.floor(sellerProducts.length * 0.8),
      icon: ShoppingBag,
      color: "bg-amber-100 text-amber-600",
    },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Seller Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your products and track your sales
            </p>
          </div>
          <Button onClick={() => setShowAddProduct(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="rounded-xl border bg-card">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold text-card-foreground">
              Your Products
            </h2>
          </div>

          {sellerProducts.length > 0 ? (
            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {sellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-lg border bg-background transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video bg-secondary">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.material}
                    </p>
                    <p className="mt-2 font-semibold text-primary">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                No products yet
              </h3>
              <p className="mb-4 max-w-sm text-muted-foreground">
                Start selling by adding your first upcycled product to the
                marketplace.
              </p>
              <Button onClick={() => setShowAddProduct(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-card p-6">
            <button
              onClick={() => setShowAddProduct(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Product Added!
                </h3>
                <p className="text-muted-foreground">
                  Your product has been added to the marketplace.
                </p>
              </div>
            ) : (
              <>
                <h2 className="mb-6 text-xl font-semibold text-card-foreground">
                  Add New Product
                </h2>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Price (INR)
                      </label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Category
                      </label>
                      <select
                        required
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select...</option>
                        {categories.filter(cat => cat !== "All Categories").map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Material Used
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Recycled Wood, Upcycled Fabric"
                      value={newProduct.material}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, material: e.target.value })
                      }
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Product Image
                    </label>
                    {newProduct.image ? (
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
                        <img
                          src={newProduct.image}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setNewProduct({ ...newProduct, image: "" })
                          }
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-background transition-colors hover:border-primary">
                        <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddProduct(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Adding..." : "Add Product"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
