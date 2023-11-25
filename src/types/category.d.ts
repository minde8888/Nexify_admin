export interface Category {
    id?: number | null;
    categoryName: string;
    description: string;
    imageNames?: string;
    productsId?: number | null;
}

export interface Categories {
    products: Category[];
}
