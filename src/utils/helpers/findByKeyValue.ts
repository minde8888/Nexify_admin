export const findByKeyValue = <T extends object, K extends keyof T>(
    key: K, 
    value: T[K], 
    items: T[]
): T | undefined => items.find(item => key in item && item[key] === value);