"use client"

import { useState, useEffect } from 'react';
import { ShoppingCart, User } from "lucide-react";
import { ChevronDown, Menu, X } from 'lucide-react';

import { Button } from "@/components/ui/button";
import Search from '../search';
import { NavbarItems } from './navbar-items';
import { Category } from '@/types';
import { usePathname } from 'next/navigation';
import { useCartContext } from '@/context/cartContext';
import Link from 'next/link';

interface NavbarActionsProps {
    data: Category[];
};

export const NavbarActions: React.FC<any> = ({
    data
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const pathName = usePathname();
    const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
    const { items, addItem, removeItem, removeAll } = useCartContext();

    const routes = data.map((route:any) => ({
        href: `/category/${route._id}`,
        label: route.name,
        active: pathName === `/category/${route._id}`
    }))
    useEffect(() => {
        setIsMounted(true);
    },[]);
     
    if(!isMounted) {
        return null;
    }
    
    return (
        <div
            className='ml-auto flex items-center gap-x-1 lg:gap-x-4'
        >
            <div className='flex flex-row items-center justify-center lg:px-2'>
                <Search />
            </div>
            <div className='flex flex-row items-center justify-center lg:px-2 lg:gap-x-1'>
                <Button size={'icon'} variant={'outline'} className="relative flex items-center border-none rounded-full ">
                    <User size={20} className='w-4 h-4' />
                </Button>
                <div className='hidden lg:block'>Account</div>
            </div>
            <Link href={'/cart'} >
                <div className='flex flex-row items-center justify-center lg:gap-x-1'>
                    <Button size={'icon'} variant={'outline'} className="relative flex items-center border-none rounded-full ">
                        <ShoppingCart
                            size={20}
                            color="black"
                        />
                        <span className="absolute right-0 top-0 ml-2 text-sm font-bold text-red-600">
                            {items.length}
                        </span>
                    </Button> 
                    <div className='hidden lg:block'>Cart</div>  
                </div>
            </Link>
            <section className="MOBILE-MENU flex justify-end lg:hidden">
                <Button
                    size={'icon'}
                    variant={'outline'}
                    className="HAMBURGER-ICON "
                    onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
                >
                    <Menu size={20} className='w-5 h-5' />
                </Button>

            <div className={isNavOpen ? "absolute w-full h-screen top-0 left-0 bg-white z-10 flex flex-col" : "hidden"}>{/*  // toggle class based on isNavOpen state */}
                <Button
                    size={'icon'}
                    variant={'outline'}
                    className="CROSS-ICON absolute top-0 right-0 outline-none"
                    onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                >
                    <X size={20} className='w-5 h-5' />
                </Button>
                <NavbarItems setIsNavOpen={setIsNavOpen} routes={routes} /> 
          </div>
        </section> 
        </div>
    )
}