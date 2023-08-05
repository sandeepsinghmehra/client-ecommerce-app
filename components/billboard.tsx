import { Billboard as BillboardType } from "@/types"



interface BillboardProps {
    data: BillboardType
}
export const Billboard: React.FC<BillboardProps> = ({
    data
}) => {
    return (
        <div className="px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-sm overflow-hidden">
            <div 
                className="rounded-sm relative aspect-square md:aspect-auto md:h-80 overflow-hidden bg-cover"
                style={{backgroundImage: `url(${data?.imageUrl})`}}>
                    <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                        <div
                            className="font-bold text-3xl bg-blend-multiply text-white sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
                        >{data.label}</div>
                    </div>
            </div>
        </div>
    )
}