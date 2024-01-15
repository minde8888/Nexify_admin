import React, { useCallback } from "react";
import CategoryFormProperty from "../../../types/categoryFormProperty";
import AddProperty from "./CategoriesProperty";
import CustomButton from "../../Buttons/CustomButton";
import styles from "../../../styles/categoryProperty.module.scss";

interface PropertyItemProps {
  prefix: string;
  property: CategoryFormProperty;
  index: number;
  showAddButton: boolean;
  onRemove: (index: number) => void;
  level: number;
  setPrefix: (value: boolean) => void;
}

const PropertyItem: React.FC<PropertyItemProps> = ({
  prefix,
  property,
  index,
  onRemove,
  level,
  setPrefix
}) => {

  const propertyPrefix = `${prefix}properties[${index}].`;

  const handleRemoveProperty = useCallback(() => {
    onRemove(index);
  }, [onRemove, index]);

  return (
    <div className={styles.propertyContainer} key={property.id}>
      <CustomButton onClick={handleRemoveProperty} style={styles.buttonRemove} symbol={'-'} />
      <>
        <AddProperty prefix={propertyPrefix} level={level} setPrefix={setPrefix} />
      </>
    </div>
  );
};

export default PropertyItem;
