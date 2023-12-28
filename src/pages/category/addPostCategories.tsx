import { Formik, Form } from 'formik';
import CategoriesProperty from '../../components/CategoryContent/AddCategories/CategoriesProperty';
import useForm from '../../hooks/useForm';
import CategoryFormProperty from '../../types/categoryFormProperty';
import { v4 as uuidv4 } from 'uuid';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import { POSTS_URL, POST_METHOD } from '../../constants/apiConst';
import styles from '../../styles/productContent.module.scss';

const AddPostCategories = () => {
    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(POST_METHOD, POSTS_URL, true);
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
                    <button disabled={disabled} type="submit">
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddPostCategories;
