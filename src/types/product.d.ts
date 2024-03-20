export interface Product {
    id: string;
    title: string;
    content: string;
    price?: string;
    discount?: string;
    stock?: string;
    location?: string;
    imagesNames?: string[];
    imageSrc?: string[];
    dateCreated?: string;
    categories?: Categories[];
    attributes?: Attributes[];
    subcategories?:Subcategories[];
}

export interface Products {
    id: string | undefined;
    products: Product[];
}


