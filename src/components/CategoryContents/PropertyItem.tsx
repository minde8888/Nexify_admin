import React, { useCallback, useMemo, useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import MarkDownEditor from "../MarkDownEditor/MarkDownEditor";
import CategoryFormProperty from "../../types/categoryFormProperty";
import CategoriesProperty from "./CategoriesProperty";
import { ImageFile } from "../../types/imageFile";
import PropertyImagePreview from "../PropertyImagePreview/PropertyImagePreview";
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
  showAddButton,
  onRemove,
  onAddImage,
  onAddContent,
}) => {
  const propertyPrefix = `${prefix}properties[${index}].`;

  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleToggleSection = useCallback((clickedIndex: number) => {
    setOpenSectionIndex((prev) => (prev === clickedIndex ? null : clickedIndex));
  }, [index]);

  const handleRemoveProperty = useCallback(() => {
    onRemove(index);
    setOpenSectionIndex(null);
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

      <button type="button" onClick={() => handleToggleSection(index)}>
        {openSectionIndex === index ? "Close" : "Add Content"}
      </button>
      <>
        <CategoriesProperty prefix={propertyPrefix} />
        {showAddButton && openSectionIndex === index && (
          <div>
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
          </div>
        )}
      </>
    </div>
  );
};

export default PropertyItem;
