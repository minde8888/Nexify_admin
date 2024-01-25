export class MdxEditorError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MdxEditorError';
    }
}