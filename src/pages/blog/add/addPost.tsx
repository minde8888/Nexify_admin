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
import CategoryFormProperty from '../../../types/categoryFormProperty';

const AddPost = () => {
    const { handleSubmit, disabled } = useForm(POST_METHOD, BLOG_URL);
    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);
    const [content, setContent] = useState<string>("");
    const [selectValue, setSelectValue] = useState<string>("default");
    const [resetImages, setResetImages] = useState<boolean>(false);

    const categories: CategoryFormProperty[] = useAppSelector((state) => state.data.blogCategories);

    useEffect(() => {
        if (!categories || categories.length === 0) {
            fetchData();
        }
    }, [categories, fetchData]);

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
                    />
                    <div className={styles.saveButton}>
                        <button disabled={disabled} type="submit">
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
        </Preloader>
    );
};

export default AddPost;
