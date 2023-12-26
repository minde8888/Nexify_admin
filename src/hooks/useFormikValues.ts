import { useFormikContext, setIn } from 'formik';

interface FormValues {
  [key: string]: any;
}

const useFormikValues = () => {
  const { setValues } = useFormikContext<{ values: FormValues[] }>();

  const updateValues = (newValues: FormValues[]) => {
    const filteredValues = Array.isArray(newValues)
      ? newValues.filter((value) => value !== null && value !== undefined)
      : [];

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

  const resetValues = () => {
    setValues({ values: [] });
  };

  return {
    addNewValue,
    resetValues,
  };
};

export default useFormikValues;
