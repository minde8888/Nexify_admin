import { useCallback } from "react";
import DynamicFormProperty from "../types/categoryFormProperty";
 
function useDynamicForm() {
  const initialValues: DynamicFormProperty = {
      label: '',
      properties: [],
      id: "",
      content: "",
      image: []
  };
 
  const handleSubmit = useCallback((values: DynamicFormProperty) => {
    console.log(values);
    // You can perform additional actions or callbacks here if needed
  }, []); 
 
  return {
    initialValues,
    handleSubmit,
  };
}
 
export default useDynamicForm;