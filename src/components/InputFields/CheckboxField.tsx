import { ErrorMessage, useField } from 'formik';
import { HTMLProps } from 'react';

interface PropsType extends HTMLProps<HTMLInputElement> {
    name: string;
    className?: string;
    label?: string;
}

export const CheckboxField = ({ label, value, ...props }: PropsType) => {
    const [field , getFieldProps] = useField({ ...props, type: 'checkbox' });

    // Ensure value is a boolean
    const isChecked = !!value;

    return (
        <>
            <input {...field} {...props} type="checkbox" checked={isChecked} />
            <label htmlFor={field.name}>{label}</label>
            <div style={{
                color: "red",
                fontSize: '11px'
            }}>
                <ErrorMessage component="div" name={field?.name} />
            </div>
        </>
    );
};
