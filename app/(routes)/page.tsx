import getBillboard from '@/actions/get-billboard';
import getBillboards from '@/actions/get-billboards';
import getProducts from '@/actions/get-products';
import Carousel from '@/components/Carousel';
import { ProductList } from '@/components/product-list';
import Container from '@/components/ui/container';

export const revalidate = 0;
export default async function HomePage() {
  const products = await getProducts({isFeatured: true});
  const billboards = await getBillboards();

  return (
    <Container>
      <div className='space-y-10 pb-10'>
        {/* <Billboard data={billboard} /> */}
        <Carousel data={billboards} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList title={"Featured Product "}  items={products} />
        </div>
      </div>
    </Container>
  )
}
