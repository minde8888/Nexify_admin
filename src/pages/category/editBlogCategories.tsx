import { Formik, Form } from 'formik';
import EditProperty from '../../components/CategoryContent/EditCategories/EditProperty';
import { useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import useForm from '../../hooks/useForm';
import { BLOG_CATEGORIES_URL, PUT_METHOD } from '../../constants/apiConst';
import useFetchData from '../../hooks/useDataFetching';
import { useEffect } from 'react';
import Preloader from '../preloader/preloader';

const EditBlogCategories = () => {
    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    const categories = useAppSelector((state) => state.data.blogCategories);

    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(PUT_METHOD, BLOG_CATEGORIES_URL);

    const initialCategoryFormProperty: CategoryFormProperty = {
        id: '',
        categoryName: '',
        description: '',
        imageName: '',
        image: [],
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Preloader isLoading={loading}>
            <Formik  onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
            >
                <Form>
                    <h2>Edit/Remove Blog Categories</h2>
                    <EditProperty
                        categories={categories}
                        disabled={disabled}
                        URL={BLOG_CATEGORIES_URL}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditBlogCategories;
