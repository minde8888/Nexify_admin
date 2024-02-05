import { useEffect, useState, forwardRef, Ref, useRef } from 'react';
import useFetchData from '../../../../hooks/useDataFetching';
import { CATEGORIES_URL, POST_METHOD, SUBCATEGORIES_URL } from '../../../../constants/apiConst';
import { useAppSelector } from '../../../../hooks/useRedux';
import Preloader from '../../../preloader/preloader';
import PropertiesSubcategories from '../../../../components/SubcategoryContent/AllSubcategory/PropertiesSubcategories/PropertiesSubcategories';
import CategoryFormProperty from '../../../../types/categoryFormProperty';
import useForm from '../../../../hooks/useForm';
import { Form, Formik, FormikProps } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import validationSchema from '../../../../utils/validation/addCategoryValidationSchema';
import { useModal } from '../../../../hooks/useModel';
import { CategoryResponse, DataResponse } from '../../../../types/category';
import sortByProperty from '../../../../utils/helpers/sortByProperty';

const AllSubcategories = forwardRef((props, ref) => {

    const { loading, fetchData } = useFetchData(CATEGORIES_URL);

    const [prefix, setPrefix] = useState(false);

    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(POST_METHOD, SUBCATEGORIES_URL);

    const formikRef = useRef<FormikProps<CategoryFormProperty>>(null);

    const { data, lastRequestStatus }: DataResponse = useAppSelector((state) => state.data.categories);

    const { isOpen, toggle } = useModal();

    const sortedCategories = data ? sortByProperty(data, 'dateCreated', false) : undefined;

    const updatedSortedCategories = sortedCategories?.map((category) => {
        const sortedSubcategories = category.subcategories ? sortByProperty(category.subcategories, 'dateCreated', false) : undefined;

        return {
            ...category,
            subcategories: sortedSubcategories,
        };
    });

    useEffect(() => {
        if (!updatedSortedCategories || updatedSortedCategories.length === 0) {
            fetchData();
        }
    }, [updatedSortedCategories, fetchData, disabled]);

    useEffect(() => {
        if (lastRequestStatus === true) {
            fetchData();
        }
    }, [lastRequestStatus, fetchData]);

    return (
        <Preloader isLoading={loading}>
            <Formik
                innerRef={formikRef as Ref<FormikProps<CategoryFormProperty>>}
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={{
                    id: uuidv4(),
                    properties: [],
                    '': ''
                }}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Add Products Subcategories</h2>
                    <PropertiesSubcategories
                        categories={updatedSortedCategories as CategoryResponse[]}
                        setPrefix={setPrefix}
                        disabled={disabled || prefix}
                        formikRef={formikRef}
                        toggle={toggle}
                        isOpen={isOpen}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
});

export default AllSubcategories;
