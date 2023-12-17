import React from 'react';
import { ErrorMessage, useField } from 'formik';

interface PropsType {
    [x: string]: string | undefined;
    name: string;
}

export const TextArea = ({ label, ...props }: PropsType) => {
    const [field, meta] = useField(props);
    return (
        <>
            <textarea className="text-area" {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
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