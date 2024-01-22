import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import validationSchema from '../../../utils/validation/addCategoryValidationSchema';
import useForm from '../../../hooks/useForm';
import { PUT_METHOD, BLOG_UPDATE_URL, BLOG_URL } from '../../../constants/apiConst';
import Preloader from '../../preloader/preloader';
import useFetchData from '../../../hooks/useDataFetching';
import { Post } from '../../../types/post';
import Pagination from '../../../components/Pagination/Pagination';
import AllPostProperty from '../../../components/PostContent/AllPosts/AllPostProperty';
import PageSize from '../../../components/PageSize/PageSize';
import { pageSizeOptions } from '../../../constants/pageSize';
import sortByProperty from '../../../utils/helpers/sortByProperty';

const AllPost = () => {
    const dispatch = useAppDispatch();
    const { fetchData, loading } = useFetchData(BLOG_URL);

    const [selectValue] = useState(pageSizeOptions[0]);
    const { data } = useAppSelector((state) => state.data.posts);
    const { handleSubmit } = useForm<Post>(PUT_METHOD, BLOG_UPDATE_URL);
    const { pageNumber, pageSize, totalPages, totalRecords, post } = data as PagedResponse<Post>;

    useEffect(() => {
        if (!data || data.length === 0) {
            fetchData();
        }
    }, [data, fetchData])

    const initialCategoryFormProperty: Post = {
        id: '',
        title: '',
        content: '',
        images: [],
    };

    const sortedPosts = post ? sortByProperty(post, 'dateCreated') : undefined;

    return (
        <Preloader isLoading={loading }>
            <Formik
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
            >
                <Form>
                    <h2>Edit/Remove Categories</h2>
                    <PageSize
                        dispatch={dispatch}
                        url={BLOG_URL}
                    />
                    {sortedPosts && (
                        <AllPostProperty
                            posts={sortedPosts}
                            URL={BLOG_URL}
                        />
                    )}
                    <Pagination
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        totalRecords={totalRecords}
                        numButtonsDisplayed={selectValue}
                        url={BLOG_URL}
                        dispatch={dispatch}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default AllPost;
