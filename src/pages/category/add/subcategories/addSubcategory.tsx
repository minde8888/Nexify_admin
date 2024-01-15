import { useEffect, useState } from 'react';
import useFetchData from '../../../../hooks/useDataFetching';
import { CATEGORIES_URL, POST_METHOD, SUBCATEGORIES_URL } from '../../../../constants/apiConst';
import { useAppSelector } from '../../../../hooks/useRedux';
import Preloader from '../../../preloader/preloader';
import PropertiesSubcategories from '../../../../components/SubcategoryContent/AllSubcategory/PropertiesSubcategories';
import CategoryFormProperty from '../../../../types/categoryFormProperty';
import useForm from '../../../../hooks/useForm';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import validationSchema from '../../../../utils/validation/addCategoryValidationSchema';
import styles from '../../../../styles/productContent.module.scss';

const AllSubcategories = () => {
    const { loading, fetchData } = useFetchData(CATEGORIES_URL);
    const [prefix, setPrefix] = useState(false);
    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(POST_METHOD, SUBCATEGORIES_URL);

    const categories = useAppSelector((state) => state.data.categories);

    useEffect(() => {
        if (!categories || categories.length === 0) {
            fetchData();
        }
    }, [categories, fetchData]);

    return (
        <Preloader isLoading={loading}>
            <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={{
                    id: uuidv4(),
                    categoryName: '',
                    description: '',
                    image: [],
                    properties: [],
                    '': ''
                }} validationSchema={validationSchema}
            >
                <Form >
                    <h2>Add Products Subcategories</h2>
                    <PropertiesSubcategories
                        categories={categories}
                        setPrefix={setPrefix}
                    />                   
                    <div className={styles.saveButton}>
                        <button disabled={disabled || prefix} type="submit">
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
        </Preloader>
    );
};

export default AllSubcategories;
