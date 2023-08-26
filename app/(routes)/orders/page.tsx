import Container from '@/components/ui/container';


export const revalidate = 0;

const OrdersPage = async() => {
  return (
    <Container>
      <section className='text-gray-600 overflow-hidden'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='lg:w-4/5 h-full mx-auto flex flex-wrap'>
            <div className='lg:w-1/2 w-full lg:pr-10 lg:py-6 lg:mb-0'>
              <h2 className='text-sm text-gray-500 tracking-widest uppercase'>Orders Page</h2>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default OrdersPage;
