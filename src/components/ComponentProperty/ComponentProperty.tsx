import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { deleteAction } from '../../redux/actions/actions';
import EditComponent from '../CategoryContent/AllCategories/AllCategoriesComponent/AllCategoriesComponent';
import DataType from '../../types/dataType';
import styles from '../../styles/allCategories.module.scss';
import { SUBCATEGORIES_URL } from '../../constants/apiConst';

interface EditPropertyProps<T extends DataType> {
  data?: T[];
  URL: string;
  EDIT_URL?: string;
}

const ComponentProperty: FunctionComponent<EditPropertyProps<DataType>> = ({ data, URL, EDIT_URL }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onRemove = useCallback((id: string) => {
    const bool = data?.some((obj) => obj.id === id);
    dispatch(deleteAction(bool ? URL : SUBCATEGORIES_URL, id, bool))
  }, [data, dispatch, URL]);

  const handleEdit = useCallback((id: string) => {
    navigate(`${EDIT_URL}${id}`);
  }, [EDIT_URL, navigate]);

  return (
    <div className={styles.allPropertyContainer}>
      {data ? data.map((obj) => (
        <EditComponent
          key={obj.id} 
          data={obj as unknown as DataType}
          onEdit={handleEdit}
          onRemove={onRemove}
        />
      )) : <div>No data available</div>}
    </div>
  );
};

export default ComponentProperty;
