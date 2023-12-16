import { ErrorMessage, useField } from 'formik';

interface TextInputFieldProps {
  className?: string;
  name: string;
  label?: string;
  id: string;
  placeholder?: string;
  initialValue?: string;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  label,
  id,
  initialValue,
  ...props
}) => {
  const [field] = useField({ ...props, name: props.name });

  const inputProps = {
    ...field,
    ...props,
    autoComplete: "off",
    placeholder,
    value: field.value !== '' ? field.value : initialValue,
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputProps} />
      <div style={{ color: 'red', fontSize: '11px' }}>
        <ErrorMessage component="div" name={field.name} />
      </div>
    </>
  );
};