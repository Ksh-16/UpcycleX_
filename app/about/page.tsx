import Image from "next/image";
import Link from "next/link";
import { Recycle, Users, Leaf, Award, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Recycle,
    title: "Sustainability",
    description:
      "We believe in giving materials a second life, reducing waste, and promoting circular economy practices.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building connections between waste generators, makers, and conscious consumers who share our vision.",
  },
  {
    icon: Heart,
    title: "Craftsmanship",
    description:
      "Celebrating the skill and creativity of artisans who transform discarded materials into treasures.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "Every product sold and waste diverted contributes to a measurable positive environmental impact.",
  },
];

const team = [
  {
    name: "Aisha Patel",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Rohan Mehta",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Priya Sharma",
    role: "Community Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent to-background px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl">
            About UpcycleX
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We&apos;re on a mission to transform the way the world thinks about
            waste. By connecting people with materials to skilled makers, we&apos;re
            building a circular economy where nothing goes to waste.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                UpcycleX was born from a simple observation: while tons of
                reusable materials end up in landfills every day, skilled
                artisans struggle to find quality raw materials for their craft.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We bridge this gap by creating a platform where waste
                generators can connect directly with makers who see potential
                where others see trash. Every discarded item is an opportunity
                for creativity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Since our launch, we&apos;ve helped divert over 50 tons of waste
                from landfills and supported hundreds of local artisans in
                building sustainable livelihoods.
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=800&fit=crop"
                alt="Upcycling workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Our Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border bg-card p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-primary p-8 text-center sm:p-12">
            <h2 className="mb-8 text-3xl font-bold text-primary-foreground">
              Our Impact
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-4xl font-bold text-primary-foreground sm:text-5xl">
                  50+
                </p>
                <p className="mt-2 text-primary-foreground/80">
                  Tons of waste diverted
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-foreground sm:text-5xl">
                  500+
                </p>
                <p className="mt-2 text-primary-foreground/80">
                  Active makers
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-foreground sm:text-5xl">
                  15K+
                </p>
                <p className="mt-2 text-primary-foreground/80">
                  Happy customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-secondary/50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-xl border bg-card text-center transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-square bg-secondary">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-card-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Join the Movement
          </h2>
          <p className="mb-8 text-muted-foreground">
            Whether you have materials to share, skills to offer, or simply want
            to shop sustainably, there&apos;s a place for you at UpcycleX.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/connect">
              <Button size="lg" variant="outline">
                Become a Maker
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
