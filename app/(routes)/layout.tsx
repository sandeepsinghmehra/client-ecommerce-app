import Footer from '@/components/footer'
import '../globals.css'

export const metadata = {
  title: 'Shopcart | Home',
  description: 'Shopcart',
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <Footer />
        </>
    )
}
