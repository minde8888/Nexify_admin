import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Post Tile is required'),
    content: Yup.string(),
    image: Yup.array().of(
        Yup.object().shape({
            url: Yup.string().url('Invalid URL'),
            altText: Yup.string()
        })
    ),
});

export default validationSchema;