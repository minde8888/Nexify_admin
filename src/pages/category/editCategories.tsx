import  { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import useDynamicForm from '../../hooks/useDynamicForm';
import { fetchAllCategories } from '../../api/categoryAPI';
import Preloader from '../preloader/preloader';
import EditProperty from '../../components/CategoryContents/EditCategories/EditProperty';
import { CategoryResponse } from '../../types/category';
import styles from '../../styles/productContent.module.scss';

const EditCategories = () => {
    const { handleSubmit, initialValues } = useDynamicForm();
    const [categories, setCategories] = useState<CategoryResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCategories = await fetchAllCategories();
            setCategories(fetchedCategories);
        };

        fetchData();
    }, []);

    if (!categories || !Array.isArray(categories)) {
        return <Preloader />;
    }

    return (
        <Formik onSubmit={(values) => handleSubmit(values, "/update")} initialValues={initialValues}>
            <Form>
                <h2>Edit/Remove Categories</h2>
                <EditProperty categories={categories}/>
                <div className={styles.saveButton}>
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default EditCategories;
