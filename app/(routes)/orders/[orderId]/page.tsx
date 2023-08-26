import getOrder from '@/actions/get-order';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import Image from 'next/image';

interface OrderPageProps {
    params: {
      orderId: string;
  },
}

export const revalidate = 0;

const OrderPage:React.FC<OrderPageProps> = async({
  params
}) => {
  const order = await getOrder(params.orderId);
  return (
    <Container>
      <section className='text-gray-600 overflow-hidden'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='lg:w-4/5 h-full mx-auto flex flex-wrap'>
            <div className='w-full lg:pr-10 lg:py-6 lg:mb-0'>
              <h2 className='text-sm text-gray-500 tracking-widest uppercase'>Shopcart.com</h2>
              <h1 className='text-gray-900 text-3xl font-medium mb-4'>Order Id: #{order._id}</h1>
              <p className='leading-relaxed mb-4'>Your order has been successfully placed. Your Payment Status is: {order.status}</p>
              <div className='flex mb-4'>
                <div className='flex-grow text-center py-2 text-lg px-1'>Item Description</div>
                <div className='flex-grow text-center border-gray-300 py-2 text-lg px-1'>Quantity</div>
                <div className='flex-grow text-center border-gray-300 py-2 text-lg px-1'>Item Total</div>
                <div className='flex-grow text-center border-gray-300 py-2 text-lg px-1'>Item Image</div>
              </div>
              {order.orderItems.map((item:any)=>(<div key={item._id} className='flex border-t border-gray-200 py-2'>
                <span className='text-gray-500'>{item.name} ({item.size.name}/{item.color.name})</span>
                <span className='m-auto text-gray-900'>{item.quantity}</span>
                <span className='m-auto text-gray-900'>{item.price}</span>
                <span className='relative lg:w-10 w-7 lg:h-10 h-7 rounded-md overflow-hidden'>
                  <Image  
                    fill
                    alt='ecommerce-image'
                    src={item.images[0].url} 
                    className='w-full h-full object-cover object-center rounded'
                  /></span>
              </div>))}
              <div className='flex flex-col'>
                <span className='font-medium text-2xl text-gray-900'>SubTotal: ${JSON.parse(order.paymentInfo).TXNAMOUNT}</span>
                <div className='my-6'>
                  <Button
                    variant={'destructive'}
                    size={'sm'}
                  >
                    Track Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default OrderPage;
