export const findIndexById = <T>(
    array: T[],
    id: string,
    idPropertyName: keyof T | string
  ): number => {
    return array.findIndex((item) => {
      const propName = idPropertyName as keyof T;
      return item[propName] === id;
    });
  };