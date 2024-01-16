import { useFormikContext, getIn } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import DynamicFormProperty from '../types/categoryFormProperty';
import { ImageFile } from '../types/imageFile';

const useFormProperty = (prefix: string) => {
    const { values, setFieldValue } = useFormikContext();

    const properties: DynamicFormProperty[] = getIn(values, `${prefix}properties`);

    const updateProperties = (newProperties: DynamicFormProperty[]) => {
        setFieldValue(`${prefix}properties`, newProperties);
    };

    const addNewProperty = () => {
        const newProperty: DynamicFormProperty = {
            id: uuidv4(),
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

    const addContent = (propertyIndex: number, content: string) => {
        const newProperties = [...properties];
        newProperties[propertyIndex].description = content;
        updateProperties(newProperties);
    };

    const addImage = (propertyIndex: number, images: ImageFile[]) => {
        const newProperties = [...properties];
        newProperties[propertyIndex].image = images;
        updateProperties(newProperties);
    };

    return {
        properties,
        addNewProperty,
        addContent,
        addImage,
        removeProperty
    };
};

export default useFormProperty;
