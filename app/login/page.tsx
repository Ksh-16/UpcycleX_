"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Recycle, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        router.push("/");
      } else {
        setError("Invalid email or password. Please try again or sign up for a new account.");
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
          <h1 className="mt-6 text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your UpcycleX account
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

          <div className="space-y-4">
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
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={isLoading} className="h-12 w-full text-base">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up for free
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="rounded-lg bg-accent p-4">
          <p className="text-center text-sm text-accent-foreground">
            <strong>Demo:</strong> Sign up with any email to create an account, or use existing credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
