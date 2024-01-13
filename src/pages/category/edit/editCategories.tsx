import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useRedux";
import { findCategoryById, findSubcategoryById } from "../../../utils/helpers/categoryById";
import EditCategoryProperty from "../../../components/CategoryContent/EditCategories/EditCategoryProperty";
import { Formik, Form } from 'formik';
import CategoryFormProperty from "../../../types/categoryFormProperty";
import { CATEGORY_UPDATE_URL, PUT_METHOD } from "../../../constants/apiConst";
import useForm from "../../../hooks/useForm";
import validationSchema from "../../../utils/validation/editCategoryValidationSchema";
import { useEffect } from "react";

const useCategoryData = () => {
    const { id } = useParams();
    const categories = useAppSelector(state => state.data.categories);
    const entityId = id?.toString();
    const category = findCategoryById(entityId!, categories);
    const subcategory = findSubcategoryById(entityId!, categories);
    const categoryName = category?.categoryName || subcategory?.subCategoryName;

    return { entity: category || subcategory, isCategory: !!category, categoryName };
};

const EditCategories = () => {
    const { entity, isCategory, categoryName } = useCategoryData();
    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(PUT_METHOD, CATEGORY_UPDATE_URL);
    const navigate = useNavigate();

    useEffect(() => {
        if (disabled) {
            navigate('/admin/categories');
        }
    }, [disabled, navigate]);

    if (!entity) return null;

    const initialCategoryFormProperty: CategoryFormProperty = {
        id: '',
        categoryName: '',
        description: '',
        imageName: '',
        image: [],
    };


    return (
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
                disabled={disabled} 
                />
            </Form>
        </Formik>
    );
};


export default EditCategories;
