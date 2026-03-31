export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "maker";
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  image: string;
  images?: string[];
  sellerId: string;
  sellerName: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface WasteUpload {
  id: string;
  userId: string;
  wasteType: string;
  description: string;
  quantity: string;
  location: string;
  images: string[];
  status: "pending" | "matched" | "collected";
  matchedMakerId?: string;
  createdAt: string;
}

export interface Maker {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  materialsUsed: string[];
  productsCreated: number;
  yearsExperience: number;
  contactEmail: string;
  contactPhone?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
}
