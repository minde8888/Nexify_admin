import { useFormikContext } from 'formik';

export interface FormValues {
    [key: string]: any;
}

const useFormikValues = () => {
    const formik = useFormikContext<{ values: FormValues[] }>();

    if (!formik) {
        throw new Error('useFormikValues must be used within a Formik context');
    }

    const { values, setValues } = formik;

    const updateValues = (newValues: FormValues[]) => {
        const filteredValues = Array.isArray(newValues) ? newValues.filter((value) => value !== null && value !== undefined) : [];

        setValues((prevValues) => {
            let updatedValues = { ...prevValues };

            filteredValues.forEach((value: FormValues) => {
                updatedValues = { ...updatedValues, ...value };
            });

            return updatedValues;
        });
    };

    const addNewValue = (value: FormValues) => {
        return updateValues([value]);
    };

    return {
        addNewValue,
        values
    };
};

export default useFormikValues;
