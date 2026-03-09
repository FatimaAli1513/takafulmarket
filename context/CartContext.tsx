import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as FileSystem from 'expo-file-system';
import { PRODUCTS, Product } from '@/constants/data';

const CART_FILE = `${FileSystem.documentDirectory}takafulmarket_cart.json`;

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoredCartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const saveCartToStorage = useCallback(async (items: CartItem[]) => {
    const toStore: StoredCartItem[] = items.map(({ product, quantity }) => ({
      productId: product.id,
      quantity,
    }));
    await FileSystem.writeAsStringAsync(CART_FILE, JSON.stringify(toStore));
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const stored = await FileSystem.readAsStringAsync(CART_FILE);
        if (stored) {
          const parsed: StoredCartItem[] = JSON.parse(stored);
          const items: CartItem[] = parsed
            .map(({ productId, quantity }) => {
              const product = PRODUCTS.find((p) => p.id === productId);
              return product ? { product, quantity } : null;
            })
            .filter((item): item is CartItem => item !== null);
          setCartItems(items);
        }
      } catch (e) {
        // ignore parse/storage errors
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isLoading, saveCartToStorage]);

  const addToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
