type TextInputFieldProps = {
    label?: string;
    id: string;
    placeholder?: string;
    autoFocus?: boolean;
    'data-testid'?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
  };