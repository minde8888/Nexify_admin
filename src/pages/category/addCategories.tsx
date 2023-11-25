import { Formik, Form } from 'formik';
import CategoriesProperty from '../../components/CategoryContents/CategoriesProperty';
import useDynamicForm from '../../hooks/useDynamicForm';

const AddCategories = () => {
    const { handleSubmit, initialValues } = useDynamicForm();
    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form >
                <CategoriesProperty />
                <button type="submit">
                    Submit
                </button>
            </Form>
        </Formik>
    );
};

export default AddCategories;