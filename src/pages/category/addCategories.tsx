import { Formik, Form } from 'formik';
import CategoriesProperty from '../../components/CategoryContent/AddCategories/CategoriesProperty';
import useForm from '../../hooks/useForm';
import CategoryFormProperty from '../../types/categoryFormProperty';
import { v4 as uuidv4 } from 'uuid';
import validationSchema from '../../utils/validation/addCategoryValidationSchema';
import { CATEGORIES_URL, POST_METHOD } from '../../constants/apiConst';
import styles from '../../styles/productContent.module.scss';
import { useState } from 'react';

const AddCategories = () => {
    const [prefix, setPrefix] = useState(false);
    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(POST_METHOD, CATEGORIES_URL);

    return (
        <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
        initialValues={{
            id: uuidv4(),
            categoryName: '',      
            description: '',
            image: [],
            properties: [],
            '': ''
        }} validationSchema={validationSchema}>
            <Form >
                <h2>Categories</h2>
                <CategoriesProperty level={2} setPrefix={setPrefix}/>
                <div className={styles.saveButton}>
                    <button disabled={disabled || prefix} type="submit">
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddCategories;
