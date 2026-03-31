"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Recycle,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  ShoppingBag,
  Hammer,
  Store,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/lib/types";

const roles = [
  {
    id: "buyer",
    label: "Buyer",
    description: "Shop unique upcycled products",
    icon: ShoppingBag,
  },
  {
    id: "seller",
    label: "Seller",
    description: "Sell your upcycled creations",
    icon: Store,
  },
  {
    id: "maker",
    label: "Maker",
    description: "Transform waste into products",
    icon: Hammer,
  },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer" as UserType["role"],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(formData.password) },
    {
      label: "Passwords match",
      met: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      if (success) {
        router.push("/");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="mx-auto flex w-fit items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Recycle className="h-6 w-6 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-foreground">Create an account</h1>
          <p className="mt-2 text-muted-foreground">
            Join the circular economy revolution
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">I want to:</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: role.id })}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
                    formData.role === role.id
                      ? "border-primary bg-accent"
                      : "border-input hover:border-primary/50"
                  )}
                >
                  <role.icon
                    className={cn(
                      "h-6 w-6",
                      formData.role === role.id ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      formData.role === role.id ? "text-primary" : "text-foreground"
                    )}
                  >
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Full name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="space-y-2">
              {passwordRequirements.map((req) => (
                <div key={req.label} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full",
                      req.met ? "bg-primary" : "bg-muted"
                    )}
                  >
                    {req.met && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <span
                    className={cn(
                      "text-sm",
                      req.met ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="h-12 w-full text-base">
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
