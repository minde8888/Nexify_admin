import React, { useCallback, useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import MarkDownEditor from "../MarkDownEditor/MarkDownEditor";
import CategoryFormProperty from "../../types/categoryFormProperty";
import CategoriesProperty from "./CategoriesProperty";
import { ImageFile } from "../../types/imageFile";
import PropertyImagePreview from "../PropertyImagePreview/PropertyImagePreview";
import { Modal } from "../Modal/Modal";
import styles from "../../styles/categoryProperty.module.scss";
import { useModal } from "../../hooks/useModal";


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
        <button type="button" onClick={() => open(index)}>Open Modal {index}</button>
        <Modal isOpen={isOpen(index)} open={() => open(index)}>
          <UploadImage
            setImagePreviewUrl={setImagePreviewUrl}
            handleAddImage={handleAddImage}
          />
          <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
          <MarkDownEditor
            content={property.content}
            setContent={(value) => onAddContent(index, value)}
            showEditor={true}
            addContent={onAddContent}
            index={index}
          />
          <button type="button" onClick={() => close(index)}>Close Modal {index}</button>
          <div>Modal Content {index}</div>
        </Modal>
      </>
    </div>
  );
};

export default PropertyItem;
