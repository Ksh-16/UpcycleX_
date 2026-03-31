"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  Mail,
  Phone,
  Award,
  Briefcase,
  Filter,
} from "lucide-react";
import { makers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const specialties = [
  "All Specialties",
  "Textile Upcycling",
  "Wood Reclamation",
  "Glass Art",
  "Metal Upcycling",
  "Paper Crafts",
  "Tire & Rubber Art",
];

const locations = [
  "All Locations",
  "Mumbai",
  "Delhi",
  "Jaipur",
  "Pune",
  "Ahmedabad",
  "Kochi",
];

export default function ConnectPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMakers = useMemo(() => {
    return makers.filter((maker) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          maker.name.toLowerCase().includes(query) ||
          maker.specialty.toLowerCase().includes(query) ||
          maker.materialsUsed.some((m) => m.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Specialty filter
      if (
        selectedSpecialty !== "All Specialties" &&
        maker.specialty !== selectedSpecialty
      ) {
        return false;
      }

      // Location filter
      if (
        selectedLocation !== "All Locations" &&
        !maker.location.includes(selectedLocation)
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedSpecialty, selectedLocation]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-bold text-card-foreground">
            Connect with Makers
          </h1>
          <p className="text-muted-foreground">
            Find skilled artisans who can transform waste materials into beautiful
            products
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search makers by name, specialty, or materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <div className="hidden gap-3 sm:flex">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="flex gap-3 sm:hidden">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-11 flex-1 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {filteredMakers.length} makers
        </p>

        {/* Makers Grid */}
        {filteredMakers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMakers.map((maker) => (
              <div
                key={maker.id}
                className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
              >
                {/* Header with Image */}
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="absolute -bottom-10 left-6">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border-4 border-card bg-secondary">
                      <Image
                        src={maker.image}
                        alt={maker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-14">
                  <div className="mb-4">
                    <h3 className="font-semibold text-card-foreground">
                      {maker.name}
                    </h3>
                    <p className="text-sm text-primary">{maker.specialty}</p>
                  </div>

                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{maker.location.split(",")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>{maker.rating}</span>
                      <span>({maker.reviewCount})</span>
                    </div>
                  </div>

                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {maker.bio}
                  </p>

                  {/* Stats */}
                  <div className="mb-4 flex gap-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {maker.yearsExperience}+ years
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {maker.productsCreated} products
                      </span>
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {maker.materialsUsed.slice(0, 3).map((material) => (
                      <span
                        key={material}
                        className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {material}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${maker.contactEmail}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                    </a>
                    {maker.contactPhone && (
                      <a href={`tel:${maker.contactPhone}`} className="flex-1">
                        <Button className="w-full">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">
              No makers found
            </h3>
            <p className="mb-4 max-w-sm text-muted-foreground">
              Try adjusting your search or filter criteria to find makers.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("All Specialties");
                setSelectedLocation("All Locations");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Are You a Maker?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Join our community of skilled artisans and connect with people who
            have materials for you to transform.
          </p>
          <Link href="/signup">
            <Button size="lg">Join as a Maker</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
