import Footer from '@/components/footer'
import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/navbar/navbar'
import { PreviewContextProvider } from '@/context/previewContext'
import { ToasterProvider } from '@/providers/toast-provider'
import PreviewModalProvider from '@/providers/preview-modal-provider'
import NavbarLabel from '@/components/navbar/navbar-label'
import { CartProvider } from '@/context/cartContext'

const font = Poppins({
  weight: [ '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],  
  display: 'swap'
});

export const metadata = {
  title: 'Shopcart | Home',
  description: 'Shopcart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <CartProvider>
          <PreviewContextProvider>
            <PreviewModalProvider />
            <ToasterProvider />
            <NavbarLabel />
            <Navbar />
            {children}
            <Footer />
          </PreviewContextProvider>
        </CartProvider>
      </body>
    </html>
  )
}
