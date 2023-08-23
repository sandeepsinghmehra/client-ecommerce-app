"use client"

import { Category } from '@/types';
import { usePathname } from 'next/navigation';
import { NavbarItems } from './navbar-items';


interface MainNavProps {
    data: Category[];
};

export const MainNav: React.FC<MainNavProps> = ({
    data
}) => {

    const pathName = usePathname();

    const routes = data.map((route:any) => ({
        href: `/category/${route._id}`,
        label: route.name,
        active: pathName === `/category/${route._id}`
    }))
    return (
        <nav
            className='mx-6 h-16 w-full flex flex-row-reverse lg:flex-row items-center space-x-4 lg:space-x-6'
        >  
          <div className="DESKTOP-MENU hidden space-x-8 lg:flex">
            <NavbarItems routes={routes} />
          </div>
        </nav>
    )
}