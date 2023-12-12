import { ErrorMessage, useField } from 'formik';

interface PropsType {
  className?: string;
  name: string;
  label?: string;
  id: string;
  placeholder?: string;
}

export const TextInputField = ({placeholder, label, id, ...props }: PropsType) => {
  
  const [field] = useField(props);

  const initialValue = field.value !== undefined ? field.value : '';

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        placeholder={placeholder}
        id={id}
        value={initialValue} 
      />
      <div style={{ color: 'red', fontSize: '11px' }}>
        <ErrorMessage component="div" name={field.name} />
      </div>
    </>
  );
};
