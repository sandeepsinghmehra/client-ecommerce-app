'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: any;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="bg-transparent w-4/5 m-auto text-center py-10 px-0 min-h-screen">
            <h2 className="my-4 text-2xl font-bold">Something went wrong!</h2>
            <Button size={'lg'} variant={'destructive'} className="mb-4 p-4 text-white rounded-xl"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
            <p className="text-xl">
                Or go back to <Link href="/" className="underline">Home</Link>
            </p>
        </main>
    );
}