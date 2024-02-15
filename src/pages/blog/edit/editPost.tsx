import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import validationSchema from '../../../utils/validation/addCategoryValidationSchema';
import useForm from '../../../hooks/useForm';
import { PUT_METHOD, BLOG_UPDATE_URL, ALL_BLOG_POSTS_URL } from '../../../constants/apiConst';
import Preloader from '../../preloader/preloader';
import { Post } from '../../../types/post';
import { useNavigate } from 'react-router-dom';
import EditPostProperty from '../../../components/PostContent/EditPosts/EditPostProperty';
import sortByProperty from '../../../utils/helpers/sortByProperty/sortByProperty';
import { CategoryResponse } from '../../../types/category';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import usePostData from '../../../hooks/usePostCategoryData';

const EditPost = () => {
    const {
        postStatus,
        categoriesStatus,
        title,
        content,
        imageSrc,
        id,
        checkedCategoriesIds,
        categoryData,
        fetchData
    } = usePostData();

    const sortedCategories = categoryData ? sortByProperty(categoryData, 'dateCreated') : undefined;

    const [resetImages, setResetImages] = useState<boolean>(false);

    const { handleSubmit } = useForm<Post>(PUT_METHOD, BLOG_UPDATE_URL);

    const navigate = useNavigate();

    const { resetCheckedCategories } = useCheckboxContext();

    useEffect(() => {
        if (!sortedCategories || sortedCategories.length === 0) {
            fetchData();
        }
    }, [sortedCategories, fetchData]);

    useEffect(() => {
        if (postStatus) {
            resetCheckedCategories();
            navigate(ALL_BLOG_POSTS_URL);
        }
    }, [postStatus, navigate, resetCheckedCategories]);

    if (!id) return null;

    const initialCategoryFormProperty: Post = {
        id: '',
        title: '',
        content: '',
        imageName: '',
        images: [],
    };

    return (
        <Preloader isLoading={postStatus === false || categoriesStatus === false}>
            <Formik
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Edit Post</h2>
                    <EditPostProperty
                        id={id}
                        title={title ?? ''}
                        content={content ?? ''}
                        imageSrc={imageSrc ?? []}
                        disabled={postStatus === false || categoriesStatus === false}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                        categoriesIds={checkedCategoriesIds}
                        categories={sortedCategories as CategoryResponse[]}
                        resetCheckedCategories={resetCheckedCategories}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditPost;