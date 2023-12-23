interface CategoryFormProperty {
    id: string;
    categoryName?: string;
    description?: string;
    image?: ImageFile[];
    properties?: DynamicFormProperty[];
    ''?: string;
    imageSrc?: string;
    accept?: boolean;
    src?: string;
}

export default CategoryFormProperty;
