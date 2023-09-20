import Item from "./components/Item"
import getProducts from "@/actions/get-products"


type Props = {
    params: {
        searchTerm: string
    }
}

export const revalidate = 0;

export async function generateMetadata({ params: { searchTerm } }: Props) {
    const products = await getProducts({
        name: searchTerm,
    });
    const displayTerm = searchTerm.replaceAll('%20', ' ')
    console.log("products: ", products);
    // if (!data?.query?.pages) {
    //     return {
    //         title: `${displayTerm} Not Found`
    //     }
    // }

    return {
        title: displayTerm,
        description: `Search results for ${displayTerm}`
    }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
    const products = await getProducts({
        name: searchTerm.replaceAll('%20', ' '),
    });
    const displayTerm = searchTerm.replaceAll('%20', ' ')
    
    const content = (
        <>
            <main className="mx-auto py-1 ">
                {Object.values(products).length !== 0
                    ? Object.values(products).map(product => {
                        return <Item key={product._id} result={product} />
                    })
                    : <div className="p-2 text-xl h-96">{`${displayTerm} Not Found`}</div>
                }
            </main>
        </>
    )
    
    return content
}