import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Recycle,
  Users,
  ShoppingBag,
  Leaf,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts, categories } from "@/lib/data";

const stats = [
  { label: "Products Upcycled", value: "10,000+", icon: Recycle },
  { label: "Active Makers", value: "500+", icon: Users },
  { label: "Waste Diverted", value: "50 Tons", icon: Leaf },
  { label: "Happy Customers", value: "15,000+", icon: Award },
];

const howItWorks = [
  {
    step: "01",
    title: "Upload Your Waste",
    description:
      "Share details about materials you want to dispose of responsibly. Our platform connects you with makers who can transform them.",
    icon: Recycle,
  },
  {
    step: "02",
    title: "Connect with Makers",
    description:
      "Browse our network of skilled artisans and upcyclers. Find the perfect match for your materials based on their expertise.",
    icon: Users,
  },
  {
    step: "03",
    title: "Shop Upcycled Products",
    description:
      "Discover unique, eco-friendly products in our marketplace. Every purchase supports sustainable living and local artisans.",
    icon: ShoppingBag,
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent to-background px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <TrendingUp className="h-4 w-4" />
                Join the Circular Economy
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Transform Waste Into{" "}
                <span className="text-primary">Wonder</span>
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground text-pretty">
                Connect with skilled makers who transform discarded materials into
                beautiful, functional products. Shop sustainably and make a
                difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/marketplace">
                  <Button size="lg" className="h-12 px-6">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    Upload Waste
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
                <Image
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=800&fit=crop"
                  alt="Upcycled products display"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">Eco Friendly</p>
                    <p className="text-sm text-muted-foreground">100% Sustainable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-card px-4 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-card-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              How UpcycleX Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our platform makes it easy to participate in the circular economy,
              whether you have materials to share or are looking for unique products.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border bg-card p-8 transition-shadow hover:shadow-lg"
              >
                <span className="absolute right-6 top-6 text-5xl font-bold text-muted/30">
                  {item.step}
                </span>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary/50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                Browse Categories
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                Explore our diverse collection of upcycled products across various
                categories.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex"
            >
              View All Categories
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.slug}`}
                className="group flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Recycle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-medium text-card-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.productCount} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                Featured Products
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                Handpicked upcycled products that showcase creativity and
                sustainability.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex"
            >
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/marketplace">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Join thousands of eco-conscious individuals who are transforming waste
            into beautiful, sustainable products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 text-base"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/connect">
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-primary-foreground/20 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10"
              >
                Become a Maker
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
