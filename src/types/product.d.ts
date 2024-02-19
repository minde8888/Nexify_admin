export interface Product {
    id: string;
    title: string;
    content: string;
    price?: string;
    discount?: string;
    size?: string;
    stock?: string;
    location?: string;
    imageNames?: string;
    imageSrc?: string[];
    itemsImagesNames?: string[];
    itemSrc?: string[];
    dateCreated?: string;
    categories?: CategoryResponse;
}

export interface Products {
    id: string | undefined;
    products: Product[];
}
