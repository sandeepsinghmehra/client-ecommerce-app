const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_STORE_ID}/orders`;

const getOrders = async (): Promise<any> => {
    const res = await fetch(URL);

    return res.json();
};

export default getOrders;