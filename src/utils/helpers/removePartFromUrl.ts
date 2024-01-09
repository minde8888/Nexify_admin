export const removePartFromUrl = (url: string, prefixToRemove: string): string => {
    if (!url || !prefixToRemove) {
        return url; 
    }

    const normalizedPrefix = prefixToRemove.endsWith('/') ? prefixToRemove : `${prefixToRemove}/`;
    const regex = new RegExp(`^${normalizedPrefix}`);
    const updatedUrl = url.replace(regex, '');

    return updatedUrl;
};
