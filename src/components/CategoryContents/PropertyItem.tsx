import React, { useCallback, useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import MarkDownEditor from "../MarkDownEditor/MarkDownEditor";
import CategoryFormProperty from "../../types/categoryFormProperty";
import CategoriesProperty from "./CategoriesProperty";
import { ImageFile } from "../../types/imageFile";
import PropertyImagePreview from "../PropertyImagePreview/PropertyImagePreview";
import { Modal } from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import styles from "../../styles/categoryProperty.module.scss";

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
  onAddContent,
}) => {
  const propertyPrefix = `${prefix}properties[${index}].`;

  const { isOpen, open, close } = useModal(1);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleRemoveProperty = useCallback(() => {
    onRemove(index);
  }, [onRemove, index]);

  const handleAddImage = useCallback((images: ImageFile[]) => {
    onAddImage(index, images);
  }, [onAddImage, index]);

  return (
    <div className={styles.propertyContainer} key={property.id}>
      <div className={styles.removeButton}>
        <button type="button" onClick={handleRemoveProperty}>
          -
        </button>
      </div>
      <>
        <CategoriesProperty prefix={propertyPrefix} />
        <div className={styles.buttonAdd}>
          <button type="button" onClick={() => open(index)}>Add Content</button>
        </div>
        <Modal isOpen={isOpen(index)} open={() => open(index)} >
          <MarkDownEditor
            content={property.content}
            setContent={(value) => onAddContent(index, value)}
            showEditor={true}
            addContent={onAddContent}
            index={index}
          />
          <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
          <UploadImage
            setImagePreviewUrl={setImagePreviewUrl}
            handleAddImage={handleAddImage}
          />
          <div className={styles.cancelButton}>
            <button type="button" onClick={() => close(index)}>❌</button>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default PropertyItem;
