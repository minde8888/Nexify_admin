import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useRedux";
import { findCategoryById } from "../../../../utils/helpers/categoryById";
import EditCategoryProperty from "../../../../components/CategoryContent/EditCategories/EditCategoryProperty";
import { Formik, Form } from 'formik';
import CategoryFormProperty from "../../../../types/categoryFormProperty";
import { ALL_BLOG_CATEGORIES_URL, BLOG_CATEGORY_UPDATE_URL, PUT_METHOD } from "../../../../constants/apiConst";
import useForm from "../../../../hooks/useForm";
import validationSchema from "../../../../utils/validation/editCategoryValidationSchema";
import { useEffect } from "react";

const useCategoryData = () => {
    const { id } = useParams();
    const categories = useAppSelector((state) => state.data.blogCategories);
    const entityId = id?.toString();
    const category = findCategoryById(entityId!, categories);
    const categoryName = category?.categoryName;

    return { entity: category, isCategory: !!category, categoryName };
};

const EditBlogCategories = () => {
    const { entity, isCategory, categoryName } = useCategoryData();
    const { handleSubmit, disabled } = useForm<CategoryFormProperty>(PUT_METHOD, BLOG_CATEGORY_UPDATE_URL);
    const navigate = useNavigate();

    useEffect(() => {
        if (disabled) {
            navigate(ALL_BLOG_CATEGORIES_URL);
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


export default EditBlogCategories;
