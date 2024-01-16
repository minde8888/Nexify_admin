import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    properties: Yup.array().of(
        Yup.object().shape({
            id: Yup.string(),
            '': Yup.string().required('Category Name is required'),
            properties: Yup.array()
        })
    )
});

export default validationSchema;
