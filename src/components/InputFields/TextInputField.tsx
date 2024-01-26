import { ErrorMessage, useField } from 'formik';
import { log } from '../../utils/helpers/logger';

interface TextInputFieldProps {
  className?: string;
  name: string;
  label?: string;
  id: string;
  placeholder?: string;
  initialValue?: string;
  autoFocus?: boolean; // New prop for enabling autoFocus
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  label,
  id,
  initialValue,
  autoFocus,
  ...props
}) => {
  const [field] = useField({ ...props, name: props.name });

  const inputProps = {
    ...field,
    ...props,
    autoComplete: "off",
    placeholder,
    value: field.value !== '' ? field.value : initialValue,
    autoFocus, // Apply autoFocus attribute directly
  };

  // log(inputProps);

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
