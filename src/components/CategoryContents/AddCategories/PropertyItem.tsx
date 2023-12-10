import React, { useCallback, useState } from "react";
import UploadImage from "../../UploadImage/UploadImage";
import MarkDownEditor from "../../MarkDownEditor/MarkDownEditor";
import CategoryFormProperty from "../../../types/categoryFormProperty";
import AddProperty from "./CategoriesProperty";
import { ImageFile } from "../../../types/imageFile";
import PropertyImagePreview from "../../PropertyImagePreview/PropertyImagePreview";
import { CustomModal } from "../../Modal/CustomModal";
import { useCustomModal } from "../../../hooks/useCustomModal";
import styles from "../../../styles/categoryProperty.module.scss";
import { CATEGORY_DEPTH } from "../../../constants/categoryConst";

interface PropertyItemProps {
  prefix: string;
  property: CategoryFormProperty;
  index: number;
  showAddButton: boolean;
  onRemove: (index: number) => void;
  onAddImage: (index: number, images: ImageFile[]) => void;
  onAddContent: (index: number, content: string) => void;
}

const PropertyItem: React.FC<PropertyItemProps> = ({
  prefix,
  property,
  index,
  onRemove,
  onAddImage,
  onAddContent
}) => {

  const propertyPrefix = `${prefix}properties[${index}].`;

  const styleButton = propertyPrefix.length === CATEGORY_DEPTH ? 'content1' : 'content2';

  const { isOpen, open, close } = useCustomModal();

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleRemoveProperty = useCallback(() => {
    onRemove(index);
  }, [onRemove, index]);

  const handleAddImage = useCallback((images: ImageFile[]) => {
    onAddImage(index, images);
  }, [onAddImage, index]);

  return (
    <div className={styles.propertyContainer} key={property.id}>
      <div className={styles.buttonRemove}>
        <button type="button" onClick={handleRemoveProperty}>
          -
        </button>
      </div>
      <>
        <AddProperty prefix={propertyPrefix} />
        <div className={`${styles.addContent} ${styles[styleButton]}`}>
          <button type="button" onClick={() => open(index)}>Content</button>
        </div>

        <CustomModal isOpen={isOpen(index)} open={() => open(index)} >
          <MarkDownEditor
            content={property.description}
            setContent={(value) => onAddContent(index, value)}
            showEditor={true}
            addContent={onAddContent}
            index={index}
          />
          <UploadImage
            setImagePreviewUrl={setImagePreviewUrl}
            handleAddImage={handleAddImage}
          />
          <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
          <div className={styles.closeModalButton}>
            <button type="button" onClick={() => close(index)}>❌</button>
          </div>
        </CustomModal>
      </>
    </div>
  );
};

export default PropertyItem;
