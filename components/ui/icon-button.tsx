import { cn } from "@/lib/utils"
import { MouseEventHandler } from "react"

interface IconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactElement;
    className?: string;
}
export const IconButton: React.FC<IconButtonProps> = ({
    onClick,
    icon,
    className
}) => {
    return (
        <button 
            onClick={onClick} 
            className={cn(`
                rounded-full
                bg-white
                border
                flex
                items-center
                justify-center
                p-2
                shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-50
                hover:scale-110
                transition
            `, className)}
        >
        {icon}
        </button>
    )
}