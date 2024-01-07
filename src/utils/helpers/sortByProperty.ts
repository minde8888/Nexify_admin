
function sortByProperty<T>(array: T[] | undefined, prop: keyof T, descending: boolean = true): T[] | undefined {
    if (!array) {
        return undefined;
    }

    const copyArray = [...array]; 

    return copyArray.sort((a, b) => {
        const valueA = a[prop] as unknown as string;
        const valueB = b[prop] as unknown as string;

        return descending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    });
}

export default sortByProperty;
