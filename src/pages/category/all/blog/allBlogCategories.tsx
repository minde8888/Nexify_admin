import CategoryProperty from '../../../../components/CategoryContent/AllCategories/CategoryProperty';
import { useAppSelector } from '../../../../hooks/useRedux';
import { BLOG_CATEGORIES_URL } from '../../../../constants/apiConst';
import useFetchData from '../../../../hooks/useDataFetching';
import { useEffect } from 'react';
import Preloader from '../../../preloader/preloader';
import sortByProperty from '../../../../utils/helpers/sortByProperty';
import { CategoryResponse } from '../../../../types/category';

const AllBlogCategories = () => {
    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    const {data, lastRequestStatus } = useAppSelector((state) => state.data.blogCategories);

    const sortedCategories = data ? sortByProperty(data, 'dateCreated') : undefined;

    useEffect(() => {
        if (!sortedCategories || sortedCategories.length === 0) {
            fetchData();
        }
    }, [sortedCategories, fetchData]);

    useEffect(() => {
        if (lastRequestStatus === true) {
            fetchData();
        }
    }, [lastRequestStatus, fetchData]);

    return (
        <Preloader isLoading={loading}>
            <h2>Edit/Remove Blog Categories</h2>
            <CategoryProperty
                categories={sortedCategories as CategoryResponse[]}
                URL={BLOG_CATEGORIES_URL}
                blog={true}
            />
        </Preloader>
    );
};

export default AllBlogCategories;
