import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useAppSelector } from '../../hooks/useRedux';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import useForm from '../../hooks/useForm';
import { PUT_METHOD, BLOG_URL, BLOG_UPDATE_URL } from '../../constants/apiConst';
import Preloader from '../preloader/preloader';
import useFetchData from '../../hooks/useDataFetching';
import { Post } from '../../types/post';
import Pagination from '../../components/Pagination/Pagination';


const EditPost = () => {
    const { loading, fetchData } = useFetchData(BLOG_URL);

    const posts: PagedResponse<Post> = useAppSelector((state) => state.data.posts);

    const { handleSubmit, disabled } = useForm<Post>(PUT_METHOD, BLOG_UPDATE_URL);

    const { nextPage, previousPage, pageNumber, pageSize, totalPages, totalRecords } = posts;

    const size = 5; 

    const initialCategoryFormProperty: Post = {
        postId: '',
        title: '',
        content: '',
        images: [],
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    console.log('====================================');
    console.log('posts', posts);
    console.log('====================================');

    return (
        <Preloader isLoading={loading}>
            <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
            >
                <Form>
                    <h2>Edit/Remove Categories</h2>
                    {/* <EditProperty
                        categories={categories}
                        disabled={disabled}
                        URL={CATEGORIES_URL}
                    /> */}
                    <Pagination
                        firstPage={0}
                        lastPage={0}
                        nextPage={nextPage ?? 0}
                        previousPage={previousPage ?? 0}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        totalRecords={totalRecords}
                        size={size}
                        url={BLOG_URL} />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditPost;
