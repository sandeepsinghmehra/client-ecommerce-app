"use client";

// import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Currency } from "@/components/ui/currency";
import { toast } from "react-hot-toast";
import { useCartContext } from "@/context/cartContext";
import Head from "next/head";

declare global {
  interface Window {
    Paytm: any; // You can replace 'any' with a more specific type if available
  }
}

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_STORE_ID}/checkout/pretransaction`;
const Summary = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { items, removeAll } = useCartContext();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item:any) => {
    return total + Number(item.price.$numberDecimal) * item.quantity
  }, 0);
  // const totalPrice = "10.00";

  const onCheckout = async () => {
    router.push('/checkout');
    // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
    //   productIds: items.map((item) => item._id)
    // });

    // window.location = response.data.url;
  }
  
  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
      </Head>
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}
 
export default Summary;