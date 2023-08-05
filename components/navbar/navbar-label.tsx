"use client"

import Container from "@/components/ui/container";
import { ChevronDown, Phone } from "lucide-react";


const NavbarLabel = () => {

    return (
        <div className="h-10 bg-green-900">
            <Container>
                <div className="h-10 flex flex-row items-center justify-between px-1 sm:px-6 lg:px-8">
                    <p className="flex items-center justify-center text-white space-x-1 lg:space-x-2 ">
                        <Phone size={15} className="w-4 h-4" />
                        <span className="font-light text-xs">+001224567790</span>
                    </p>
                    <p className="hidden md:flex items-center justify-center text-white font-light text-xs">
                        Get 50% Off on Selected Items | Shop Now 
                    </p>
                    <p className="flex items-center justify-center text-white space-x-1 lg:space-x-2">
                        <span className="font-light text-xs">Eng</span><ChevronDown size={15} className="w-4 h-4"/>
                        <span className="font-light text-xs">Location</span> <ChevronDown size={15} className="w-4 h-4" />
                    </p>
                </div>
            </Container>
        </div>
    )
}
export default NavbarLabel;