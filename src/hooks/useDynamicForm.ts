import DynamicFormProperty from "../types/categoryFormProperty";
 
function useDynamicForm() {
  const initialValues: DynamicFormProperty = {
      label: '',
      properties: [],
      id: "",
      content: "",
      image: []
  };
 
  const handleSubmit = (values: DynamicFormProperty) => {
    console.log(values);
  };
 
  return {
    initialValues,
    handleSubmit,
  };
}
 
export default useDynamicForm;