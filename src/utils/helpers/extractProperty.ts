interface MyObject {
    [key: string]: any;
}
function extractProperty<T extends MyObject, K extends keyof T>(objects: T[], property: K): Pick<T, K>[] {
    return objects.map((obj) => ({ [property]: obj[property] } as Pick<T, K>));
}

export default extractProperty;
