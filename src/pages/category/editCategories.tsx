import { useCallback, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { fetchAllCategories } from '../../api/categoryAPI';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContents/EditCategories/EditProperty';
import { CategoryResponse } from '../../types/category';
import { getCategories } from '../../redux/slice/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';
import validationSchema from '../../utils/validation/categoryValidationSchema';
import useForm from '../../hooks/useForm';

const EditCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.data.categories);

    const { handleSubmit} = useForm<CategoryFormProperty>('update');

    const fetchData = useCallback(async () => {
        const fetchedCategories: CategoryResponse[] = await fetchAllCategories();
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
        <Formik onSubmit={(values) => handleSubmit(values)}  initialValues={initialCategoryFormProperty}>
            <Form>
                <h2>Edit/Remove Categories</h2>
                {categories ? (
                    <EditProperty
                        categories={categories}
                        dispatch={dispatch}
                        // handleChange={handleChange}
                        // resetForm={resetForm}                       
                    />
                ) : (
                    <Preloader />
                )}
            </Form>
        </Formik>
    );
};

export default EditCategories;
