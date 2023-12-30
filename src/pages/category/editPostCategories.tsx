import { Formik, Form } from 'formik';
import EditProperty from '../../components/CategoryContent/EditCategories/EditProperty';
import { useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import useForm from '../../hooks/useForm';
import { POST_UPDATE_URL, POSTS_URL, PUT_METHOD } from '../../constants/apiConst';
import useFetchData from '../../hooks/useDataFetching';
import { useEffect } from 'react';
import Preloader from '../preloader/preloader';

const EditPostCategories = () => {
    const { loading, fetchData } = useFetchData(POSTS_URL);

    const categories = useAppSelector((state) => state.data.blogCategories);

    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(PUT_METHOD, POST_UPDATE_URL);

    const initialCategoryFormProperty: CategoryFormProperty = {
        id: '',
        categoryName: '',
        description: '',
        image: [],
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Preloader isLoading={loading}>
            <Formik onSubmit={(values) => handleSubmit(values)}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
            >
                <Form>
                    <h2>Edit/Remove Categories</h2>
                    <EditProperty
                        categories={categories}
                        disabled={disabled}
                        URL={POSTS_URL}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditPostCategories;
