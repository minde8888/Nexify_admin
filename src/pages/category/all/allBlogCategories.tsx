import CategoryProperty from '../../../components/CategoryContent/AllCategories/CategoryProperty';
import { useAppSelector } from '../../../hooks/useRedux';
import { BLOG_CATEGORIES_URL } from '../../../constants/apiConst';
import useFetchData from '../../../hooks/useDataFetching';
import { useEffect } from 'react';
import Preloader from '../../preloader/preloader';

const AllBlogCategories = () => {
    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    const categories = useAppSelector((state) => state.data.blogCategories);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Preloader isLoading={loading}>
            <h2>Edit/Remove Blog Categories</h2>
            <CategoryProperty
                categories={categories}
                URL={BLOG_CATEGORIES_URL}
                blog={true}
            />
        </Preloader>
    );
};

export default AllBlogCategories;
