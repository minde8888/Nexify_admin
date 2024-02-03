import React, { FunctionComponent } from "react";
import { TextInputField } from "../../../InputFields/TextInputField";
import useFormProperty from "../../../../hooks/useFormProperty";
import PropertyItem from "../PropertyItem/PropertyItem";
import CustomButton from "../../../Buttons/CustomButton/CustomButton";
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
  const { addNewProperty, removeProperty, properties } = useFormProperty(prefix);

  return (
    <div className={styles.wrapper} >
      <div className={styles.labelContainer}>
        {showAddButton && (
          <CustomButton onClick={addNewProperty} style={styles.buttonAdd} symbol={'+'} />
        )}
        {prefix && (
          <TextInputField
            name={`${prefix}`}
            id={`${prefix}label`}
            className={styles.inputField}
            initialValue={''}
            data-testid="text-input-field"
          />
        )}
      </div>
      {properties.map((property, index) => (
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
      ))}
    </div>
  );
};

export default PropertyList;