import { useEffect } from 'react';
import CategoryProperty from '../../../../components/CategoryContent/AllCategories/CategoryProperty/CategoryProperty';
import { useAppSelector } from '../../../../hooks/useRedux';
import { CATEGORIES_URL } from '../../../../constants/apiConst';
import Preloader from '../../../preloader/preloader';
import useFetchData from '../../../../hooks/useDataFetching';
import sortByProperty from '../../../../utils/helpers/sortByProperty/sortByProperty';
import { CategoryResponse, DataResponse } from '../../../../types/category';

const AllCategories = () => {
    const { loading, fetchData } = useFetchData(CATEGORIES_URL);

    const { data, lastRequestStatus }: DataResponse = useAppSelector((state) => state.data.categories);

    const sortedCategories = data ? sortByProperty(data, 'dateCreated', false) : undefined;

    const updatedSortedCategories = sortedCategories?.map((category) => {
        const sortedSubcategories = category.subcategories ? sortByProperty(category.subcategories, 'dateCreated', false) : undefined;

        return {
            ...category,
            subcategories: sortedSubcategories,
        };

    });

    useEffect(() => {
        if (!updatedSortedCategories || updatedSortedCategories.length === 0) {
            fetchData();
        }
    }, [updatedSortedCategories, fetchData]);

    useEffect(() => {
        if (lastRequestStatus === true) {
            fetchData();
        }
    }, [lastRequestStatus, fetchData]);

    return (
        <Preloader isLoading={loading}>
            <h2>Edit/Remove Products Categories</h2>
            <CategoryProperty
                categories={updatedSortedCategories as CategoryResponse[]}
                URL={CATEGORIES_URL}
            />
        </Preloader>
    );
};

export default AllCategories;
