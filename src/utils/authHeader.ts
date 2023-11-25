
 const authHeader = (): {} | { Authorization: string } | { Authorization?: undefined } => {
    const storageData = JSON.parse(localStorage.getItem('items') || 'null');
    const token = storageData?.data?.auth?.token;

    if (token && token.length !== 0) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}

export default authHeader;