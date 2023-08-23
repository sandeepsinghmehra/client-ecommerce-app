"use client";

import { Product } from "@/types";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Album, Minus, Plus, ShoppingCart, Terminal, Truck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/cartContext";

interface InfoProps {
    product: Product;
    variantsColorSizeId: any;
    variantsSizeColorId: any;
}
const Info: React.FC<InfoProps> = ({
    product,
    variantsColorSizeId,
    variantsSizeColorId
}) => {
    const router = useRouter();
    const [currentColor, setCurrentColor] = useState(product.colorId.value);
    const [currentSize, setCurrentSize] = useState(product.sizeId.value);

    const { items, addItem, removeItem, removeAll } = useCartContext();
    const refreshVariant = (newSize:string, newColor:string) => {
        // console.log("variantsColorSizeId[newColor][newSize]['_id']: ", variantsColorSizeId[newColor][newSize]["_id"]);
        if(!variantsColorSizeId[newColor][newSize]?.["_id"]){
            console.log("This is undefined.", newColor, newSize);
            setCurrentColor(newColor);
            setCurrentSize(newSize);
        } else {
            router.refresh();
            router.push(`/product/${variantsColorSizeId[newColor][newSize]["_id"]}`);
        }
    }
    const buyNow: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.stopPropagation();
        removeAll();
        addItem(product);
        router.push('/checkout');
    }
    const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        addItem(product);
    };
    const handleDecreaseProductItems: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        removeItem(product._id);
    };
    const productQuantity:any = () => {
        if(items !== undefined) { 
            const matchingItem = items.find((item) => item._id === product._id);

            if (matchingItem) {
                console.log("matchingItem.quantity: ", matchingItem.quantity);
                return matchingItem.quantity;
            } else {
                console.log("product.quantity: ", product.quantity);
                return product.quantity;
            }
        }
        return product.quantity
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-muted-foreground text-sm">{product.description}</p>
            <hr className="my-5" />
            <div className="mt-3 flex flex-col items-start justify-between">
                <p className="text-2xl text-gray-900">
                <Currency value={product?.price.$numberDecimal} />
                </p>
                <p className="text-muted-foreground text-sm">Suggested Payments with 6 month special financing.</p>
            </div>
            <hr className="my-5" />
            <div className="flex-col gap-y-4 group-hover:flex ">
                <div className="flex items-center gap-x-4 my-2">
                    <h3 className="font-semibold text-black">Size:</h3>
                    {/* <div className="flex flex-row w-full line-clamp-1">
                        {Object.keys(variantsColorSizeId[currentColor]).map((size: any, i) => {
                            console.log("size", size)
                            return (
                                <span key={i}>
                                    <div onClick={()=>refreshVariant(size, currentColor)} className={`border rounded-md px-2 mx-1 ${size === currentSize ? 'border-black': Object.keys(variantsColorSizeId[currentColor]).includes(size)? 'border-green-400' : 'border-red-800'}`}>{size}</div>
                                </span>
                            )
                        })}  
                    </div> */}
                    <div className="flex flex-row w-full line-clamp-1">
                                {Object.keys(variantsSizeColorId).map((size, i)=>{
                                    return (
                                        <span key={i}>
                                            <div onClick={()=>refreshVariant(size, currentColor)} className={`border-2 rounded-md px-2 mx-1 ${size === currentSize ? 'border-black': Object.keys(variantsColorSizeId[currentColor]).includes(size)? 'border-green-400' : 'border-red-800'}`}>{size}</div>
                                        </span>
                                    )
                                }
                            )};
                    </div>
                </div>
                <div className="flex items-center gap-x-4 my-2">
                    <h3 className="font-semibold text-black">Color:</h3>
                    {/* <div className="flex flex-row w-full line-clamp-1">
                        {Object.keys(variantsColorSizeId).map((color: any, i) => {
                            return (
                                <span key={i}>
                                    {Object.keys(variantsColorSizeId).includes(color) && Object.keys(variantsColorSizeId[color]).includes(currentSize) && <div onClick={()=>refreshVariant(currentSize, color)} className={`h-6 w-6 rounded-full border-2 px-2 mx-1 ${color === currentColor ? 'border-black': 'border-gray-200'}`} style={{ backgroundColor: color }} />}
                                </span>
                            )
                        })}
                    </div> */}
                    <div className="flex flex-row w-full line-clamp-1">
                        {Object.keys(variantsColorSizeId).map((color: any, i) => {
                            return (
                                <span key={i}>
                                    {Object.keys(variantsColorSizeId).includes(color) && <div onClick={()=>refreshVariant(currentSize, color)} className={`h-6 w-6 rounded-full border-2 px-2 mx-1 ${color === currentColor ? 'border-black': 'border-gray-200'}`} style={{ backgroundColor: color }} />}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
            <hr className="my-5" />
            <div className="flex flex-row">
                <div className="flex flex-row items-center justify-evenly border rounded-3xl px-4 space-x-4 bg-gray-200">
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        className="outline-none border-none bg-gray-200"
                        onClick={handleDecreaseProductItems}
                    >
                        <Minus size={20} className="w-5 h-5" />
                    </Button>
                    <p className="text-muted-foreground">
                    {productQuantity()}
                    </p>
                    <Button 
                        size={'icon'}
                        variant={'outline'}
                        className="outline-none border-none bg-gray-200"
                        onClick={handleAddToCart}
                    >
                        <Plus size={20} className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex flex-col ml-5">
                    <p className="text-muted-foreground text-sm font-semibold">Only <span className="text-red-500">{product.availableQuantity} items</span> left!</p>
                    <p className="text-muted-foreground text-sm font-semibold">Don&apos;t miss it</p>
                </div>
            </div>
            <div className="mt-5 flex items-center gap-x-3">
                <Button
                    size={'lg'}
                    variant={'default'}
                    className="bg-teal-900 text-white rounded-3xl"
                    onClick={buyNow}
                >
                    Buy Now
                </Button>
                <Button 
                    size={'lg'}
                    variant={'outline'}
                    className="space-x-2 text-teal-900 rounded-3xl border-2 border-teal-900"
                    onClick={handleAddToCart}
                >
                    Add To Cart
                </Button>
            </div>
            <div className="border rounded-md mt-5">
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