import { isValidDate } from "../validation/isValidDate";

function sortByProperty<T>(array: T[] | undefined, prop: keyof T, descending: boolean = true): T[] | undefined {
    if (!array || !array.length) {
        return undefined;
    }

    const copyArray = [...array]; 

    return copyArray.sort((a, b) => {
        const valueA = a[prop] as unknown as string;
        const valueB = b[prop] as unknown as string;

        if (isValidDate(valueA) && isValidDate(valueB)) {
            const dateA = new Date(valueA);
            const dateB = new Date(valueB);
            return descending ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
        } else {
            return descending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
        }
    });
}

export default sortByProperty;
