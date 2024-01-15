import { FunctionComponent } from "react";
import { TextInputField } from "../../InputFields/TextInputField";
import useFormProperty from "../../../hooks/useFormProperty";
import PropertyItem from "./PropertyItem";
import CategoryFormProperty from "../../../types/categoryFormProperty";
import styles from "../../../styles/categoryProperty.module.scss";
import CustomButton from "../../Buttons/CustomButton";

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
      level={level}
      setPrefix={setPrefix}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelContainer}>
        {showAddButton && (
          <CustomButton onClick={addNewProperty} style={styles.buttonAdd} symbol={'+'} />
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