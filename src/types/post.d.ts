export interface Post {
    id: string;
    title:string;
    content?: string;
    images?: string[];  
    imageSrc?: string[]  
    imageName?: string;
    dateCreated?: string;
    categories?: Categories[];
}
