export interface Attributes {
    id?: number | string;
    attributeName: string;
    imageName?: string;
    "": string;
}

export interface AttributesResponse {
    id: string,
    attributeName: string,
    imageName?: string;
}