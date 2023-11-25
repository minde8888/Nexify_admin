export interface Product {
    id?: number | null;
    title: string;
    content: string;
    price?: number | null;
    discount?: number | null;
    imageNames?: string | null;
    stock?: number | null;
}

export interface Products {
    products: Product[];
}
