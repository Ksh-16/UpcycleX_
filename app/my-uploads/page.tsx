"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Plus, Clock, CheckCircle, Users } from "lucide-react";
import { useWasteStore, useAuthStore } from "@/lib/store";
import { getMakerById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "bg-amber-100 text-amber-800",
  },
  matched: {
    label: "Matched",
    icon: Users,
    color: "bg-blue-100 text-blue-800",
  },
  collected: {
    label: "Collected",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
  },
};

export default function MyUploadsPage() {
  const [mounted, setMounted] = useState(false);
  const uploads = useWasteStore((state) => state.uploads);
  const { user } = useAuthStore();

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

  const userUploads = uploads.filter(
    (u) => u.userId === user?.id || u.userId === "guest"
  );

  if (userUploads.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          No uploads yet
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          You haven&apos;t uploaded any waste materials yet. Start contributing
          to the circular economy!
        </p>
        <Link href="/upload">
          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Upload Waste
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Uploads</h1>
          <Link href="/upload">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Upload
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {userUploads
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .map((upload) => {
              const status = statusConfig[upload.status];
              const StatusIcon = status.icon;
              const maker = upload.matchedMakerId
                ? getMakerById(upload.matchedMakerId)
                : null;

              return (
                <div
                  key={upload.id}
                  className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {upload.wasteType}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {upload.quantity} - {upload.location}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                        status.color
                      )}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </span>
                  </div>

                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {upload.description}
                  </p>

                  {upload.images.length > 0 && (
                    <div className="mb-4 flex gap-2 overflow-x-auto">
                      {upload.images.slice(0, 4).map((img, index) => (
                        <div
                          key={index}
                          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary"
                        >
                          <img
                            src={img}
                            alt={`Upload ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {maker && (
                    <div className="rounded-lg bg-secondary p-3">
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Matched Maker
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                          <img
                            src={maker.image}
                            alt={maker.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {maker.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {maker.specialty}
                          </p>
                        </div>
                        <a href={`mailto:${maker.contactEmail}`}>
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-muted-foreground">
                    Uploaded{" "}
                    {new Date(upload.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
