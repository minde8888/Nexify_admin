import { FunctionComponent, useCallback } from 'react';
import { CategoryResponse } from '../../../types/category';
import Category from './Category';
import styles from './allCategories.module.scss';
import { useAppDispatch } from '../../../redux/store';
import { deleteAction } from '../../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

interface EditPropertyProps {
  categories: CategoryResponse[];
  URL: string;
}

const CategoryProperty: FunctionComponent<EditPropertyProps> = ({ categories, URL }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const [content, setContent] = useState<string>('');
  // const [file, setFile] = useState<ImageFile[]>([]);

  // const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  // const [catValues, setCatValues] = useState<CategoryFormProperty>({
  //   id: '',
  //   categoryName: '',
  //   description: '',
  //   imageName: '',
  //   accept: true
  // });

  // const { addNewValue, values } = useFormikValues();

  // useEffect(() => {

  //   addNewValue({
  //     id: catValues.id,
  //     description: content,
  //     imageName: file.length === 0 && !isEmptyString(imagePreviewUrl) ? removePartFromUrl(catValues.imageSrc ?? '', UrlToImages) : null,
  //     image: file,
  //     accept: catValues.accept,
  //     imageSrc: imagePreviewUrl
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [catValues.id, content, file, catValues.accept]);

  // const handleEdit = useCallback((id: string) => {
  //   toggle();

  //   const category = findCategoryById(id, categories);
  //   const subcategory = findSubcategoryById(id, categories);

  //   const updatedValues: CategoryFormProperty = {
  //     id: category?.id || subcategory?.id || '',
  //     categoryName: category?.categoryName || subcategory?.subCategoryName || '',
  //     description: category?.description || subcategory?.description || '',
  //     imageSrc: category?.imageSrc || subcategory?.imageSrc || '',
  //     accept: !!category
  //   };

  //   addNewValue({ categoryName: updatedValues.categoryName ?? '' });
  //   setImagePreviewUrl(updatedValues.imageSrc || '');
  //   setCatValues(updatedValues);
  //   setContent(updatedValues.description || '');
  // }, [toggle, categories, addNewValue]);

  const onRemove = useCallback((id: string) => {
    const bool = categories.some((category) => category.id === id);
    dispatch(deleteAction(URL, id, bool))
  }, [URL, categories, dispatch]);

  // const handleAddImage = useCallback((newFile: ImageFile[]) => {
  //   setFile(newFile);
  // }, []);

  // const handleCancel = useCallback(() => {
  //   toggle();
  // }, [toggle]);

  const handleEdit = useCallback((id: string) => {
    navigate(`/edit-category/${id}`);
  }, [navigate]);

  return (
    <div className={styles.editPropertyContainer}>
      {/* <EditPropertyModal
        isOpen={isOpen}
        toggle={toggle}
        onCancel={handleCancel}
        content={content}
        setContent={setContent}
        handleAddImage={handleAddImage}
        setImagePreviewUrl={setImagePreviewUrl}
        imagePreviewUrl={imagePreviewUrl}
        disabled={disabled}
        values={values}
      /> */}
      {Object.values(categories).map((category, index) => (
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
