"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import { useOrderStore, useAuthStore } from "@/lib/store";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore((state) => state.orders);
  const { user, isAuthenticated } = useAuthStore();

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

  const userOrders = orders.filter(
    (o) => o.userId === user?.id || o.userId === "guest"
  );

  if (userOrders.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">No orders yet</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          You haven&apos;t placed any orders yet. Start exploring our
          marketplace!
        </p>
        <Link href="/marketplace">
          <Button size="lg">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">My Orders</h1>

        <div className="space-y-4">
          {userOrders
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .map((order) => (
              <div
                key={order.id}
                className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono font-semibold text-card-foreground">
                      #{order.id.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <span
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-medium capitalize",
                        statusColors[order.status]
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex -space-x-2">
                  {order.items.slice(0, 4).map((item, index) => (
                    <div
                      key={item.product.id}
                      className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-card bg-secondary"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-card bg-secondary text-sm font-medium text-muted-foreground">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                    <p className="font-semibold text-foreground">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                  <Link href={`/order-confirmation?orderId=${order.id}`}>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
