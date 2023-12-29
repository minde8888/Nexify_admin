import { FunctionComponent } from "react";
import { TextInputField } from "../../../utils/inputFields/TextInputField";
import useFormProperty from "../../../hooks/useFormProperty";
import PropertyItem from "./PropertyItem";
import CategoryFormProperty from "../../../types/categoryFormProperty";
import styles from "../../../styles/categoryProperty.module.scss";

interface PropertyListProps {
  prefix: string;
  showAddButton: boolean;
  level: number;
  setPrefix: (value: boolean) => void;
}

const PropertyList: FunctionComponent<PropertyListProps> = ({
  prefix,
  showAddButton,
  level,
  setPrefix
}) => {
  const {
    addNewProperty,
    removeProperty,
    addImage,
    addContent,
    properties
  } = useFormProperty(prefix);

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
      level={level}
      setPrefix={setPrefix}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelContainer}>
        {showAddButton && (
          <div className={styles.buttonAdd}>
            <button type="button" onClick={addNewProperty}>
              +
            </button>
          </div>
        )}
        {prefix && (
          <div >
            <TextInputField
              name={`${prefix}`}
              id={`${prefix}label`}
              className={styles.inputField}
              initialValue={''}
            />
          </div>
        )}
      </div>
      {properties.map(renderProperty)}
    </div>
  );
};

export default PropertyList;