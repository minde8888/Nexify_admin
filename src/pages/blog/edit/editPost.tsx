import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useAppSelector } from '../../../hooks/useRedux';
import validationSchema from '../../../utils/validation/addCategoryValidationSchema';
import useForm from '../../../hooks/useForm';
import { PUT_METHOD, BLOG_UPDATE_URL, ALL_BLOG_POSTS_URL } from '../../../constants/apiConst';
import Preloader from '../../preloader/preloader';
import { Post } from '../../../types/post';
import { useNavigate, useParams } from 'react-router-dom';
import { findByKeyValue } from '../../../utils/helpers/findByKeyValue';
import EditPostProperty from '../../../components/PostContent/EditPosts/EditPostProperty';
import extractProperty from '../../../utils/helpers/extractProperty';

const usePostData = () => {
    const { id } = useParams();
    const { data, lastRequestStatus } = useAppSelector((state) => state.data.posts);
    const entityId = id?.toString();
    const { post } = data as PagedResponse<Post>;
    const entity = findByKeyValue('id', entityId as string, post);
    const { title, content, images, categories } = entity as Post;
    const categoriesIds = categories?.map((category) => category.id);

    return {
        lastRequestStatus,
        title: title,
        content: content,
        images: images,
        id: entityId,
        categoriesIds: categoriesIds,
    };
}

const EditPost = () => {
    const { lastRequestStatus, title, content, images, id, categoriesIds } = usePostData();

    const [resetImages, setResetImages] = useState<boolean>(false);

    const { handleSubmit } = useForm<Post>(PUT_METHOD, BLOG_UPDATE_URL);

    const navigate = useNavigate();

    console.log('categoriesIds', categoriesIds);
    

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
                        title={title}
                        content={content ?? ''}
                        images={images ?? []}
                        disabled={lastRequestStatus === false}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                        categoriesIds={categoriesIds}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditPost;
