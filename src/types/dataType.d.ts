interface DataType {
    id: string;
    title: string;
    description?: string;
    imageSrc?: string;
    subcategories?: DataType[];
}

export default DataType;
