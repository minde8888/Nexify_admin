import { Attributes } from './attributes';

export interface Product {
    id: string;
    title: string;
    content: string;
    price?: string;
    discount?: string;
    size?: string;
    stock?: string;
    location?: string;
    imagesNames?: string[];
    imageSrc?: string[];
    itemSrc?: string[];
    dateCreated?: string;
    categories?: CategoryResponse;
    attributes?: Attributes[];
}

export interface Products {
    id: string | undefined;
    products: Product[];
}
