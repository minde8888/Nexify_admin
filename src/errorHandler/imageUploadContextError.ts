export class ImageUploadContextError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ImageUploadContextError';
    }
}