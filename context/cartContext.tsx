"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

// Create the initial context value (empty cart) and a dummy function for addItem, removeItem, and removeAll.
const initialCart: CartStore = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  removeAll: () => {},
};

// Create the context
const CartContext = createContext<CartStore>(initialCart);

// Create a custom hook to use the context easily in components
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};
// Create the provider component to wrap your application with
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children } ) => {
    const [items, setItems] = useState<Product[]>([]);

    const addItem = useCallback((data: Product) => {
        const existingItem = items.find((item) => item._id === data._id);

        if (existingItem) {
            const updatedItems = items.map((item:any) =>
                item._id === data._id ? { 
                    ...item, 
                    quantity: item?.quantity < data.availableQuantity ? item?.quantity + 1 : item?.quantity
                } : item
            );
            setItems(updatedItems);
            toast('Item quantity increased.');
        } else {
            setItems(prevItems => [...prevItems, { ...data, quantity: 1 }]);
            toast('Item added to cart.');
        }
    }, [items]);
  
    const removeItem = useCallback((id: string) => {
        const updatedItems = items.map((item:any) =>
            item._id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
    
        setItems(updatedItems);
    }, [items]);
  
    const removeAll = () => {
        setItems([]);
    };
  
    // Save the cart items in localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);
  
    // Load the cart items from localStorage on component mount
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setItems(JSON.parse(storedCartItems));
        }
    }, []);
  // Define the context value with the state and actions
  const cartContextValue: CartStore = {
    items: items,
    addItem,
    removeItem,
    removeAll,
  };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};
