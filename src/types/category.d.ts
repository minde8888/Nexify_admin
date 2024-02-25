export interface DataResponse {
    data: CategoryResponse[];
    lastRequestStatus: boolean;
}

export interface Category {
    id?: number | null;
    title: string;
    description: string;
    imageNames?: string;
    productsId?: number | null;
}

export interface Categories {
    products: Category[];
}

export interface SubcategoryResponse {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    dateCreated: string;
}

export interface CategoryResponse {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    dateCreated: string;
    subcategories: SubcategoryResponse[];
}

export interface Categories {
    id: string;
    categoryName: string;
    description?: string;
    image?: string;
    imageName: string;
}
