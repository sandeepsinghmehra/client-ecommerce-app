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

export const ProductCard: React.FC<ProductCardProps> = ({
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
                        {/* <IconButton icon={<ShoppingCart size={20}/>} onClick={handleAddToCart} className={"text-gray-600"}/> */}
                    </div>
                </div>
                <div className="opacity-100 transition absolute right-0 top-0 p-2">
                    <IconButton icon={<Heart size={20}/>} onClick={()=>{}} className={"text-gray-600"}/>
                </div>
            </div>
            <div className="group w-full bg-white group-hover:pt-4 transition-transform transform translate-y-0 group-hover:-translate-y-20 duration-500">
            {/* Description */}
            <div>
                <p className="flex items-center font-semibold text-lg h-10 my-auto leading-tight line-clamp-2">
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

            {/* Color and size show for varient */}
                <div className="flex-col gap-y-4 h-0 hidden group-hover:flex ">
                    <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div className="flex flex-row w-full line-clamp-1">
                        {data?.sizeId.map((size: any) => (
                            <div key={size._id} className="border px-2 mx-1">{size.value}</div>
                        ))}
                    </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div className="flex flex-row w-full line-clamp-1">
                        {data?.colorId.map((color: any) => (
                            <div 
                                className="h-6 w-6 rounded-full border px-2 mx-1 border-gray-600" 
                                style={{ backgroundColor: color.value }}
                                key={color._id} 
                            />
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}