"use client";

import { Product } from "@/types";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Album, ShoppingCart, Terminal, Truck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";
import Link from "next/link";

interface InfoProps {
    data: Product
}
const Info: React.FC<InfoProps> = ({
    data
}) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <p className="text-muted-foreground text-sm">A perfect balance of exhilarating high-fidelity  audio  and effortless magic of AirPods and effortless magic of AirPods.</p>
            <hr className="my-4" />
            <div className="mt-3 flex flex-col items-start justify-between">
                <p className="text-2xl text-gray-900">
                <Currency value={data?.price.$numberDecimal} />
                </p>
                <p className="text-muted-foreground text-sm">Suggested Payments with 6 month special financing.</p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Size:</h3>
                <div>
                    {data?.sizeId?.value}
                </div>
                </div>
                <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Color:</h3>
                <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.colorId?.value }} />
                </div>
            </div>
            <hr className="my-4" />
            <div className="mt-10 flex items-center gap-x-3">
                <Button
                    size={'lg'}
                    variant={'default'}
                    className="bg-teal-900 text-white rounded-3xl"
                    onClick={()=>{}}
                >
                    Buy Now
                </Button>
                <Button 
                    size={'lg'}
                    variant={'outline'}
                    onClick={()=>{}} 
                    className="space-x-2 text-teal-900 rounded-3xl border-2 border-teal-900"
                >
                    Add To Cart
                </Button>
            </div>
            <div className="border rounded-md mt-4">
                <Alert className="border-none">
                    <Truck 
                        color="red"
                        className="h-4 w-4 text-red-600" 
                    />
                    <AlertTitle>Free Delivery</AlertTitle>
                    <AlertDescription>
                        <Input 
                            type="text"
                            placeholder="Enter your Postal code for Delivery Avaliability" 
                            className="px-0 py-0 h-7 border-none focus:outline-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent underline"
                        />
                    </AlertDescription>
                </Alert>
                <hr className="my-0" />
                <Alert className="border-none">
                    <Album  
                        color="red" 
                        className="h-4 w-4" 
                    />
                    <AlertTitle>Return Delivery</AlertTitle>
                    <AlertDescription>
                        Free 30days Delivery Returns. <Link href={'/'}>Details</Link>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    )
}

export default Info;