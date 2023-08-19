import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_STORE_ID}/billboards`;

const getBillboards = async (): Promise<Billboard[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getBillboards;