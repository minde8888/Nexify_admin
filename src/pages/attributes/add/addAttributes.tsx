import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import useForm from '../../../hooks/useForm';
import AttributesFormProperty from '../../../types/attributesFormProperty';
import CategoriesProperty from '../../../components/CategoryContent/AddCategories/CategoriesProperty/CategoriesProperty';
import { ATTRIBUTES_URL, POST_METHOD } from '../../../constants/apiConst';
import validationSchema from '../../../utils/validation/addAttributesValidationsSchema';
import styles from '../../../styles/productContent.module.scss';

const AddAttributes = () => {
    const [prefix, setPrefix] = useState(false);
    const { handleSubmit, disabled } = useForm<AttributesFormProperty>(POST_METHOD, ATTRIBUTES_URL);

    return (
        <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
            initialValues={{
                id: uuidv4(),
                attributeName: '',
                properties: []
            }} 
            validationSchema={validationSchema}
        >
            <Form >
                <h2>Add Attributes</h2>
                <CategoriesProperty level={1} setPrefix={setPrefix} />
                <div className={styles.saveButton}>
                    <button disabled={disabled || prefix} type="submit">
                        Save
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddAttributes;
