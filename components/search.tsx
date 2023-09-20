'use client'

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Search() {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch('')
        router.push(`/search/${search}/`)
    }

    return (
        <>
        
        <form className="w-40 h-16 hidden md:flex justify-center items-center" onSubmit={handleSubmit}>
            <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-black pl-2 h-8 w-36 text-xs rounded-l-2xl bg-gray-100 rounded-r-none border-r-transparent font-bold focus:outline-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                placeholder="Search Product"
            />
            <button className="px-3 h-8 rounded-r-2xl border-l-transparent bg-gray-100 border">
                <SearchIcon size={15} className="bg-white text-black" />
            </button>
        </form>
        <button className="h-8 block md:hidden ">
            <SearchIcon size={15} className="bg-white text-black" />
        </button>
        {/* <form className="w-40 h-16 absolute bottom-0 flex md:hidden justify-center items-center" onSubmit={handleSubmit}>
            <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-black pl-2 h-8 w-36 text-xs rounded-l-2xl bg-gray-100 rounded-r-none border-r-transparent font-bold"
                placeholder="Search Product"
            />
            <button className="px-3 h-8 rounded-r-2xl border-l-transparent bg-gray-100 border">
                <SearchIcon size={15} className="bg-white text-black" />
            </button>
        </form> */}
        </>
    )
}