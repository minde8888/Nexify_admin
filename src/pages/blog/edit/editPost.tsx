import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useAppSelector } from '../../../hooks/useRedux';
import validationSchema from '../../../utils/validation/addCategoryValidationSchema';
import useForm from '../../../hooks/useForm';
import { PUT_METHOD, BLOG_UPDATE_URL, ALL_BLOG_POSTS_URL, BLOG_CATEGORIES_URL } from '../../../constants/apiConst';
import Preloader from '../../preloader/preloader';
import { Post } from '../../../types/post';
import { useNavigate, useParams } from 'react-router-dom';
import EditPostProperty from '../../../components/PostContent/EditPosts/EditPostProperty';
import useFetchData from '../../../hooks/useDataFetching';
import sortByProperty from '../../../utils/helpers/sortByProperty';
import { CategoryResponse } from '../../../types/category';
import { useCheckboxContext } from '../../../components/Context/CheckboxProvider';

interface Category {
    id: string;
}

const usePostData = () => {
    const { id } = useParams<{ id?: string }>();

    const { data: postData, lastRequestStatus: postStatus } = useAppSelector((state) => state.data.posts);

    const { fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    const { data: categoryData, lastRequestStatus: categoryStatus } = useAppSelector((state) => state.data.blogCategories);

    const postArray: Post[] = postData?.post ?? [];
    const entity: Post | null = postArray.find((post) => post.id === id) || null;

    const { title, content, images, categories } = entity || {};
    const checkedCategoriesIds: string[] = categories?.map((category: Category) => category.id) || [];

    return {
        lastRequestStatus: postStatus,
        title,
        content,
        images,
        id,
        checkedCategoriesIds,
        categoryData: categoryData,
        fetchData
    };
};


const EditPost = () => {
    const {
        lastRequestStatus,
        title,
        content,
        images,
        id,
        checkedCategoriesIds,
        categoryData,
        fetchData
    } = usePostData();

    const sortedCategories  = categoryData ? sortByProperty(categoryData, 'dateCreated') : undefined;

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
        if (lastRequestStatus) {
            navigate(ALL_BLOG_POSTS_URL);
        }
    }, [lastRequestStatus, navigate]);   

    if (!id) return null;

    const initialCategoryFormProperty: Post = {
        id: '',
        title: '',
        content: '',
        images: [],
    };

    return (
        <Preloader isLoading={lastRequestStatus === false}>
            <Formik
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
            >
                <Form>
                    <h2>Edit Post</h2>
                    <EditPostProperty
                        id={id}
                        title={title ?? ''}
                        content={content ?? ''}
                        images={images ?? []}
                        disabled={lastRequestStatus === false}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                        categoriesIds={checkedCategoriesIds}
                        categories={sortedCategories as CategoryResponse[]}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditPost;
