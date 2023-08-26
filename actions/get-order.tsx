
const URL=`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_STORE_ID}/orders`;

const getOrder = async (id: string): Promise<any> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getOrder;