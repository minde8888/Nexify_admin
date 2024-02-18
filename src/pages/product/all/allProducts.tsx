import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import validationSchema from '../../../utils/validation/addCategoryValidationSchema';
import useForm from '../../../hooks/useForm';
import { PUT_METHOD, PRODUCT_URL, PRODUCT_UPDATE_URL } from '../../../constants/apiConst';
import Preloader from '../../preloader/preloader';
import useFetchData from '../../../hooks/useDataFetching';
import Pagination from '../../../components/Pagination/Pagination';
import PageSize from '../../../components/PageSize/PageSize';
import { pageSizeOptions } from '../../../constants/pageSize';
import sortByProperty from '../../../utils/helpers/sortByProperty/sortByProperty';
import { Product } from '../../../types/product';
import AllProductsProperty from '../../../components/ProductContent/AllProducts/AllProductsProperty/AllProductsProperty';
import { ImageFile } from '../../../types/imageFile';

interface ProductProps extends Product {
    images: ImageFile[];
}

const AllProducts = () => {
    const dispatch = useAppDispatch();

    const { fetchData, loading } = useFetchData(PRODUCT_URL);

    const [selectValue] = useState(pageSizeOptions[0]);

    const { data, lastRequestStatus } = useAppSelector((state) => state.data.products);

    const { handleSubmit } = useForm<Product>(PUT_METHOD, PRODUCT_UPDATE_URL);

    const { pageNumber, pageSize, totalPages, totalRecords, products } = data as PagedResponse<Product>;

    useEffect(() => {
        if (!data || data.length === 0) {
            fetchData();
        }
    }, [data, fetchData])

    useEffect(() => {
        if (lastRequestStatus === true) {
            fetchData();
        }
    }, [lastRequestStatus, fetchData]);

    const initialCategoryFormProperty: ProductProps = {
        id: '',
        title: '',
        content: '',
        images: [],
    };

    const sortedProducts = products ? sortByProperty(products, 'dateCreated') : undefined;

    return (
        <Preloader isLoading={loading}>
            <Formik
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialCategoryFormProperty}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Edit/Remove Categories</h2>
                    <PageSize
                        dispatch={dispatch}
                        url={PRODUCT_URL}
                    />
                    {sortedProducts && (
                        <AllProductsProperty
                            product={sortedProducts}
                            URL={PRODUCT_URL}
                        />
                    )}
                    <Pagination
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        totalRecords={totalRecords}
                        numButtonsDisplayed={selectValue}
                        url={PRODUCT_URL}
                        dispatch={dispatch}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default AllProducts;
