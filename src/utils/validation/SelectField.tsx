import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { useEffect } from 'react';
import { HTMLProps } from 'react';

interface PropsType extends HTMLProps<HTMLSelectElement> {
    name: string;
}

export const SelectField = ({ label, ...props }: PropsType) => {
    const [field, meta, getFieldProps] = useField(props);

    useEffect(() => {
        getFieldProps.setValue(props.value);
    }, [props.value]);

    return (
        <>
            <select {...field} {...props} />
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
