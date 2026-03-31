"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/marketplace/${product.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            {discount}% OFF
          </span>
        )}
        {product.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        <h3 className="mb-1 line-clamp-1 font-semibold text-card-foreground group-hover:text-primary">
          {product.name}
        </h3>

        <p className="mb-2 text-xs text-muted-foreground">{product.material}</p>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
