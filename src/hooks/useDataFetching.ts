import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAction } from '../redux/actions/actions';
import { ApiError } from '../errorHandler/apiError';

const useFetchData = (url: string) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            await dispatch(getAllAction(url));
        } catch (error) {
            throw new ApiError(`Error fetching data: ${error}`);
        } finally {
            setLoading(false);
        }
    }, [dispatch, url]);

    return { loading, fetchData };
};

export default useFetchData;
