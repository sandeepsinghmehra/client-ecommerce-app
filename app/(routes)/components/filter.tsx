"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Category, Color, Size } from "@/types";
import { ChevronDown } from "lucide-react";

interface FilterProps {
  data: (Category | Size | Color)[];
  name: string;
  valueKey: string;
};

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClickHandle = (id: string) => {
    
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true });

    router.push(url);
  }

  return ( 
        <div className="ml-2">
            <DropdownMenu>
                <DropdownMenuTrigger className={'outline-none'}>
                    <div className='flex flex-row items-center lg:rounded-3xl bg-gray-200 justify-start border px-3 py-1 my-2 lg:my-0 lg:justify-center lg:px-4 lg:py-1 space-x-2'>
                        <p className='text-base font-bold text-green-900 text-muted-foreground'>{name}</p> <ChevronDown size={15} className='mr-2 w-4 h-4' />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="h-80 max-h-80 overflow-y-scroll">
                    {data.map((filter:any) => (
                        <DropdownMenuItem 
                            key={filter._id} 
                            className={cn(
                                'rounded-md text-sm text-gray-800 p-2 m-2 bg-white border border-gray-300',
                                selectedValue === filter._id && 'bg-black text-white'
                              )}
                            onClick={() => onClickHandle(filter._id)}
                        >
                            {filter.name}
                        </DropdownMenuItem>    
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
  );
};

export default Filter;