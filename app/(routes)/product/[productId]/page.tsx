import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/product-info";
import { ProductList } from "@/components/product-list";
import { SuggestionProductList } from "@/components/suggestion-product-list";
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
    let variants = await getProducts({name: product.name });
    let colorSizeId:any = {} // { color: {size: {_id: 'asflsj2323sdfsd'}}}
    let sizeColorId:any = {} // { size: {color: {_id: 'asflsj2323sdfsd'}}}
    for(let item of variants){
        if(Object.keys(colorSizeId).includes(item.colorId.value)){
            colorSizeId[item.colorId.value][item.sizeId.value] = {_id: item._id}
        } else {
            colorSizeId[item.colorId.value] = {}
            colorSizeId[item.colorId.value][item.sizeId.value] = {_id: item._id}
        }
    }
    for(let item of variants){
        if(Object.keys(sizeColorId).includes(item.sizeId.value)){
            sizeColorId[item.sizeId.value][item.colorId.value] = {_id: item._id}
        } else {
            sizeColorId[item.sizeId.value] = {}
            sizeColorId[item.sizeId.value][item.colorId.value] = {_id: item._id}
        }
    }
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
                        <Info 
                            product={product} 
                            variantsColorSizeId={JSON.parse(JSON.stringify(colorSizeId))}
                            variantsSizeColorId={JSON.parse(JSON.stringify(sizeColorId))} 
                        />
                        </div>
                    </div>
                    <hr className="my-10" />
                    <SuggestionProductList title={"Related Items"} items={suggestionProducts} />
                </div>
            </Container>
        </div>
    )
}

export default ProductPage;