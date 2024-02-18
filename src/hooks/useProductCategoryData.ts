import { useParams } from 'react-router-dom';
import { useAppSelector } from './useRedux';
import { findCategoryById, findSubcategoryById } from '../utils/helpers/categoryById/categoryById';
import useFetchData from './useDataFetching';
import { CATEGORIES_URL } from '../constants/apiConst';
import { Product } from '../types/product';
import { Category } from '../types/category';

const useProductCategoryData = () => {
    const { id } = useParams<{ id?: string }>();
    const { data: productData, lastRequestStatus: productStatus } = useAppSelector((state) => state.data.products);
    const { data, lastRequestStatus } = useAppSelector((state) => state.data.categories);
    const { fetchData } = useFetchData(CATEGORIES_URL);

    // const entityId = id?.toString();
    // const category = findCategoryById(entityId!, data);
    // const subcategory = findSubcategoryById(entityId!, data);
    // const categoryName = category?.categoryName || subcategory?.categoryName;

    const productArray: Product[] = productData.products ?? [];
    
    const product: Product | null = productArray.find((p) => p.id === id) || null;

    const { title, content, price, discount, location, size, stock, imageSrc, itemSrc } = product || {};
    const checkedCategoriesIds: string[] = data.categories?.map((category: Category) => category.id) || [];

    return {
        // entity: category || subcategory,
        // isCategory: !!category,
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
        categories:data,
        checkedCategoriesIds,
        productStatus,
        fetchData, 
        id
    };
};

export default useProductCategoryData;
