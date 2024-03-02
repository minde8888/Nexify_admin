import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    id: Yup.string(),
    categoryName: Yup.string().required('Category Name is required'),
    // description: Yup.string(),
    image: Yup.array().of(
        Yup.object().shape({
            url: Yup.string().url('Invalid URL'),
            altText: Yup.string()
        })
    ),
});

export default validationSchema;
