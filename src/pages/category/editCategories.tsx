import React, { useCallback, useEffect } from 'react';
import { Formik, Form } from 'formik';
import useForm from '../../hooks/useForm';
import { fetchAllCategories } from '../../api/categoryAPI';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContents/EditCategories/EditProperty';
import { CategoryResponse } from '../../types/category';
import styles from '../../styles/productContent.module.scss';
import { getCategories } from '../../redux/slice/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import CategoryFormProperty from '../../types/categoryFormProperty';

const EditCategories = () => {

    const { handleSubmit, initialValues } = useForm<CategoryFormProperty>('update');

    const dispatch = useAppDispatch();

    const fetchData = useCallback(async () => {
        try {
            const fetchedCategories: CategoryResponse[] = await fetchAllCategories();
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const categories = useAppSelector((state) => state.data.categories);

    return (
        categories ? (
            <Formik onSubmit={(values) => handleSubmit(values)} initialValues={initialValues}>
                <Form>
                    <h2>Edit/Remove Categories</h2>
                    <EditProperty
                        categories={categories}
                        dispatch={dispatch}
                    />
                    <div className={styles.saveButton}>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        ) : (
            <Preloader />
        )
    );
};

export default EditCategories;


