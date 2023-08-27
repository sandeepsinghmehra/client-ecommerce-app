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
        <div className='container px-5 mx-auto'>
          <div className='lg:w-4/5 h-full mx-auto flex flex-wrap'>
            <div className='w-full lg:pr-10 lg:py-6 lg:mb-0'>
              <h2 className='text-sm text-gray-500 tracking-widest uppercase'>Shopcart.com</h2>
              <h1 className='text-gray-900 text-xl font-medium mb-4'>Order Id: <span className='text-gray-600'>#{order._id}</span></h1>
              <p className='leading-relaxed mb-4'>Your order has been successfully placed.</p>
              <p> Your Payment Status is: <span className={order.status.toLowerCase() === 'paid'? 'text-green-700 font-bold': 'text-orange-400 font-bold'}>{order.status}</span></p>
              
              {order.orderItems.map((item:any)=>(<div key={item._id} className='flex flex-col md:flex-row md:justify-between border-t border-gray-200 py-2'>
                <div className='flex items-center'>
                  <div className='relative lg:w-20 w-10 lg:h-20 h-10 bg-slate-200 border p-2 rounded-md overflow-hidden'>
                    <Image  
                      fill
                      alt='ecommerce-image'
                      src={item.images[0].url} 
                      className='w-full h-full object-cover object-center p-2 rounded'
                    />
                  </div>
                  <div className='flex flex-col pl-5'>
                    <p className='text-gray-600 font-semibold text-lg'>{item.name}</p>
                    <p className='text-gray-400 text-sm font-semibold'>{item.size.name} | {item.color.name}</p>
                  </div>
                </div>
                <div className='flex flex-row md:flex-col md:items-center justify-between md:justify-center'>
                  <span className='text-gray-800 text-lg font-medium'>₹{item.price}</span>
                  <span className='text-gray-400 text-sm font-semibold'>Qty: {item.quantity}</span>
                </div> 
              </div>))}
              <div className='flex flex-col items-end'>
                <div className='font-medium text-2xl text-gray-700'>SubTotal: ${JSON.parse(order.paymentInfo).TXNAMOUNT}</div>
                <div className='my-6'>
                  <Button
                    variant={'destructive'}
                    size={'sm'}
                    className='bg-green-700'
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
