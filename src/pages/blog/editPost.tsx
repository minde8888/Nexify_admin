import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import useForm from '../../hooks/useForm';
import { PUT_METHOD, BLOG_UPDATE_URL, BLOG_URL } from '../../constants/apiConst';
import Preloader from '../preloader/preloader';
import useFetchData from '../../hooks/useDataFetching';
import { Post } from '../../types/post';
import Pagination from '../../components/Pagination/Pagination';
import EditPostProperty from '../../components/PostContent/EditPosts/EditPostProperty';
import PageSize from '../../components/PageSize/PageSize';
import { pageSizeOptions } from '../../constants/pageSize';

const EditPost = () => {
    const dispatch = useAppDispatch();

    const { fetchData, loading } = useFetchData(BLOG_URL);

    const [selectValue, setSelectValue] = useState<number>(pageSizeOptions[0]);

    const posts: PagedResponse<Post> = useAppSelector((state) => state.data.posts);

    const { handleSubmit, disabled } = useForm<Post>(PUT_METHOD, BLOG_UPDATE_URL);

    const { pageNumber, pageSize, totalPages, totalRecords, post } = posts;

    const initialCategoryFormProperty: Post = {
        postId: '',
        title: '',
        content: '',
        images: [],
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Preloader isLoading={loading}>
            <Formik
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
            >
                <Form>
                    <h2>Edit/Remove Categories</h2>
                    <PageSize
                        setSelectValue={setSelectValue}
                        selectValue={selectValue}
                        dispatch={dispatch}
                        url={BLOG_URL}
                        pageNumber={pageNumber}
                    />
                    {post && <EditPostProperty posts={post} disabled={false} URL={BLOG_URL} />}

                    {/* <EditProperty
                    categories={categories}
                    disabled={disabled}
                    URL={CATEGORIES_URL}
                /> */}
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

export default EditPost;
