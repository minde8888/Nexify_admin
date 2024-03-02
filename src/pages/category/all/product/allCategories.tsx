import { useEffect } from 'react';
import { useAppSelector } from '../../../../hooks/useRedux';
import { CATEGORIES_URL, EDIT_CATEGORY_URL } from '../../../../constants/apiConst';
import Preloader from '../../../preloader/preloader';
import useFetchData from '../../../../hooks/useDataFetching';
import sortByProperty from '../../../../utils/helpers/sortByProperty/sortByProperty';
import { DataResponse } from '../../../../types/category';
import ComponentProperty from '../../../../components/ComponentProperty/ComponentProperty';
import DataType from '../../../../types/dataType';

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
            <h2>All Products Categories</h2>
            <ComponentProperty
                data={updatedSortedCategories as unknown as DataType[]}
                URL={CATEGORIES_URL}
                EDIT_URL={EDIT_CATEGORY_URL}
            />
        </Preloader>
    );
};

export default AllCategories;
