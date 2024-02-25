import CategoryProperty from '../../../../components/ComponentProperty/ComponentProperty';
import { useAppSelector } from '../../../../hooks/useRedux';
import { BLOG_CATEGORIES_URL, EDIT_BLOG_CATEGORY_URL } from '../../../../constants/apiConst';
import useFetchData from '../../../../hooks/useDataFetching';
import { useEffect } from 'react';
import Preloader from '../../../preloader/preloader';
import sortByProperty from '../../../../utils/helpers/sortByProperty/sortByProperty';
import ComponentProperty from '../../../../components/ComponentProperty/ComponentProperty';
import DataType from '../../../../types/dataType';

const AllBlogCategories = () => {
    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    const { data, lastRequestStatus } = useAppSelector((state) => state.data.blogCategories);

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
            <ComponentProperty
                data={sortedCategories as unknown as DataType[]}
                URL={BLOG_CATEGORIES_URL}
                EDIT_URL={EDIT_BLOG_CATEGORY_URL}
            />
        </Preloader>
    );
};

export default AllBlogCategories;
