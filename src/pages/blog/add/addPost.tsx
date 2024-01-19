import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { BLOG_CATEGORIES_URL, BLOG_URL, POST_METHOD } from '../../../constants/apiConst';
import AddPostContent from '../../../components/PostContent/AddPosts/AddPostContent';
import validationSchema from '../../../utils/validation/addPostValidationSchema';
import useFetchData from '../../../hooks/useDataFetching';
import Preloader from '../../preloader/preloader';
import useForm from '../../../hooks/useForm';
import styles from '../../../styles/postContent.module.scss';
import { useAppSelector } from '../../../hooks/useRedux';
import sortByProperty from '../../../utils/helpers/sortByProperty';
import { CategoryResponse } from '../../../types/category';

const AddPost = () => {
    const { handleSubmit } = useForm(POST_METHOD, BLOG_URL);

    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);
    
    const [content, setContent] = useState<string>("");
    const [selectValue, setSelectValue] = useState<string>("default");
    const [resetImages, setResetImages] = useState<boolean>(false);

    const {data, lastRequestStatus } = useAppSelector((state) => state.data.blogCategories);

    const sortedCategories = data ? sortByProperty(data, 'dateCreated') : undefined;
    
    useEffect(() => {
        if (!sortedCategories || sortedCategories.length === 0) {
            fetchData();
        }
    }, [sortedCategories, fetchData]);

    const handleFormSubmit = async (values: unknown, { resetForm }: any) => {
        await handleSubmit(values, { resetForm });
        setContent('');
        setSelectValue('default');
        setResetImages(true);
    };

    return (
        <Preloader isLoading={loading}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    title: '',
                    context: '',
                    images: [],
                }}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Add Post</h2>
                    <AddPostContent
                        setContent={setContent}
                        content={content}
                        setSelectValue={setSelectValue}
                        selectValue={selectValue}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                        categories={sortedCategories as CategoryResponse[]}
                    />
                    <div className={styles.buttonPublic}>
                        <button disabled={lastRequestStatus} type="submit">
                            Public
                        </button>
                    </div>
                </Form>
            </Formik>
        </Preloader>
    );
};

export default AddPost;
