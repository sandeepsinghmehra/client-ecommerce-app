import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/product-info";
import { ProductList } from "@/components/product-list";
import Container from "@/components/ui/container";
import { useParams } from "next/navigation";

export const revalidate = 0;

interface ProductPageProps {
    params: {
        productId: string;
    }
}

const ProductPage: React.FC<ProductPageProps> = async({
    params
}) => {
    const product = await getProduct(params.productId);
    const suggestionProducts = await getProducts({
        categoryId: product?.categoryId?._id
    });
    return (
        <div className="bg-white">
            <Container>
                <div className="w-full px-4 py-7 sm:px-6 lg:px-8">
                    <div className="w-full h-5 line-clamp-1 space-x-2 mb-7 overflow-hidden">
                        <span className="capitalize font-semibold text-sm text-muted-foreground">
                            Product
                        </span>
                        <span>/</span>
                        <span className="capitalize font-semibold text-sm text-muted-foreground">
                            {product?.categoryId?.name.toLowerCase()}
                        </span>
                        <span>/</span>
                        <span className="capitalize font-bold text-sm text-muted-foreground">{product?.name.toLowerCase()}</span>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Gallary */}
                        <Gallery images={product.images} />
                        
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        {/* Info */}
                        <Info data={product} />
                        </div>
                    </div>
                    <hr className="my-10" />
                    <ProductList title={"Related Items"} items={suggestionProducts} />
                </div>
            </Container>
        </div>
    )
}

export default ProductPage;