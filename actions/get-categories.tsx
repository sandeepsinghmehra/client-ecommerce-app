import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_STORE_ID}/categories`;

const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getCategories;