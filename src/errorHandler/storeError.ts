export class StoreError extends Error {
    constructor(message: string, public innerException?: string) {
        super(message);
        this.name = 'StoreError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, StoreError);
        }
        this.innerException = innerException;
    }
}
