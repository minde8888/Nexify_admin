import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import EditProperty from '../../../components/CategoryContent/AllCategories/EditProperty';
import { useAppSelector } from '../../../hooks/useRedux';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import validationSchema from '../../../utils/validation/editCategoryValidationSchema';
import useForm from '../../../hooks/useForm';
import { CATEGORY_UPDATE_URL, CATEGORIES_URL, PUT_METHOD } from '../../../constants/apiConst';
import Preloader from '../../preloader/preloader';
import useFetchData from '../../../hooks/useDataFetching';


const AllCategories = () => {
    const { loading, fetchData } = useFetchData(CATEGORIES_URL);

    const categories = useAppSelector((state) => state.data.categories);

    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(PUT_METHOD, CATEGORY_UPDATE_URL);

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
            <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
            >
                <Form>
                    <h2>Edit/Remove Products Categories</h2>
                    <EditProperty
                        categories={categories}
                        disabled={disabled}
                        URL={CATEGORIES_URL}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default AllCategories;
