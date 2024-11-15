import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import useForm from '../../../hooks/useForm';
import useProductCategoryData from '../../../hooks/useProductCategoryData';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import Preloader from '../../preloader/preloader';
import EditProductProperty from '../../../components/ProductContent/EditProducts/EditProductProperty/EditProductProperty';
import validationSchema from '../../../utils/validation/addCategoryValidationSchema';
import sortByProperty from '../../../utils/helpers/sortByProperty/sortByProperty';
import { CategoryResponse } from '../../../types/category';
import { Product } from '../../../types/product';
import { Attributes } from '../../../types/attributes';
import { PUT_METHOD, PRODUCT_UPDATE_URL, ALL_PRODUCT_POSTS_URL } from '../../../constants/apiConst';


const EditProduct = () => {
    const {
        lastRequestStatus,
        title,
        content,
        price,
        discount,
        location,
        stock,
        imageSrc,
        categories,
        attributes,
        checkedCategoryIds,
        checkedSubcategoryIds,
        checkedAttributesIds,
        productStatus,
        fetchData,
        product,
        id
    } = useProductCategoryData();

    const sortedCategories = categories ? sortByProperty(categories, 'dateCreated') : undefined;

    const [resetImages, setResetImages] = useState<boolean>(false);

    const { handleSubmit } = useForm<Product>(PUT_METHOD, PRODUCT_UPDATE_URL);

    const navigate = useNavigate();

    const { resetChecked } = useCheckboxContext();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (productStatus) {
            resetChecked();
            navigate(ALL_PRODUCT_POSTS_URL);
        }
    }, [navigate, resetChecked, productStatus]);

    if (!id || !title) return null;

    const initialCategoryFormProperty: Product = {
        title: '',
        content: '',
        price: '',
        discount: '',
        location: '',
        stock: '',
        imageSrc: [],
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
                    {product && <EditProductProperty
                        id={id}
                        title={title ?? ''}
                        content={content ?? ''}
                        imageSrc={imageSrc ?? []}
                        disabled={productStatus === false || lastRequestStatus === false}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                        checkedCategoryIds={checkedCategoryIds}
                        categories={sortedCategories as CategoryResponse[]}
                        checkedSubcategoryIds={checkedSubcategoryIds}
                        checkedAttributesIds={checkedAttributesIds}
                        attributes={attributes as unknown as Attributes[]}
                        resetChecked={resetChecked}
                        price={price}
                        discount={discount}
                        location={location}
                        stock={stock}
                    />}
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditProduct;