import * as Yup from 'yup';

const dynamicFormPropertySchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

const validationSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
  attributeName: Yup.string().required('Attribute name is required'),
  image: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().url('Invalid URL').required('Image URL is required'),
        altText: Yup.string(),
      })
    ),
  properties: Yup.array().of(dynamicFormPropertySchema), 
});

export default validationSchema;
