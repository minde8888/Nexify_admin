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

export interface SubcategoryResponse {
    Id: string;
    subCategoryName: string;
    description: string;
    imageSrc: string;
}

export interface CategoryResponse {
    id: string;
    categoryName: string;
    description: string;
    imageSrc: string;
    subcategories: SubcategoryResponse[];
}

export interface Categories {
    id: string;
    categoryName: string;
    description?: string;
    image?: string;
    imageName: string;
}
