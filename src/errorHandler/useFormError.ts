export class UseFormError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UseFormError';
    }
}