import getBillboards from '@/actions/get-billboards';
import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import Carousel from '@/components/Carousel';
import { ProductList } from '@/components/product-list';
import Container from '@/components/ui/container';
import Filter from './components/filter';
import { NoResults } from '@/components/ui/no-results';
import { ProductCard } from '@/components/ui/product-card';
import getCategories from '@/actions/get-categories';
import { ChevronDown } from 'lucide-react';
import MobileFilters from './components/mobile-filter';

interface HomePageProps {
  searchParams: {
      sizeId: string;
      colorId: string;
      categoryId: string;
  }
}

export const revalidate = 0;

const HomePage:React.FC<HomePageProps> = async({
  searchParams
}) => {
  // const products = await getProducts({isFeatured: true});
  const billboards = await getBillboards();
  const products = await getProducts({
    isFeatured: true,
    categoryId: searchParams.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId
  });
  const colors = await getColors();
  const sizes = await getSizes();
  const categories = await getCategories();
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Carousel data={billboards} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <MobileFilters categories={categories} sizes={sizes} colors={colors} />
            <div className="hidden lg:flex flex-row justify-between">
              <div className='flex'>
                <Filter 
                  valueKey="categoryId" 
                  name="Categories" 
                  data={categories}
                />
                <Filter
                  valueKey="sizeId" 
                  name="Sizes" 
                  data={sizes}
                />
                <Filter 
                  valueKey="colorId" 
                  name="Colors" 
                  data={colors}
                />
              </div>
              <div>
              <div className='flex flex-row items-center rounded-3xl bg-gray-200 justify-start border px-3 py-1 lg:justify-center lg:px-4 lg:py-1 space-x-2'>
                        <p className='text-base font-bold text-green-900 text-muted-foreground'>Sort By</p> <ChevronDown size={15} className='mr-2 w-4 h-4' />
                    </div>
              </div>
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <ProductList title={"Product For You "}  items={products} />
            </div>
          </div>
      </div>
    </Container>
  )
}

export default HomePage;
