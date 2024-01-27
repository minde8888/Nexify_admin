export const isArrayNotEmpty = <T>(arr: unknown): arr is T[] => Array.isArray(arr) && arr.length > 0;