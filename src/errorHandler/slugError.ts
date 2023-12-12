export class SlugError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SlugError';
    }
}