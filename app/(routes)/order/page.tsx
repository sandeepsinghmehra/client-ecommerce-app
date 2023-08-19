import Container from '@/components/ui/container';


interface OrderPageProps {}

export const revalidate = 0;

const OrderPage:React.FC<OrderPageProps> = async() => {
  
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        Order confirmed
      </div>
    </Container>
  )
}

export default OrderPage;
