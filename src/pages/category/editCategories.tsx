import React, { useCallback, useEffect } from 'react';
import { Formik, Form } from 'formik';
import useDynamicForm from '../../hooks/useDynamicForm';
import { fetchAllCategories } from '../../api/categoryAPI';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContents/EditCategories/EditProperty';
import { CategoryResponse } from '../../types/category';
import styles from '../../styles/productContent.module.scss';
import { getCategories } from '../../redux/slice/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useModal } from '../../hooks/useModel';

const EditCategories = () => {
    const { handleSubmit, initialValues } = useDynamicForm();
    const dispatch = useAppDispatch();
    const { isOpen, toggle } = useModal();

    const fetchData = useCallback(async () => {
        try {
            const fetchedCategories: CategoryResponse[] = await fetchAllCategories();
            dispatch(getCategories(fetchedCategories));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const categories = useAppSelector((state) => state.data.categories);

    const handleEdit = (id: string) => {
        toggle();
        console.log('Selected ID:', id);
    };

    const onRemove = (id: string) => {
        console.log(id);
        // Add logic for removing category or subcategory
    };

    if (!categories) {
        return <Preloader />;
    }

    return (
        <Formik onSubmit={(values) => handleSubmit(values, '/update')} initialValues={initialValues}>
            <Form>
                <h2>Edit/Remove Categories</h2>
                <EditProperty
                    categories={categories}
                    isOpen={isOpen}
                    toggle={toggle}
                    onEdit={handleEdit}
                    onRemove={onRemove} />
                <div className={styles.saveButton}>
                    <button type="submit">Submit</button>
                </div>
            </Form>
        </Formik>
    );
};

export default EditCategories;
