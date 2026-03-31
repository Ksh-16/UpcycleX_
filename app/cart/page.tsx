"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const total = getTotal();
  const shipping = total > 2000 ? 0 : 150;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Your cart is empty
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Looks like you haven&apos;t added any products to your cart yet. Start
          exploring our marketplace!
        </p>
        <Link href="/marketplace">
          <Button size="lg">
            Browse Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-xl border bg-card p-4"
                >
                  {/* Product Image */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-32 sm:w-32">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/marketplace/${item.product.id}`}
                        className="font-semibold text-card-foreground hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.product.material}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center rounded-lg border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-foreground">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? "Free" : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-primary">
                    You qualify for free shipping!
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="mt-6 block">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="/marketplace"
                className="mt-4 block text-center text-sm text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
