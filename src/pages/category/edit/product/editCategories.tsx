import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useRedux";
import { findCategoryById, findSubcategoryById } from "../../../../utils/helpers/categoryById";
import EditCategoryProperty from "../../../../components/CategoryContent/EditCategories/EditCategoryProperty";
import { Formik, Form } from 'formik';
import CategoryFormProperty from "../../../../types/categoryFormProperty";
import { ALL_CATEGORIES_URL, CATEGORY_UPDATE_URL, PUT_METHOD } from "../../../../constants/apiConst";
import useForm from "../../../../hooks/useForm";
import validationSchema from "../../../../utils/validation/editCategoryValidationSchema";
import { useEffect } from "react";
import Preloader from "../../../preloader/preloader";

const useCategoryData = () => {
    const { id } = useParams();
    const { data, lastRequestStatus } = useAppSelector(state => state.data.categories);
    const entityId = id?.toString();
    const category = findCategoryById(entityId!, data);
    const subcategory = findSubcategoryById(entityId!, data);
    const categoryName = category?.categoryName || subcategory?.categoryName;

    return {
        entity: category || subcategory,
        isCategory: !!category,
        categoryName,
        data,
        lastRequestStatus
    };
};

const EditCategories = () => {
    const { entity, isCategory, categoryName, data, lastRequestStatus } = useCategoryData();
    const { handleSubmit } = useForm<CategoryFormProperty>(PUT_METHOD, CATEGORY_UPDATE_URL);

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
        image: [],
    };

    return (
        <Preloader isLoading={(lastRequestStatus === false)}>
            <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
                isSubmitting={false}
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