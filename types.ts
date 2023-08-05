export interface Billboard {
    _id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    _id: string;
    name: string;
    billboardId: Billboard;
}

export interface Product {
    _id: string;
    categoryId: Category;
    name: string;
    price: {$numberDecimal: string};
    sizeId: Size;
    colorId: Color;
    images: Image[];
    isFeatured: boolean;
}
export interface Image {
    _id: string;
    url: string;
}
export interface Size {
    _id: string;
    name: string;
    value: string;
}
export interface Color {
    _id: string;
    name: string;
    value: string;
}

export interface Result {
    pageid: string,
    title: string,
    extract: string,
    thumbnail?: {
        source: string,
        width: number,
        height: number,
    }
}
export interface SearchResult {
    query?: {
        pages?: Result[],
    },
}