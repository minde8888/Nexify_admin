export const findIndexById = <T>(
    array: T[],
    id: string,
    idPropertyName: keyof T
): number => {
    return array.findIndex((item) => item[idPropertyName] === id);
};
