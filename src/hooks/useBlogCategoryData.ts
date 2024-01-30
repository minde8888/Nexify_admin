import { useParams } from "react-router-dom";
import { useAppSelector } from "./useRedux";
import { findCategoryById } from "../utils/helpers/categoryById";


const useBlogCategoryData = () => {
    const { id } = useParams();
    const { data, lastRequestStatus } = useAppSelector((state) => state.data.blogCategories);
    
    const entityId = id?.toString();
    const category = findCategoryById(entityId!, data);
    const categoryName = category?.categoryName;

    return {
        entity: category,
        isCategory: !!category,
        categoryName,
        data,
        lastRequestStatus
    };
};
export default useBlogCategoryData;