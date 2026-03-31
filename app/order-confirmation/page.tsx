"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, ArrowRight, Printer } from "lucide-react";
import { useOrderStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orders = useOrderStore((state) => state.orders);
  const [mounted, setMounted] = useState(false);

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

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Order Not Found
        </h1>
        <p className="mb-8 text-muted-foreground">
          We couldn&apos;t find the order you&apos;re looking for.
        </p>
        <Link href="/marketplace">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16">
        {/* Success Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your order. We&apos;ve received your payment and will
            process your order shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mb-8 rounded-xl border bg-card p-6">
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-semibold text-card-foreground">
                #{order.id.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium text-card-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6 space-y-4">
            <h3 className="font-semibold text-card-foreground">Order Items</h3>
            {order.items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-foreground">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mb-6 border-t pt-6">
            <h3 className="mb-3 font-semibold text-card-foreground">
              Shipping Address
            </h3>
            <div className="rounded-lg bg-secondary p-4">
              <p className="font-medium text-foreground">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.pincode}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-card-foreground">
                Total Paid
              </span>
              <span className="font-bold text-primary">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mb-8 rounded-xl border bg-card p-6">
          <h3 className="mb-4 font-semibold text-card-foreground">
            Order Status
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium capitalize text-foreground">
                {order.status}
              </p>
              <p className="text-sm text-muted-foreground">
                Your order is being processed and will be shipped soon.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </Link>
          <Link href="/marketplace" className="flex-1">
            <Button className="w-full">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
