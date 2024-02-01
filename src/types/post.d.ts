export interface Post {
    id: string;
    title: string;
    content?: string;
    images?: mageFile[];
    imageSrc?: string[];
    imageName?: string;
    dateCreated?: string;
    categories?: Categories[];
}

interface Categories {
    id: any;
    categoryName: string;
}
