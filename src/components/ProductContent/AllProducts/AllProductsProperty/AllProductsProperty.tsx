import { FunctionComponent, useCallback } from 'react';
import { deleteAction } from '../../../../redux/actions/actions';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { EDIT_PRODUCT_URL } from '../../../../constants/apiConst';
import styles from '../../../../styles/allPost.module.scss'
import { Product } from '../../../../types/product';
import ProductContext from '../ProductsContext/ProductContext';

interface AllProductsPropertyProps {
    product: Product[];
    URL: string;
}

const AllProductsProperty: FunctionComponent<AllProductsPropertyProps> = ({ URL, product }) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleEdit = useCallback((id: string) => {
        navigate(`${EDIT_PRODUCT_URL}${id}`);
    }, [navigate]);

    const onRemove = useCallback((id: string) => {
        dispatch(deleteAction(URL, id))
    }, [URL, dispatch]);


    return (
        <div className={styles.editPropertyContainer}>
            {product.length > 0 ? (
                Object.values(product).map((product, index) => (
                    <ProductContext
                        key={index}
                        product={product}
                        onEdit={handleEdit}
                        onRemove={onRemove}
                    />
                ))) : <div>No data available</div>}
        </div>
    );
};

export default AllProductsProperty;
