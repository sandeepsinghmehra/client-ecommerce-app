"use client";

import Image from "next/image"

import { Product } from "@/types"
import { IconButton } from "@/components/ui/icon-button";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import { Currency } from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { usePreviewContext } from "@/context/usePreview";


interface ProductCardProps {
    data: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({
    data
}) => {
    const { onOpen } = usePreviewContext();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data._id}`)
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
    
        onOpen(data);
    };
    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="Image"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex justify-center gap-x-6">
                        <IconButton icon={<Expand size={20}/>} onClick={onPreview} className={"text-gray-600"}/>
                        <IconButton icon={<ShoppingCart size={20}/>} onClick={()=>{}} className={"text-gray-600"}/>
                    </div>
                </div>
                <div className="opacity-100 transition absolute right-0 top-0 p-2">
                    <IconButton icon={<Heart size={20}/>} onClick={()=>{}} className={"text-gray-600"}/>
                </div>
            </div>
            {/* Description */}
            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.categoryId?.name}
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price?.$numberDecimal} />
            </div>
        </div>
    )
}