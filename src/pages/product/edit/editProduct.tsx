import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import validationSchema from '../../../utils/validation/addCategoryValidationSchema';
import useForm from '../../../hooks/useForm';
import { PUT_METHOD, PRODUCT_UPDATE_URL, ALL_PRODUCT_POSTS_URL } from '../../../constants/apiConst';
import Preloader from '../../preloader/preloader';
import { useNavigate } from 'react-router-dom';
import sortByProperty from '../../../utils/helpers/sortByProperty/sortByProperty';
import { CategoryResponse } from '../../../types/category';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import useProductCategoryData from '../../../hooks/useProductCategoryData';
import { Product } from '../../../types/product';
import EditProductProperty from '../../../components/ProductContent/EditProducts/EditProductProperty';


const EditProduct = () => {
    const {
        // entity,
        // isCategory,
        // categoryName,
        lastRequestStatus,
        title,
        content,
        price,
        discount,
        location,
        size,
        stock,
        imageSrc,
        itemSrc,
        categories,
        checkedCategoriesIds,
        productStatus,
        fetchData,
        id
    } = useProductCategoryData();
    
    const sortedCategories = categories ? sortByProperty(categories, 'dateCreated') : undefined;

    const [resetImages, setResetImages] = useState<boolean>(false);

    const { handleSubmit } = useForm<Product>(PUT_METHOD, PRODUCT_UPDATE_URL);

    const navigate = useNavigate();

    const { resetCheckedCategories } = useCheckboxContext();

    useEffect(() => {
        if (!sortedCategories || sortedCategories.length === 0) {
            fetchData();
        }
    }, [sortedCategories, fetchData]);

    useEffect(() => {
        if (productStatus) {
            resetCheckedCategories();
            navigate(ALL_PRODUCT_POSTS_URL);
        }
    }, [navigate, resetCheckedCategories, productStatus]);

    if (!id) return null;

    const initialCategoryFormProperty: Product = {
        title: '',
        content: '',
        price: '',
        discount: '',
        location: '',
        size: '',
        stock: '',
        imageSrc: [],
        itemSrc: [],
        id: ''
    };

    return (
        <Preloader isLoading={productStatus === false || lastRequestStatus === false}>
            <Formik
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Edit Post</h2>
                    <EditProductProperty
                        id={id}
                        title={title ?? ''}
                        content={content ?? ''}
                        imageSrc={imageSrc ?? []}
                        itemSrc={itemSrc ?? []}
                        disabled={productStatus === false || lastRequestStatus === false}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                        categoriesIds={checkedCategoriesIds}
                        categories={sortedCategories as CategoryResponse[]}
                        resetCheckedCategories={resetCheckedCategories}
                        price={price}
                        discount={discount}
                        location={location}
                        size={size}
                        stock={stock}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditProduct;