import React, { createContext, useContext, useCallback } from "react";
import { CartItem, Order, WishlistItem, Product } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AppContextType {
  cart: CartItem[];
  orders: Order[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, lensType: string, quantity?: number) => void;
  removeFromCart: (productId: string, lensType: string) => void;
  updateCartQuantity: (
    productId: string,
    lensType: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  placeOrder: (customer: Order["customer"]) => string;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("optivue-cart", []);
  const [orders, setOrders] = useLocalStorage<Order[]>("optivue-orders", []);
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>(
    "optivue-wishlist",
    []
  );

  const addToCart = useCallback(
    (product: Product, lensType: string, quantity = 1) => {
      setCart((prev: CartItem[]) => {
        const existing = prev.find(
          (item) => item.product.id === product.id && item.lensType === lensType
        );
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id && item.lensType === lensType
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity, lensType }];
      });
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    (productId: string, lensType: string) => {
      setCart((prev: CartItem[]) =>
        prev.filter(
          (item) =>
            !(item.product.id === productId && item.lensType === lensType)
        )
      );
    },
    [setCart]
  );

  const updateCartQuantity = useCallback(
    (productId: string, lensType: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, lensType);
        return;
      }
      setCart((prev: CartItem[]) =>
        prev.map((item) =>
          item.product.id === productId && item.lensType === lensType
            ? { ...item, quantity }
            : item
        )
      );
    },
    [setCart, removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => {
      let lensPrice = 0;
      if (item.lensType === "Progressive") lensPrice = 50;
      if (item.lensType === "Blue Light") lensPrice = 30;
      return sum + (item.product.price + lensPrice) * item.quantity;
    }, 0);
  }, [cart]);

  const placeOrder = useCallback(
    (customer: Order["customer"]) => {
      const orderId = `OV-${Date.now()
        .toString(36)
        .toUpperCase()}-${Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase()}`;
      const order: Order = {
        id: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        total: getCartTotal(),
        status: "Processing",
        customer,
      };
      setOrders((prev: Order[]) => [order, ...prev]);
      clearCart();
      return orderId;
    },
    [cart, getCartTotal, setOrders, clearCart]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev: WishlistItem[]) => {
        const exists = prev.find((item) => item.productId === productId);
        if (exists) {
          return prev.filter((item) => item.productId !== productId);
        }
        return [...prev, { productId, addedAt: new Date().toISOString() }];
      });
    },
    [setWishlist]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((item) => item.productId === productId);
    },
    [wishlist]
  );

  return (
    <AppContext.Provider
      value={{
        cart,
        orders,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        placeOrder,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
