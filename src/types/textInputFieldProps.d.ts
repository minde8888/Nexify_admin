interface TextInputFieldProps {
    label: string;
    id: string;
    className: string;
    name: string;
    placeholder?: string;
    autoFocus?: boolean;
    'data-testid'?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
}
