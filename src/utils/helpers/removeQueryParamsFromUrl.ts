export const removeQueryParamsFromUrl = (url: string): string => {
    // Split the URL into base and query parts
    const [base, queryString] = url.split('?');

    if (!queryString) {
        // If there are no query parameters, return the original URL
        return url;
    }

    // Split the query string into individual key-value pairs
    const queryParams = queryString.split('&');

    // Filter out the unwanted query parameters
    const filteredParams = queryParams.filter((param) => {
        const [key] = param.split('=');
        return key !== 'PageNumber' && key !== 'PageSize';
    });

    // Reconstruct the URL with the filtered query parameters
    const newUrl = filteredParams.length > 0 ? `${base}?${filteredParams.join('&')}` : base;

    return newUrl;
};
