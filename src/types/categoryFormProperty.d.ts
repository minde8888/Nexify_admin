interface CategoryFormProperty {
    id: string;
    categoryName?: string;
    description?: string;
    imageName?: string;
    images?: ImageFile[];
    properties?: DynamicFormProperty[];
    ''?: string;
    imageSrc?: string;
    accept?: boolean;
    categoryId?: string;
}

export default CategoryFormProperty;
