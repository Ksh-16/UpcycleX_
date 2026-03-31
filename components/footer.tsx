import Link from "next/link";
import { Recycle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Recycle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-card-foreground">UpcycleX</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transforming waste into wonder. Join the circular economy revolution
              and make sustainability a lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/marketplace"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/upload"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Upload Waste
                </Link>
              </li>
              <li>
                <Link
                  href="/connect"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Find Makers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">For Sellers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/seller/dashboard"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link
                  href="/connect"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Join as Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@upcyclex.in</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} UpcycleX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
