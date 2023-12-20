import { useCallback, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { handleGetAllRequest } from '../../api/apiHandle';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContents/EditCategories/EditProperty';
import { CategoryResponse } from '../../types/category';
import { getCategories } from '../../redux/slice/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import useForm from '../../hooks/useForm';
import { CATEGORY_UPDATE_URL, PUT_METHOD } from '../../constants/apiConst';

const EditCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.data.categories);

    const { handleSubmit } = useForm<CategoryFormProperty>(PUT_METHOD, CATEGORY_UPDATE_URL);

    const fetchData = useCallback(async () => {
        const fetchedCategories: CategoryResponse[] | undefined = await handleGetAllRequest('category');
        if (!fetchedCategories) return;
        dispatch(getCategories(fetchedCategories));
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
        >
            <Form>
                <h2>Edit/Remove Categories</h2>
                {categories ? (
                    <EditProperty
                        categories={categories}
                    />
                ) : (
                    <Preloader />
                )}
            </Form>
        </Formik>
    );
};

export default EditCategories;
