import { useCheckboxContext } from "../../context/checkboxProvider";

interface CheckboxFieldProps {
  name: string;
  label?: string;
  className?: string;
}

export const CheckboxField = ({ name, label, className }: CheckboxFieldProps) => {
  const { checked, setChecked } = useCheckboxContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({
      ...checked,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className={className}>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked[name] || false}
        onChange={handleChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
