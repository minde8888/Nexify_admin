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


interface SubCategory {
    subCategoryId: string;
    subCategoryName: string;
    description: string;
    imageSrc: string;
}

export interface CategoryResponse {
    categoryId: string;
    categoryName: string;
    description: string;
    imageSrc: string;
    subcategories: SubCategory[];
}