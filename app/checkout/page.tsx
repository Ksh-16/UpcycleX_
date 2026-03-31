"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react";
import { useCartStore, useOrderStore, useAuthStore } from "@/lib/store";
import { formatCurrency, generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ShippingAddress } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment" | "processing">("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const { user, isAuthenticated } = useAuthStore();

  const [shippingData, setShippingData] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

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

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const total = getTotal();
  const shipping = total > 2000 ? 0 : 150;
  const grandTotal = total + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStep("processing");

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const order = addOrder({
      userId: user?.id || "guest",
      items: items,
      total: grandTotal,
      status: "pending",
      shippingAddress: shippingData,
      paymentMethod: "card",
    });

    // Clear cart
    clearCart();

    // Redirect to confirmation
    router.push(`/order-confirmation?orderId=${order.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Back Link */}
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8 flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step === "shipping" ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                {step === "payment" || step === "processing" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  "1"
                )}
              </div>
              <div
                className={`h-1 flex-1 ${
                  step === "payment" || step === "processing" ? "bg-primary" : "bg-muted"
                }`}
              />
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step === "payment" || step === "processing"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step === "processing" ? <Check className="h-4 w-4" /> : "2"}
              </div>
            </div>

            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-card-foreground">
                      Shipping Information
                    </h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.fullName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, fullName: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, email: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Address
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, city: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          State
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingData.state}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, state: e.target.value })
                          }
                          className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Pincode
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingData.pincode}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, pincode: e.target.value })
                          }
                          className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-card-foreground">
                      Payment Details
                    </h2>
                  </div>

                  <div className="mb-4 rounded-lg bg-accent p-4">
                    <p className="text-sm text-accent-foreground">
                      <strong>Demo Mode:</strong> Use any card details to simulate payment. No real charges will be made.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={(e) =>
                          setCardData({ ...cardData, number: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={cardData.name}
                        onChange={(e) =>
                          setCardData({ ...cardData, name: e.target.value })
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) =>
                            setCardData({ ...cardData, expiry: e.target.value })
                          }
                          className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) =>
                            setCardData({ ...cardData, cvv: e.target.value })
                          }
                          className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep("shipping")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" size="lg" className="flex-1">
                    Pay {formatCurrency(grandTotal)}
                  </Button>
                </div>
              </form>
            )}

            {step === "processing" && (
              <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                <h2 className="mb-2 text-xl font-semibold text-card-foreground">
                  Processing Payment
                </h2>
                <p className="text-muted-foreground">
                  Please wait while we process your payment...
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                Order Summary
              </h2>

              <div className="mb-4 max-h-60 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-foreground">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
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
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-lg bg-secondary p-3">
                <Shield className="h-5 w-5 text-primary" />
                <p className="text-xs text-muted-foreground">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
