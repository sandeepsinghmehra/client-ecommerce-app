import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/product-info";
import { ProductList } from "@/components/product-list";
import Container from "@/components/ui/container";

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
                <div className="px-4 py-10 sm:px-6 lg:px-8">
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