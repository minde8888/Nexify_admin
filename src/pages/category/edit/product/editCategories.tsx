import { useNavigate } from "react-router-dom";
import EditCategoryProperty from "../../../../components/CategoryContent/EditCategories/EditCategoryProperty";
import { Formik, Form } from 'formik';
import CategoryFormProperty from "../../../../types/categoryFormProperty";
import { ALL_CATEGORIES_URL, CATEGORY_UPDATE_URL, PUT_METHOD, SUBCATEGORY_UPDATE_URL } from "../../../../constants/apiConst";
import useForm from "../../../../hooks/useForm";
import validationSchema from "../../../../utils/validation/editCategoryValidationSchema";
import { useEffect } from "react";
import Preloader from "../../../preloader/preloader";
import useCategoryData from "../../../../hooks/useCategoryData";

const EditCategories = () => {
    const { entity, isCategory, categoryName, data, lastRequestStatus } = useCategoryData();
    const { handleSubmit } = useForm<CategoryFormProperty>(PUT_METHOD, isCategory ? CATEGORY_UPDATE_URL : SUBCATEGORY_UPDATE_URL);

    const navigate = useNavigate();

    useEffect(() => {
        if (lastRequestStatus) {
            navigate(ALL_CATEGORIES_URL);
        }
    }, [lastRequestStatus, navigate, data]);

    if (!entity) return null;

    const initialCategoryFormProperty: CategoryFormProperty = {
        id: '',
        categoryName: '',
        description: '',
        imageName: '',
        images: [],
    };

    return (
        <Preloader isLoading={(lastRequestStatus === false)}>
            <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Edit Products Categories</h2>
                    <EditCategoryProperty
                        category={entity}
                        isCategory={isCategory}
                        categoryName={categoryName ?? ''}
                        disabled={lastRequestStatus === false}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};


export default EditCategories;
