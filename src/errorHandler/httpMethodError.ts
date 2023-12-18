export class HttpMethodError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HttpMethodError';
    }
}