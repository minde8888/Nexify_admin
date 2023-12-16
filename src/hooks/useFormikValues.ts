import { useFormikContext, getIn } from 'formik';

const useFormikValues = <T>(initialValues: string) => {
    const { values, setFieldValue } = useFormikContext<{ values: T[] }>(); // Replace any with the actual type of values

    const initial: T[] = Array.isArray(getIn(values, initialValues)) ? getIn(values, initialValues) : [];

    const updateValues = (newValues: T[]) => {
        return setFieldValue('values', newValues);
    };

    const addNewValue = (value: T) => {
        console.log('values:', values);
        console.log('value:', value);

        const newValues = [...initial, value];
        return updateValues(newValues);
    };

    const removeValue = (valueIndex: number) => {
        const newValues = [...initial.slice(0, valueIndex), ...initial.slice(valueIndex + 1)];
        return updateValues(newValues);
    };

    const resetValues = () => {
        return updateValues([...initial]);
    };

    return {
        initial,
        addNewValue,
        removeValue,
        resetValues
    };
};

export default useFormikValues;
