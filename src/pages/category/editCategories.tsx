import { Formik, Form } from 'formik';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContent/EditCategories/EditProperty';
import { useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import useForm from '../../hooks/useForm';
import { CATEGORY_UPDATE_URL, PUT_METHOD } from '../../constants/apiConst';

const EditCategories = () => {
    

    const categories = useAppSelector((state) => state.data.categories);

    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(PUT_METHOD, CATEGORY_UPDATE_URL);

    const initialCategoryFormProperty: CategoryFormProperty = {
        id: '',
        categoryName: '',
        description: '',
        image: [],
    };

   return (
        <Formik onSubmit={(values) => handleSubmit(values)}
            initialValues={initialCategoryFormProperty}
            validationSchema={validationSchema}
            isSubmitting={false}
        >
            <Form>
                <h2>Edit/Remove Categories</h2>
                {categories ? (
                    <EditProperty
                        categories={categories}
                        disabled={disabled}
                    />
                ) : (
                    <Preloader />
                )}
            </Form>
        </Formik>
    );
};

export default EditCategories;
