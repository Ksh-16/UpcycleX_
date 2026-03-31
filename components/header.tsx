"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Recycle,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Package,
  Upload,
} from "lucide-react";
import { useAuthStore, useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/upload", label: "Upload Waste" },
    { href: "/connect", label: "Find Makers" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Recycle className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">UpcycleX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          {mounted && isAuthenticated ? (
            <div className="relative hidden md:block">
              <div className="group">
                <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                  <User className="h-4 w-4" />
                  <span>{user?.name?.split(" ")[0]}</span>
                </button>
                <div className="absolute right-0 top-full hidden w-48 pt-2 group-hover:block">
                  <div className="rounded-lg bg-card p-2 shadow-lg ring-1 ring-border">
                    {user?.role === "seller" && (
                      <Link
                        href="/seller/dashboard"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary"
                      >
                        <Package className="h-4 w-4" />
                        Seller Dashboard
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary"
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>
                    <Link
                      href="/my-uploads"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-card-foreground hover:bg-secondary"
                    >
                      <Upload className="h-4 w-4" />
                      My Uploads
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-secondary"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            {mounted && isAuthenticated ? (
              <>
                {user?.role === "seller" && (
                  <Link
                    href="/seller/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Seller Dashboard
                  </Link>
                )}
                <Link
                  href="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-destructive transition-colors hover:bg-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
