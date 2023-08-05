import { Product } from "@/types";
import { NoResults } from "@/components/ui/no-results";
import { ProductCard } from "@/components/ui/product-card";

interface ProdcutListProps {
    title: string;
    items: Product[];
}

export const ProductList: React.FC<ProdcutListProps> = ({
    title,
    items
}) => {
    return (
        <div className="space-x-3">
            <h3 className="font-bold text-3xl">{title}</h3>
            {items.length === 0 && <NoResults />} 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item)=>(
                    <ProductCard key={item._id} data={item} />
                ))}
            </div>
        </div>
    )
}