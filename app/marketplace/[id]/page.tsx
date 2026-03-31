"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Leaf,
  ArrowLeft,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { getProductById, products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                {product.material}
              </p>
              <h1 className="mb-4 text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Seller */}
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Sold by</p>
              <p className="font-medium text-foreground">{product.sellerName}</p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">
                  Quantity:
                </span>
                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 h-12"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button size="lg" variant="outline" className="h-12">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-4 border-t pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Free Shipping
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Orders over 2,000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Quality Assured
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Verified products
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Eco-Friendly
                  </p>
                  <p className="text-xs text-muted-foreground">
                    100% Upcycled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Related Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
