import { useParams } from 'react-router-dom';
import { useAppSelector } from './useRedux';
import useFetchData from './useDataFetching';
import { CATEGORIES_URL } from '../constants/apiConst';
import { Product } from '../types/product';
import { SubcategoryResponse } from '../types/category';

const useProductCategoryData = () => {
    const { id } = useParams<{ id?: string }>();
    const { data: productData, lastRequestStatus: productStatus } = useAppSelector((state) => state.data.products);
    const { data, lastRequestStatus } = useAppSelector((state) => state.data.categories);
    const { fetchData } = useFetchData(CATEGORIES_URL);

    const productArray: Product[] = productData.products ?? [];

    const product: Product | null = productArray.find((p) => p.id === id) || null;

    const { title, content, price, discount, location, size, stock, imageSrc, itemSrc, categories } = product || {};

    const checkedCategoryIds = categories?.flatMap((category: { id: string; subcategories: SubcategoryResponse[]; }) => {
        const categoryIds = [category.id];    
        const subcategoryIds = category.subcategories.map(subcategory => subcategory.id);    
        return [...categoryIds, ...subcategoryIds];
    }) || [];

    return {
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
        categories: data,
        checkedCategoriesIds : checkedCategoryIds,
        productStatus,
        fetchData,
        id
    };
};

export default useProductCategoryData;
