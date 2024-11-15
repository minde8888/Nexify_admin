import { useParams } from "react-router-dom";
import { useAppSelector } from "./useRedux";
import { findCategoryById, findSubcategoryById } from "../utils/helpers/categoryById/categoryById";

const useCategoryData = () => {
    const { id } = useParams();
    const { data, lastRequestStatus } = useAppSelector(state => state.data.categories);
    
    const entityId = id?.toString();
    const category = findCategoryById(entityId!, data);
    const subcategory = findSubcategoryById(entityId!, data);
    const categoryName = category?.title || subcategory?.title;

    return {
        entity: category || subcategory,
        isCategory: !!category,
        categoryName,
        data,
        lastRequestStatus
    };
};

export default useCategoryData;