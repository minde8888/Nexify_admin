import { Formik, Form } from 'formik';
import CategoriesProperty from '../../components/CategoryContents/AddCategories/CategoriesProperty';
import styles from '../../styles/productContent.module.scss';
import useForm from '../../hooks/useForm';
import CategoryFormProperty from '../../types/categoryFormProperty';
import { v4 as uuidv4 } from 'uuid';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';

const AddCategories = () => {
    const { handleSubmit } = useForm<CategoryFormProperty>('post', 'category', true);
    return (
        <Formik onSubmit={(values) => handleSubmit(values)} initialValues={{
            id: uuidv4(),
            categoryName: '',
            description: '',
            image: [],
            properties: [],
            '': ''
        }} validationSchema={validationSchema}>
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
