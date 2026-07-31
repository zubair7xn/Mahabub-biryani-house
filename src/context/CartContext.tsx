'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { OrderItem } from '../types';

interface CartContextValue {
  items: OrderItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<OrderItem, 'specialNotes'> & { quantity?: number }) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  removeItem: (menuItemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'mahabub-cart';

const normalizeStoredItems = (value: unknown): OrderItem[] => {
  if (!Array.isArray(value)) return [];

  return value
    .reduce<OrderItem[]>((acc, item) => {
      if (typeof item !== 'object' || item === null) return acc;
      const record = item as Record<string, unknown>;
      const parsedItem = {
        menuItemId: typeof record.menuItemId === 'string' ? record.menuItemId : '',
        name: typeof record.name === 'string' ? record.name : '',
        price: typeof record.price === 'number' ? record.price : Number(record.price ?? 0),
        quantity: typeof record.quantity === 'number' ? record.quantity : Number(record.quantity ?? 0),
        specialNotes: typeof record.specialNotes === 'string' ? record.specialNotes : '',
      };

      if (parsedItem.menuItemId && parsedItem.quantity > 0) {
        acc.push(parsedItem);
      }

      return acc;
    }, []);
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(normalizeStoredItems(JSON.parse(stored)));
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage failures
    }
  }, [items]);

  const addItem = (item: Omit<OrderItem, 'specialNotes'> & { quantity?: number }) => {
    const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;

    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.menuItemId === item.menuItemId);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.menuItemId === item.menuItemId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }

      return [
        ...current,
        {
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeItem = (menuItemId: string) => {
    setItems((current) => current.filter((item) => item.menuItemId !== menuItemId));
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
