import { FunctionComponent } from "react";
import { TextInputField } from "../../utils/validation/TextInputField";
import useFormProperty from "../../hooks/useFormProperty";
import PropertyItem from "./PropertyItem";
import CategoryFormProperty from "../../types/categoryFormProperty";
import styles from "../../styles/categoryProperty.module.scss";

interface PropertyListProps {
  prefix: string;
  showAddButton: boolean;
}

const PropertyList: FunctionComponent<PropertyListProps> = ({
  prefix,
  showAddButton,
}) => {
  const { properties, addNewProperty, removeProperty, addImage, addContent } =
    useFormProperty(prefix);

  const renderProperty = (property: CategoryFormProperty, index: number) => (
    <PropertyItem
      key={property.id}
      prefix={prefix}
      property={property}
      index={index}
      showAddButton={showAddButton}
      onRemove={removeProperty}
      onAddImage={addImage}
      onAddContent={addContent}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelContainer}>
        {showAddButton && (
          <div className={styles.addButton}>
            <button type="button" onClick={addNewProperty}>
              +
            </button>
          </div>
        )}
        {prefix && (
          <div className={styles.textField}>
            <TextInputField
              name={`${prefix}`}
              className=""
              label=""
              id={`${prefix}label`}
            />
          </div>
        )}
      </div>
      {properties.map(renderProperty)}
    </div>
  );
};

export default PropertyList;