"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, LogOut, Package, Upload, ChevronRight } from "lucide-react";
import { useAuthStore, useCartStore } from "@/lib/store";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className="text-gray-700"
      style={{
        background: "linear-gradient(145deg,#e3fd64,#d48a55,#3e0b90)",
        boxShadow: "inset 0 6px 18px rgba(71, 30, 30, 0.6), inset 0 -6px 18px rgba(253, 24, 24, 0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Logo */}
        <Link href="/" className="flex title-font font-medium items-center text-gray-800 mb-4 md:mb-0">
          <div className="w-20 h-20 rounded-full p-2 bg-white/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span className="ml-3 text-xl font-bold">UpCycleX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="md:ml-auto md:mr-auto hidden md:flex flex-wrap items-center text-base justify-center">
          <Link href="/upload" className="mr-5 hover:text-gray-900 font-medium transition-colors">
            Upload
          </Link>
          <Link href="/connect" className="mr-5 hover:text-gray-900 font-medium transition-colors">
            Connect
          </Link>
          <Link href="/marketplace" className="mr-5 hover:text-gray-900 font-medium transition-colors">
            Market Place
          </Link>
          <Link href="/policy" className="mr-5 hover:text-gray-900 font-medium transition-colors">
            Our Policies
          </Link>
          <Link href="/seller" className="mr-5 hover:text-gray-900 font-medium transition-colors">
            Sale market
          </Link>
          <Link href="/cart" className="mr-5 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
            Cart
            {mounted && itemCount > 0 && (
              <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Auth Button */}
        {mounted && isAuthenticated ? (
          <div className="relative group hidden md:block">
            <button className="inline-flex items-center bg-gray-200 border-0 py-2 px-4 focus:outline-none hover:bg-gray-300 rounded text-base">
              {user?.name?.split(" ")[0]}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
            <div className="absolute right-0 top-full hidden w-48 pt-2 group-hover:block z-50">
              <div className="rounded-lg bg-white p-2 shadow-lg border">
                {user?.role === "seller" && (
                  <Link
                    href="/seller"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <Package className="h-4 w-4" />
                    Seller Dashboard
                  </Link>
                )}
                <Link
                  href="/orders"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <Package className="h-4 w-4" />
                  My Orders
                </Link>
                <Link
                  href="/my-uploads"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <Upload className="h-4 w-4" />
                  My Uploads
                </Link>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden md:inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-500 hover:text-white rounded text-base mt-4 md:mt-0 transition-colors"
          >
            Sign In/ Sign Up
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden inline-flex items-center bg-gray-200 border-0 py-2 px-3 focus:outline-none hover:bg-gray-300 rounded"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 border-t">
          <nav className="container mx-auto px-5 py-4 space-y-2">
            <Link href="/upload" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-green-600">
              Upload
            </Link>
            <Link href="/connect" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-green-600">
              Connect
            </Link>
            <Link href="/marketplace" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-green-600">
              Market Place
            </Link>
            <Link href="/policy" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-green-600">
              Our Policies
            </Link>
            <Link href="/seller" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-green-600">
              Sale market
            </Link>
            <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-green-600">
              Cart {mounted && itemCount > 0 && `(${itemCount})`}
            </Link>
            {mounted && isAuthenticated ? (
              <>
                <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700 hover:text-green-600">
                  My Orders
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="block py-2 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-green-600 font-medium"
              >
                Sign In / Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
