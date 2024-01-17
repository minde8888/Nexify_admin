import { useFormikContext, getIn } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import DynamicFormProperty from '../types/categoryFormProperty';

const useFormProperty = (prefix: string) => {
    const { values, setFieldValue } = useFormikContext();

    const properties: DynamicFormProperty[] = getIn(values, `${prefix}properties`);

    const updateProperties = (newProperties: DynamicFormProperty[]) => {
        setFieldValue(`${prefix}properties`, newProperties);
    };

    const addNewProperty = () => {
        const newProperty: DynamicFormProperty = {
            id: uuidv4(),
            categoryId: '',
            properties: [],
            '': ''
        };

        const newProperties = [...properties, newProperty];
        updateProperties(newProperties);
    };

    const removeProperty = (propertyIndex: number) => {
        const newProperties = [...properties];
        newProperties.splice(propertyIndex, 1);
        updateProperties(newProperties);
    };

    return {
        properties,
        addNewProperty,
        removeProperty
    };
};

export default useFormProperty;
