import { Product } from "@/types";
import { NoResults } from "@/components/ui/no-results";
import { SuggestionProductCard } from "./ui/suggestion-product-card";

interface ProdcutListProps {
    title: string;
    items: Product[];
}

export const SuggestionProductList: React.FC<ProdcutListProps> = ({
    title,
    items
}) => {
    return (
        <div className="space-x-3">
            <h3 className="font-bold text-3xl my-5">{title}</h3>
            {items.length === 0 && <NoResults />} 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item:any)=>{
                    return (
                        <SuggestionProductCard key={item._id} data={item} />
                )})}
            </div>
        </div>
    )
}