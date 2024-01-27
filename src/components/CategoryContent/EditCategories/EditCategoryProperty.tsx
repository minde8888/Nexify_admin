import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImage from '../../UploadImage/UploadImage';
import PropertyImagePreview from '../../PropertyImagePreview/PropertyImagePreview';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import { CategoryResponse, SubcategoryResponse } from '../../../types/category';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import { removePartFromUrl } from '../../../utils/helpers/removePartFromUrl';
import { UrlToImages } from '../../../constants/imageConst';
import styles from './edit.module.scss';
import { isValidBase64Image } from '../../../utils/validation/isValidBase64Image';
import { log } from '../../../utils/helpers/logger';

interface CustomFormValues {
  categoryName: string;
  description: string;
  imageSrc: string;
}

interface EditCategoryPropertyProps {
  isCategory: boolean;
  category: CategoryResponse | SubcategoryResponse;
  categoryName: string;
  disabled: boolean;
}

const EditCategoryProperty: FunctionComponent<EditCategoryPropertyProps> =
  ({ isCategory, category, categoryName, disabled }) => {

    const { addNewValue, values } = useFormikValues<CustomFormValues[]>();

    let newValues = values as unknown as CustomFormValues;

    const [content, setContent] = useState<string>('');
    const [file, setFile] = useState<ImageFile[]>([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [catValues, setCatValues] = useState<CategoryFormProperty>(initialFormState);

    useEffect(() => {
      const imageName = file.length === 0 && !isValidBase64Image(imagePreviewUrl)
        ? removePartFromUrl(imagePreviewUrl, UrlToImages)
        : null;

      addNewValue({ ...catValues, description: content, imageName, image: file, imageSrc: imagePreviewUrl });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catValues, content, file, imagePreviewUrl]);

    useEffect(() => {
      if (category) {
        const initialValues = mapCategoryToFormValues(category, isCategory);
        setCatValues(initialValues);
        setContent(initialValues.description || '');
        setImagePreviewUrl(initialValues.imageName || '');
      }
      addNewValue({ categoryName: categoryName });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, categoryName, isCategory]);

    const handleAddImage = useCallback((newFile: ImageFile[]) => setFile(newFile), []);

    return (
      <div className={styles.editCategoryContainer}>
        <div className={styles.colons}>
          <div className={styles.wireBorder}>
            <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
          </div>
          <UploadImage setImagePreviewUrl={setImagePreviewUrl} handleAddImage={handleAddImage} />
          <div>
            <div className={styles.buttonPublic}>
              <button disabled={disabled} type="submit">Public</button>
            </div>
            <TextInputField
              className={styles.titleField}
              name="categoryName"
              label=""
              id="categoryName"
              placeholder="Enter category name"
              initialValue={newValues.categoryName}
            />
          </div>
        </div>
        <div className={styles.description}>
          {content && <EnhancedMdxEditorComponent
            content={content}
            setContent={setContent}
            width="95%" />}
        </div>
      </div>
    );
  };

const initialFormState = {
  id: '',
  categoryName: '',
  description: '',
  imageName: '',
  accept: true
};

const mapCategoryToFormValues = (
  category: CategoryResponse | SubcategoryResponse,
  isCategory: boolean): CategoryFormProperty => ({
    id: category.id,
    description: category.description,
    imageName: category.imageSrc,
    accept: isCategory
  });

export default EditCategoryProperty;