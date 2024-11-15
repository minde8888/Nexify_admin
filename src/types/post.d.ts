export interface Post {
    id: string;
    title: string;
    content?: string;
    images?: ImageFile[];
    imageSrc?: string[];
    imageName?: string;
    dateCreated?: string;
    categories?: Categories[];
}

interface Categories {
    id: any;
    title: string;
}
