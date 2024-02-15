import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { BLOG_CATEGORIES_URL, BLOG_URL, POST_METHOD } from '../../../constants/apiConst';
import AddPostContent from '../../../components/PostContent/AddPosts/AddPostContent';
import validationSchema from '../../../utils/validation/addPostValidationSchema';
import useFetchData from '../../../hooks/useDataFetching';
import Preloader from '../../preloader/preloader';
import useForm from '../../../hooks/useForm';
import { useAppSelector } from '../../../hooks/useRedux';
import sortByProperty from '../../../utils/helpers/sortByProperty/sortByProperty';
import { CategoryResponse } from '../../../types/category';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import { ImageFile } from '../../../types/imageFile';

interface AddPostProps{
    title: string;
    content: string;
    images: ImageFile[];
}

const AddPost = () => {
    const { handleSubmit } = useForm(POST_METHOD, BLOG_URL);

    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    const [content, setContent] = useState<string>("");

    const [resetImages, setResetImages] = useState<boolean>(false);

    const { data, lastRequestStatus } = useAppSelector((state) => state.data.blogCategories);

    const sortedCategories = data ? sortByProperty(data, 'dateCreated') : undefined;

    const { checkedCategories, resetCheckedCategories } = useCheckboxContext();

    const [key, setKey] = useState(0);

    useEffect(() => {
        if (!sortedCategories || sortedCategories.length === 0) {
            fetchData();
        }
    }, [sortedCategories, fetchData]);

    const handleFormSubmit = async (values: AddPostProps, { resetForm }: any) => {
        await handleSubmit(values, { resetForm });
        setContent('');
        setKey(prevKey => prevKey + 1);
        setResetImages(true);
        resetCheckedCategories();
    };

    return (
        <Preloader isLoading={loading}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{         
                    title: '',
                    content: '',
                    images: [],
                }}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Add Post</h2>
                    <AddPostContent
                        setContent={setContent}
                        content={content}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                        categories={sortedCategories as CategoryResponse[]}
                        checkedCategories={checkedCategories}
                        componentKey={key}
                        lastRequestStatus={lastRequestStatus}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default AddPost;
