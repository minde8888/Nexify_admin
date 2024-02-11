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
    itemsImagesNames;
    itemSrc?: string[];
    dateCreated?: string;
    categories?: Categories[];
}

export interface Products {
    products: Product[];
}
