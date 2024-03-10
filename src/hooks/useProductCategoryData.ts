import { useParams } from 'react-router-dom';
import { useAppSelector } from './useRedux';
import { ATTRIBUTES_URL, CATEGORIES_URL } from '../constants/apiConst';
import { Product } from '../types/product';
import { DataResponse, SubcategoryResponse } from '../types/category';
import useFetchMultipleData from './useFetchMultipleData';

const useProductCategoryData = () => {
    const { id } = useParams<{ id?: string }>();

    const { fetchData } = useFetchMultipleData([CATEGORIES_URL, ATTRIBUTES_URL]);

    const { data: productData, lastRequestStatus: productStatus } = useAppSelector((state) => state.data.products);

    const { data: categoriesData, lastRequestStatus: catStatus }: DataResponse = useAppSelector((state) => state.data.categories);
    const { data: attributesData, lastRequestStatus: attStatus }: DataResponse = useAppSelector((state) => state.data.attributes);

    const productArray: Product[] = productData.products ?? [];

    const product: Product | null = productArray.find((p) => p.id === id) || null;

    const { title, content, price, discount, location, size, stock, imageSrc, itemSrc, categories, attributes } = product || {};

    const checkedCategoryIds =
        categories?.flatMap((category: { id: string; subcategories: SubcategoryResponse[] }) => {
            const categoryIds = [category.id];
            const subcategoryIds = category.subcategories.map((subcategory) => subcategory.id);
            return [...categoryIds, ...subcategoryIds];
        }) || [];

    const checkedAttributesIds = attributes?.map((attribute) => attribute.id);

    return {
        lastRequestStatus: catStatus && attStatus,
        title,
        content,
        price,
        discount,
        location,
        size,
        stock,
        imageSrc,
        itemSrc,
        categories: categoriesData,
        attributes: attributesData,
        checkedCategoriesIds: checkedCategoryIds,
        checkedAttributesIds,
        productStatus,
        fetchData,
        id
    };
};

export default useProductCategoryData;
