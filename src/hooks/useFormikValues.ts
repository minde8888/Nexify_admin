import { setIn, useFormikContext } from 'formik';

interface FormValues {
    [key: string]: any;
}

const useFormikValues = () => {
    const formik = useFormikContext<{ values: FormValues[] }>();

    if (!formik) {
        throw new Error('useFormikValues must be used within a Formik context');
    }

    const { setValues } = formik;

    const updateValues = (newValues: FormValues[]) => {
        const filteredValues = Array.isArray(newValues) ? newValues.filter((value) => value !== null && value !== undefined) : [];

        setValues((prevValues) => {
            let updatedValues = { ...prevValues };
            filteredValues.forEach((value: FormValues) => {
                Object.entries(value).forEach(([key, val]) => {
                    updatedValues = setIn(updatedValues, key, val);
                });
            });
            return updatedValues;
        });
    };

    const addNewValue = (value: FormValues) => {
        return updateValues([value]);
    };

    return {
        addNewValue
    };
};

export default useFormikValues;
