"use client";

import Image from "next/image"

import { Product } from "@/types"
import { IconButton } from "@/components/ui/icon-button";
import { Expand, Heart } from "lucide-react";
import { Currency } from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { usePreviewContext } from "@/context/usePreview";
import { Button } from "./button";
import { useCartContext } from "@/context/cartContext";


interface ProductCardProps {
    data: Product
}

export const Card: React.FC<ProductCardProps> = ({
    data
}) => {
    const { onOpen } = usePreviewContext();
    const { addItem } = useCartContext();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data._id}`)
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
    
        onOpen(data);
    };
    const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        addItem(data);
    };

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 overflow-hidden">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt={`Image-${data._id}`}
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 top-20">
                    <div className="flex justify-center gap-x-6">
                        <IconButton icon={<Expand size={20}/>} onClick={onPreview} className={"text-gray-600"}/>
                    </div>
                </div>
                <div className="opacity-100 transition absolute right-0 top-0 p-2">
                    <IconButton icon={<Heart size={20}/>} onClick={()=>{}} className={"text-gray-600"}/>
                </div>
            </div>
            <div className="">
            {/* Description */}
            <div className="w-full">
                <p className="font-semibold text-lg w-full h-10 my-auto leading-tight line-clamp-2 overflow-hidden">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500 my-1">
                    {data.categoryId?.name}
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price?.$numberDecimal} />
            </div>

             {/* Cart button */}
             <Button 
                size={'sm'}
                variant={'secondary'}
                className="rounded-3xl text-teal-900 hover:bg-teal-900 hover:text-white my-2"
                onClick={handleAddToCart}
            >
                Add to Cart
            </Button>
            </div>
        </div>
    )
}