import type { Product, Maker } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Denim Tote Bag",
    description: "Handcrafted tote bag made from upcycled denim jeans. Perfect for everyday use with multiple pockets.",
    price: 899,
    category: "Bags & Accessories",
    material: "Recycled Denim",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500",
    sellerId: "seller1",
    sellerName: "Priya Sharma",
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Bottle Lamp",
    description: "Beautiful decorative lamp crafted from recycled glass bottles. Creates ambient lighting for any room.",
    price: 1299,
    category: "Home Decor",
    material: "Recycled Glass",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500",
    sellerId: "seller2",
    sellerName: "Raj Kumar",
    rating: 4.6,
    reviewCount: 38,
    inStock: true,
    featured: true,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    name: "Saree Cushion",
    description: "Elegant cushion covers made from vintage saree fabric. Each piece is unique with vibrant patterns.",
    price: 649,
    category: "Home Textiles",
    material: "Recycled Silk",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500",
    sellerId: "seller3",
    sellerName: "Lakshmi Rao",
    rating: 4.5,
    reviewCount: 15,
    inStock: true,
    createdAt: "2024-02-20",
  },
  {
    id: "4",
    name: "Wood Planter",
    description: "Rustic planter made from reclaimed wood. Weather-resistant and perfect for indoor or outdoor plants.",
    price: 1599,
    category: "Garden & Plants",
    material: "Reclaimed Wood",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
    sellerId: "seller4",
    sellerName: "Karan Malhotra",
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    featured: true,
    createdAt: "2024-01-28",
  },
  {
    id: "5",
    name: "Patch Jacket",
    description: "Unique denim jacket with upcycled fabric patches. A sustainable fashion statement piece.",
    price: 2499,
    category: "Fashion",
    material: "Recycled Denim",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    sellerId: "seller5",
    sellerName: "Arjun Patel",
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    createdAt: "2024-03-05",
  },
  {
    id: "6",
    name: "Tire Ottoman",
    description: "Comfortable ottoman made from upcycled car tires. Industrial design with soft cushion top.",
    price: 1899,
    category: "Home Decor",
    material: "Recycled Rubber",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    sellerId: "seller6",
    sellerName: "Vikram Singh",
    rating: 4.6,
    reviewCount: 28,
    inStock: true,
    createdAt: "2024-02-14",
  },
  {
    id: "7",
    name: "Paper Basket",
    description: "Woven basket made entirely from rolled newspaper. Sturdy and eco-friendly storage solution.",
    price: 450,
    category: "Home Decor",
    material: "Recycled Paper",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    sellerId: "seller7",
    sellerName: "Meera Nair",
    rating: 4.4,
    reviewCount: 33,
    inStock: true,
    createdAt: "2024-03-10",
  },
  {
    id: "8",
    name: "Circuit Board Frame",
    description: "Photo frame made from recycled computer circuit boards. Tech meets art in this unique piece.",
    price: 799,
    category: "Home Decor",
    material: "E-Waste",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    sellerId: "seller5",
    sellerName: "Arjun Patel",
    rating: 4.8,
    reviewCount: 41,
    inStock: true,
    createdAt: "2024-01-25",
  },
];

export const makers: Maker[] = [
  {
    id: "1",
    name: "EcoThread Studios",
    specialty: "Textile Upcycler",
    location: "Mumbai, Maharashtra",
    bio: "Converts old clothes and factory offcuts into premium tote bags, laptop sleeves and streetwear-style apparel.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 86,
    materialsUsed: ["denim", "cotton", "canvas", "deadstock rolls"],
    productsCreated: 342,
    yearsExperience: 8,
    contactEmail: "contact@ecothread.in",
    contactPhone: "+91-98765 43210",
    category: "Textile Upcycler",
    minQuantity: "5 kg per design batch",
    leadTime: "7-15 days",
  },
  {
    id: "2",
    name: "GreenStitch Tailors",
    specialty: "Tailor & Stitching",
    location: "Delhi, NCR",
    bio: "Specialised in repairing garments, turning sarees into dresses and transforming uniforms.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 54,
    materialsUsed: ["sarees", "shirts", "trousers", "uniforms"],
    productsCreated: 187,
    yearsExperience: 12,
    contactEmail: "green@stitch.in",
    contactPhone: "+91-91234 56780",
    category: "Tailor & Stitching",
    minQuantity: "single piece accepted",
    leadTime: "3-10 days",
  },
  {
    id: "3",
    name: "ReCraft Plastix",
    specialty: "Plastic / Wood",
    location: "Pune, Maharashtra",
    bio: "Turns plastic wrappers, bottles and mixed waste into solid boards and furniture components.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 39,
    materialsUsed: ["PET bottles", "clean packaging"],
    productsCreated: 215,
    yearsExperience: 6,
    contactEmail: "info@recraftplastix.in",
    contactPhone: "+91-90011 22334",
    category: "Plastic / Wood",
    minQuantity: "20 kg",
    leadTime: "10-20 days",
  },
];

export const categories = [
  "All Categories",
  "Bags & Accessories",
  "Home Decor",
  "Home Textiles",
  "Garden & Plants",
  "Fashion",
];

export const makerCategories = [
  "All",
  "Textile Upcycler",
  "Tailor & Stitching",
  "Plastic / Wood",
  "Metal / E-waste",
];

export const wasteTypes = [
  "Fabric / Textile",
  "Plastic",
  "Paper / Cardboard",
  "Wood",
  "Metal",
  "E-waste",
];

export function getProductsByCategory(category: string): Product[] {
  if (category === "all" || category === "All Categories") {
    return products;
  }
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.sellerName.toLowerCase().includes(lowercaseQuery)
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getMakerById(id: string): Maker | undefined {
  return makers.find((m) => m.id === id);
}

export function searchMakers(query: string): Maker[] {
  const lowercaseQuery = query.toLowerCase();
  return makers.filter(
    (m) =>
      m.name.toLowerCase().includes(lowercaseQuery) ||
      m.specialty.toLowerCase().includes(lowercaseQuery) ||
      m.location.toLowerCase().includes(lowercaseQuery)
  );
}
