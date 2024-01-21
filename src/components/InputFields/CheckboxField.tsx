import { useCheckboxContext } from "../Context/CheckboxProvider";

interface CheckboxFieldProps {
  name: string;
  label?: string;
  className?: string;
}

export const CheckboxField = ({ name, label, className }: CheckboxFieldProps) => {
  const { checkedCategories, setCheckedCategories } = useCheckboxContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCategories({
      ...checkedCategories,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className={className}>
      <input 
        type="checkbox" 
        name={name} 
        checked={checkedCategories[name] || false} 
        onChange={handleChange} 
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
