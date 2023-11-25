interface CategoryFormProperty {
    id: string;
    label: string;
    content?: string;
    image?: ImageFile[];
    properties: DynamicFormProperty[];
  }
   
  export default CategoryFormProperty;