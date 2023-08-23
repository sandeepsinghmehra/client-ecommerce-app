"use client";

import { Product } from "@/types";
import { Currency } from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/cartContext";
import { Minus, Plus } from "lucide-react";

interface PreviewInfoProps {
    product: Product;
}
const PreviewInfo: React.FC<PreviewInfoProps> = ({
    product,
}) => {
    const router = useRouter();

    const { items, addItem, removeItem, removeAll } = useCartContext();
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
                return matchingItem.quantity;
            } else {
                return product.quantity;
            }
        }
        return product.quantity
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <hr className="my-5" />
            <div className="mt-3 flex flex-col items-start justify-between">
                <p className="text-2xl text-gray-900">
                <Currency value={product?.price.$numberDecimal} />
                </p>
                <p className="text-muted-foreground text-sm">Suggested Payments with 6 month special financing.</p>
            </div>
            <hr className="my-5" />
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Size:</h3>
                <div>
                    {product?.sizeId?.value}
                </div>
                </div>
                <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Color:</h3>
                <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: product?.colorId?.value }} />
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
        </div>
    )
}

export default PreviewInfo;