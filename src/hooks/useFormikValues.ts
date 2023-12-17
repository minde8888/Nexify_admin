import { useFormikContext, getIn } from 'formik';

interface FormValues {
    [key: string]: any;
}

const useFormikValues = (initialValues: string) => {
    const { values, setFieldValue } = useFormikContext<{ values: FormValues[] }>();

    const initial: FormValues[] = Array.isArray(getIn(values, initialValues)) ? getIn(values, initialValues) : [];

    const updateValues = (newValues: FormValues[]) => {
        const filteredValues = Array.isArray(newValues) ? newValues.filter((value) => value !== null && value !== undefined) : [];

        filteredValues.forEach((value: FormValues) => {
            Object.entries(value).forEach(([key, val]) => {
                setFieldValue(key, val);
            });
        });
    };

    const addNewValue = (value: FormValues) => {
        return updateValues([value]);
    };

    const resetValues = () => {
        return updateValues([...initial]);
    };

    return {
        initial,
        addNewValue,
        resetValues
    };
};

export default useFormikValues;
