import { FunctionComponent, useCallback } from 'react';
import { CategoryResponse } from '../../../../types/category';
import Category from '../Category/Category';
import { useAppDispatch } from '../../../../redux/store';
import { deleteAction } from '../../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { EDIT_BLOG_CATEGORY_URL, EDIT_CATEGORY_URL } from '../../../../constants/apiConst';
import styles from './allCategories.module.scss';
import { log } from 'console';

interface EditPropertyProps {
  categories?: CategoryResponse[];
  URL: string;
  blog?: boolean;
}

const CategoryProperty: FunctionComponent<EditPropertyProps> = ({ categories, URL, blog = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onRemove = useCallback((id: string) => {
    const bool = categories?.some((category) => category.id === id);
    dispatch(deleteAction(URL, id, bool))
  }, [URL, categories, dispatch]);

  const handleEdit = useCallback((categoryId: string) => {

    const editUrl = blog ? EDIT_BLOG_CATEGORY_URL : EDIT_CATEGORY_URL;
    navigate(`${editUrl}${categoryId}`);
  }, [blog, navigate]);

  return (
    <div className={styles.allPropertyContainer}>
      {categories && Object.values(categories).map((category, index) => (
        <Category
          key={index}
          category={category}
          onEdit={handleEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CategoryProperty;
