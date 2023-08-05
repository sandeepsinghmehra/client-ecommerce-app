"use client";

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarItemsProps {
    routes: any[];
    setIsNavOpen?: ((value: boolean) => void) | undefined 
}
export const NavbarItems: React.FC<NavbarItemsProps> = ({
    routes,
    setIsNavOpen
}) => {
    const pathName = usePathname();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className={'outline-none'}>
                    <div className='flex flex-row items-center justify-start lg:justify-center p-3 lg:p-0 space-x-2'>
                        <p className='text-sm font-bold text-green-900 text-muted-foreground'>Categories</p> <ChevronDown size={15} className='mr-2 w-4 h-4' />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {routes.map((route:any) => (
                        <DropdownMenuItem>
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn("text-sm font-medium transition-colors hover:text-primary",route.active ? "text-black dark:text-white" : "text-muted-foreground")}
                                onClick={() =>  setIsNavOpen && setIsNavOpen(false)} 
                            >
                                <DropdownMenuLabel>{route.label}</DropdownMenuLabel>
                            </Link>
                        </DropdownMenuItem>    
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <Link
                key={`/deals`}
                href={'/deals'}
                className={cn("text-sm p-3 lg:p-0 font-bold transition-colors hover:text-primary", pathName === '/deals' ? "text-black dark:text-white" : "text-muted-foreground")}
                onClick={() =>  setIsNavOpen && setIsNavOpen(false)} 
            >
                Deals
            </Link>
            <Link
                key={`/whats-new`}
                href={'/whats-new'}
                className={cn("text-sm p-3 lg:p-0 font-bold transition-colors hover:text-primary", pathName === '/whats-new' ? "text-black dark:text-white" : "text-muted-foreground")}
                onClick={() =>  setIsNavOpen && setIsNavOpen(false)} 
            >
                What's New
            </Link>
            <Link
                key={`/delivery`}
                href={'/delivery'}
                className={cn("text-sm p-3 lg:p-0 font-bold transition-colors hover:text-primary", pathName === '/delivery' ? "text-black dark:text-white" : "text-muted-foreground")}
                onClick={() =>  setIsNavOpen && setIsNavOpen(false)} 
            >
                Delivery
            </Link>
        </>
    )
}