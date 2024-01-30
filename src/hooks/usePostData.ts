import { useParams } from 'react-router-dom';
import { useAppSelector } from './useRedux';
import useFetchData from './useDataFetching';
import { BLOG_CATEGORIES_URL } from '../constants/apiConst';
import { Post } from '../types/post';

interface Category {
    id: string;
}

const usePostData = () => {
    const { id } = useParams<{ id?: string }>();
    const { data: postData, lastRequestStatus: postStatus } = useAppSelector((state) => state.data.posts);
    const { data: categoryData, lastRequestStatus: categoriesStatus } = useAppSelector((state) => state.data.blogCategories);
    const { fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    const postArray: Post[] = postData?.post ?? [];
    const entity: Post | null = postArray.find((post) => post.id === id) || null;
    const { title, content, imageSrc, categories } = entity || {};
    const checkedCategoriesIds: string[] = categories?.map((category: Category) => category.id) || [];

    return {      
        postStatus: postStatus,
        categoriesStatus: categoriesStatus,
        title,
        content,
        imageSrc,
        id,
        checkedCategoriesIds,
        categoryData: categoryData,
        fetchData

    };
};

export default usePostData;


