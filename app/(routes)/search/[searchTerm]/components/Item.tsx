import Image from 'next/image'
import Link from 'next/link'

type Props = {
    result: any
}

export default function Item({ result }: Props) {
    const itemTextCol = (
        <div className="w-4/5 flex flex-col justify-center">
            <h2>
                <Link href={`/product/${result._id}`} target="_blank"
                    className="text-xl font-bold underline">
                    {result.name}
                </Link>
            </h2>
            <p className='line-clamp-2 overflow-hidden'>{result.description}</p>
            <p>Available Quantity: {result.availableQuantity}</p>
        </div>
    )

    const content = result?.images
        ? (
            <article className="mx-auto my-2 w-4/5 bg-transparent border">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-center">
                        <Image
                            src={result?.images[0].url}
                            alt={result.name}
                            width={300}
                            height={300}
                            loading="lazy"
                        />
                    </div>
                    {itemTextCol}
                </div>
            </article>

        )
        : (
            <article className="m-4 max-w-lg">
                {itemTextCol}
            </article>
        )

    return content
}