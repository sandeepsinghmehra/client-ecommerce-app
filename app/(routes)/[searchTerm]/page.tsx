import { Result, SearchResult } from "@/types"
import Item from "./components/Item"
// import getArticleResults from "@/lib/getArticleSearchResult"


type Props = {
    params: {
        searchTerm: string
    }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
    // const wikiData: Promise<SearchResult> = [] // getArticleResults(searchTerm)
    // const data = await wikiData
    const displayTerm = searchTerm.replaceAll('%20', ' ')

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
    // const wikiData: Promise<SearchResult> = getArticleResults(searchTerm)
    // const data = await wikiData
    // const results: Result[] | undefined = data?.query?.pages

    // const content = (
    //     <main className="bg-slate-200 prose prose-2xl mx-auto py-1 ">
    //         {results
    //             ? Object.values(results).map(result => {
    //                 return <Item key={result.pageid} result={result} />
    //             })
    //             : <div className="p-2 text-xl h-96">{`${searchTerm} Not Found`}</div>
    //         }
    //     </main>
    // )

    // return content
    return <div>asfsf</div>
}