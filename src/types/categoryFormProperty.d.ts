interface CategoryFormProperty {
    id: string;
    title?: string;
    description?: string;
    imageName?: string;
    image?: ImageFile[];
    properties?: DynamicFormProperty[];
    ''?: string;
    imageSrc?: string;
    accept?: boolean;
    categoryId?: string;
}

export default CategoryFormProperty;
