import { useCallback, useEffect } from 'react';
import { Formik, Form } from 'formik';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContent/EditCategories/EditProperty';
import { CategoryResponse } from '../../types/category';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import useForm from '../../hooks/useForm';
import { CATEGORIES_URL, CATEGORY_UPDATE_URL, PUT_METHOD } from '../../constants/apiConst';
import { getAllAction } from '../../redux/actions/actions';

const EditCategories = () => {
    
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.data.categories);

    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(PUT_METHOD, CATEGORY_UPDATE_URL);

    const fetchData = useCallback(async () => {
        const fetchedCategories: CategoryResponse[] | undefined = dispatch(getAllAction(CATEGORIES_URL));
        if (!fetchedCategories) return;
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                        dispatch={dispatch}
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
