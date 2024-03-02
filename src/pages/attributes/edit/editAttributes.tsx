import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { Formik, Form } from 'formik';
import useAttributeData from "../../../hooks/useAttributesData";
import Preloader from "../../preloader/preloader";
import { ALL_ATTRIBUTES_URL, ATTRIBUTES_UPDATE_URL, PUT_METHOD } from "../../../constants/apiConst";
import EditAttributesPropertyProps from "../../../components/AttributesContent/EditAttributes/EditAttributesProperty";
import validationSchema from "../../../utils/validation/addAttributesValidationsSchema";

interface FormikProps {
    id: number | string;
    attributeName: string;
    imageDescription: string;
    imageName?: string;
}

const EditAttributes = () => {
    const { entity,
        attributeName,
        imageName,
        id,
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

    if (!id) return null;

    return (
        <Preloader isLoading={(lastRequestStatus === false)}>
            <Formik onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                initialValues={initialAttributesFormProperty}
                validationSchema={validationSchema}
            >
                <Form>
                    <h2>Edit Attribute</h2>
                    <EditAttributesPropertyProps
                        id={id}
                        attributeName={attributeName}
                        imageName={imageName || ''}
                        disabled={lastRequestStatus === false}
                    />
                </Form>
            </Formik>
        </Preloader>
    );
};

export default EditAttributes;
