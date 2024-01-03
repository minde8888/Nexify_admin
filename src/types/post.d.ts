export interface Post {
    postId?: string;
    title:string;
    content: string;
    images: string[];  
    imageSrc?: string[]  
    imageName?: string;
    dateCreated?: string;
    categories?: string[];
}
