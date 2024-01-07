export class VariableNotExistError extends Error {
    constructor(variableName: string) {
        super(`${variableName} is required.`);
        this.name = 'VariableNotExistError';
    }
}