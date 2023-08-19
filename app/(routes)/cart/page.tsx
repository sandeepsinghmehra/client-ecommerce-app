"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';

import Summary from './components/summary'
import CartItem from './components/cart-item';
import { useCartContext } from '@/context/cartContext';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { items, addItem, removeItem, removeAll } = useCartContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {items.map((item) => (
                  <CartItem key={item._id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
};

export default CartPage;