import { Formik, Form } from 'formik';
import CategoriesProperty from '../../components/CategoryContents/AddCategories/CategoriesProperty';
import useDynamicForm from '../../hooks/useDynamicForm';
import styles from '../../styles/productContent.module.scss';

const AddCategories = () => {
    const { handleSubmit, initialValues } = useDynamicForm();
    return (
        <Formik onSubmit={(values) => handleSubmit(values)} initialValues={initialValues}>
            <Form >
                <h2>Categories</h2>
                <CategoriesProperty />
                <div className={styles.saveButton}>
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddCategories;