interface CategoryFormProperty {
    id: string;
    categoryName?: string;
    description?: string;
    imageName?: string;
    image?: ImageFile[];
    properties?: DynamicFormProperty[];
    ''?: string;
    imageSrc?: string;
    accept?: boolean;
}

export default CategoryFormProperty;
