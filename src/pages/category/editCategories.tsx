import { useCallback, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import useForm from '../../hooks/useForm';
import { fetchAllCategories } from '../../api/categoryAPI';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContents/EditCategories/EditProperty';
import { CategoryResponse } from '../../types/category';
import { getCategories } from '../../redux/slice/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';
import validationSchema from '../../utils/validation/categoryValidationSchema';

const EditCategories = () => {

    const { handleSubmit } = useForm<CategoryFormProperty>('update');

    const initialCategoryFormProperty: CategoryFormProperty = {
        id: '',
        categoryName: '',
        description: '',
        image: [],
        properties: [],
        '': '',
    };

    const dispatch = useAppDispatch();

    const fetchData = useCallback(async () => {
        const fetchedCategories: CategoryResponse[] = await fetchAllCategories();
        dispatch(getCategories(fetchedCategories));
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const categories = useAppSelector((state) => state.data.categories);

    return (
        categories ? (
            <Formik onSubmit={(values) => handleSubmit(values)}
                initialValues={initialCategoryFormProperty} >
                <Form>
                    <h2>Edit/Remove Categories</h2>
                    <EditProperty
                        categories={categories}
                        dispatch={dispatch}                       
                    />
                </Form>
            </Formik>
        ) : (
            <Preloader />
        )
    );
};

export default EditCategories;


