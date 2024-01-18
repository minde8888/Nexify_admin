import { useEffect } from 'react';
import CategoryProperty from '../../../../components/CategoryContent/AllCategories/CategoryProperty';
import { useAppSelector } from '../../../../hooks/useRedux';
import { CATEGORIES_URL } from '../../../../constants/apiConst';
import Preloader from '../../../preloader/preloader';
import useFetchData from '../../../../hooks/useDataFetching';

const AllCategories = () => {
    const { loading, fetchData } = useFetchData(CATEGORIES_URL);

    const { data, lastRequestStatus } = useAppSelector((state) => state.data.categories);

    useEffect(() => {
        if (!data || data.length === 0) {
            fetchData();
        }
    }, [data, fetchData]);

    useEffect(() => {        
        if (lastRequestStatus === true) {
            fetchData();
        }
    }, [lastRequestStatus, fetchData]);

    return (
        <Preloader isLoading={loading}>
            <h2>Edit/Remove Products Categories</h2>
            <CategoryProperty
                categories={data}
                URL={CATEGORIES_URL}
            />
        </Preloader>
    );
};

export default AllCategories;
