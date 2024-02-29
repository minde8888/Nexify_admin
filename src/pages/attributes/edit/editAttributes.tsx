import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../../preloader/preloader";
import { Formik, Form } from 'formik';
import useAttributeData from "../../../hooks/useAttributesData";
import { ALL_ATTRIBUTES_URL, ATTRIBUTES_UPDATE_URL, PUT_METHOD } from "../../../constants/apiConst";
import useForm from "../../../hooks/useForm";
import EditAttributesPropertyProps from "../../../components/AttributesContent/EditAttributes/EditAttributesProperty";

interface FormikProps {
    id: number | string;
    attributeName: string;
    imageDescription: string;
    imageName?: string;
}

const EditAttributes = () => {
    const { entity,
        attributeName,
        imageDescription,
        imageName,
        lastRequestStatus } = useAttributeData();

    const { handleSubmit } = useForm<FormikProps>(PUT_METHOD, ATTRIBUTES_UPDATE_URL);

    const navigate = useNavigate();

    useEffect(() => {
        if (lastRequestStatus) {
            navigate(ALL_ATTRIBUTES_URL);
        }
    }, [lastRequestStatus, navigate]);

    if (!entity) return null;

    const initialAttributesFormProperty: FormikProps = {
        id: '',
        attributeName: '',
        imageDescription: '',
        imageName: ''
    };

    return (
        <Preloader isLoading={(lastRequestStatus === false)}>
            <div>11111</div>
            <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialAttributesFormProperty}
            // validationSchema={validationSchema}
            >
                <Form>
                    <h2>Edit Attribute</h2>
                    <EditAttributesPropertyProps
                        attributeName={attributeName}
                        imageDescription={imageDescription}
                        imageName= {imageName || ''}
                        disabled={lastRequestStatus === false}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditAttributes;
