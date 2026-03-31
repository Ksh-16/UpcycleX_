import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, CartItem, Product, Order, WasteUpload } from "./types";
import { generateId } from "./utils";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: User["role"]) => Promise<boolean>;
  logout: () => void;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  getOrdersByUser: (userId: string) => Order[];
}

interface WasteState {
  uploads: WasteUpload[];
  addUpload: (upload: Omit<WasteUpload, "id" | "createdAt" | "status">) => WasteUpload;
  getUploadsByUser: (userId: string) => WasteUpload[];
}

// Simple in-memory user storage (simulating a database)
const users: Map<string, { user: User; password: string }> = new Map();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Check if user exists
        const userData = users.get(email);
        if (userData && userData.password === password) {
          set({ user: userData.user, isAuthenticated: true });
          return true;
        }
        // Check localStorage for persisted users
        const storedUsers = localStorage.getItem("upcyclex-users");
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          const found = parsedUsers.find(
            (u: { email: string; password: string }) =>
              u.email === email && u.password === password
          );
          if (found) {
            set({ user: found.user, isAuthenticated: true });
            return true;
          }
        }
        return false;
      },
      signup: async (name: string, email: string, password: string, role: User["role"]) => {
        const newUser: User = {
          id: generateId(),
          name,
          email,
          role,
          createdAt: new Date().toISOString(),
        };
        users.set(email, { user: newUser, password });
        // Also persist to localStorage
        const storedUsers = localStorage.getItem("upcyclex-users");
        const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
        parsedUsers.push({ user: newUser, password, email });
        localStorage.setItem("upcyclex-users", JSON.stringify(parsedUsers));
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "upcyclex-auth",
    }
  )
);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product.id === product.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },
      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "upcyclex-cart",
    }
  )
);

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set({ orders: [...get().orders, order] });
        return order;
      },
      getOrdersByUser: (userId: string) => {
        return get().orders.filter((order) => order.userId === userId);
      },
    }),
    {
      name: "upcyclex-orders",
    }
  )
);

export const useWasteStore = create<WasteState>()(
  persist(
    (set, get) => ({
      uploads: [],
      addUpload: (uploadData) => {
        const upload: WasteUpload = {
          ...uploadData,
          id: generateId(),
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set({ uploads: [...get().uploads, upload] });
        return upload;
      },
      getUploadsByUser: (userId: string) => {
        return get().uploads.filter((upload) => upload.userId === userId);
      },
    }),
    {
      name: "upcyclex-waste",
    }
  )
);
