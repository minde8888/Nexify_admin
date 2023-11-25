import React from 'react';
import { ErrorMessage, useField } from 'formik';

interface PropsType {
    className: string;
    name: string;
    label: string;
    id: string;
}

export const TextInputField = ({ label, id, ...props }: PropsType) => {
    const [field] = useField(props);

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                {...field}
                {...props}
                autoComplete="off"
                placeholder={label} id={id}
            />
            <div style={{
                color: "red",
                fontSize: '11px'
            }}>
                <ErrorMessage
                    component="div"
                    name={field.name}
                />
            </div >
        </>
    );
};

