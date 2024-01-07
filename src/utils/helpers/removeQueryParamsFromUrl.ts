export const removeQueryParamsFromUrl = (url: string): string => {
    const [base, queryString] = url.split('?');

    if (!queryString) {
        return url;
    }

    const queryParams = queryString.split('&');

    const filteredParams = queryParams.filter((param) => {
        const [key] = param.split('=');
        return key !== 'PageNumber' && key !== 'PageSize';
    });

    const newUrl = filteredParams.length > 0 ? `${base}?${filteredParams.join('&')}` : base;

    return newUrl;
};
