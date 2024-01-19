import React from 'react';
import { SelectField } from "../InputFields/SelectField";

interface SelectOptionsProps {
    options?: any[];
    selectValue: string;
    displayKey: string;
    handleSelectChange: (event: React.FormEvent<HTMLSelectElement>) => void;
    styles?: Record<string, string>;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({
    options,
    selectValue,
    displayKey,
    handleSelectChange,
    styles 
}) => {
    const optionElements = options?.map((option, index) => (
        <option value={option.id} key={index}>
            {option[displayKey]}
        </option>
    ));

    return (
        <SelectField
            value={selectValue}
            name="id"
            as="select"
            onChange={handleSelectChange}
            style={styles} 
        >
            <option value="">Choose an option</option>
            {optionElements}
        </SelectField>
    );
};

export default SelectOptions;
