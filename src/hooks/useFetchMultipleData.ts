import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiError } from '../errorHandler/apiError';
import { getAllAction } from '../redux/actions/actions';

const useFetchMultipleData = (urls: string[]) => {
    const dispatch = useDispatch();
    const [loadingStates, setLoadingStates] = useState(urls.reduce((acc, url) => ({ ...acc, [url]: false }), {}));

    const fetchDataForUrl = useCallback(
        async (url: string) => {
            setLoadingStates((prevStates) => ({ ...prevStates, [url]: true }));
            try {
                await dispatch(getAllAction(url));
            } catch (error) {
                console.error(new ApiError(`Error fetching data from ${url}: ${error}`));
            } finally {
                setLoadingStates((prevStates) => ({ ...prevStates, [url]: false }));
            }
        },
        [dispatch]
    );

    const fetchData = useCallback(() => {
        urls.forEach((url) => fetchDataForUrl(url));
    }, [urls, fetchDataForUrl]);

    const loading = Object.values(loadingStates).some((state) => state);

    return { loading, fetchData };
};

export default useFetchMultipleData;
