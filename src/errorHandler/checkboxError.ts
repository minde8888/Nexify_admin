export class CheckboxError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CheckboxError';
    }
}
