"use client";

// import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Head from "next/head";
import Script from "next/script";
import { useCartContext } from "@/context/cartContext";
import CheckoutForm from "./components/checkout-form";
import Container from "@/components/ui/container";


declare global {
  interface Window {
    Paytm: any; // You can replace 'any' with a more specific type if available
  }
}
const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const { items } = useCartContext();
  
  const totalPrice = String(items.reduce((total, item:any) => {
    return total + Number(item.price.$numberDecimal) * item.quantity
  }, 0));
  
  let email="sandeep017@gmail.com"
  // let oid:string = String(Math.floor(Math.random() * Date.now()));
  
  const initiatePayment = async (value:any) => {
    
    //GET a transaction token
    const data = { 
      totalPrice, email, name: value.name, address: value.address, pincode: value.pincode, phone: value.phone, cart: items
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_STORE_ID}/checkout/pretransaction`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    let txnRes = await res.json();
  
    let txnToken = txnRes.txnToken;
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
          "orderId": txnRes.orderId, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": totalPrice /* update amount */
      },
      "handler": {
          "notifyMerchant": function(eventName:any,data:any){
            console.log("notifyMerchant handler function called");
            console.log("eventName => ",eventName);
            console.log("data => ",data);
          }
      }
    };
    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
    .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error: any){
      console.log("error window.Paytm.CheckoutJS.invoke => ",error);
    });
  } 
 
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
    //   removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams]);
  return ( 
    <div
      className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
        <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
        </Head>
        <Script 
          id={"paytm"} 
          type="application/javascript" 
          crossOrigin="anonymous" 
          strategy="afterInteractive"
          src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}> </Script>
          <Container>
            <div className="w-full px-4 py-7 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 my-4">
                Checkout
              </h2>
              <CheckoutForm data={items} initiatePayment={initiatePayment} totalPrice={totalPrice} />
            </div>
          </Container>
    </div>
  );
}
 
export default CheckoutPage;