import { Modal } from "../../Modal/Modal";
import { TextInputField } from "../../../utils/validation/TextInputField";
import UploadImage from "../../UploadImage/UploadImage";
import PropertyImagePreview from "../../PropertyImagePreview/PropertyImagePreview";
import MarkDownEditor from "../../MarkDownEditor/MarkDownEditor";
import styles from './edit.module.scss';
import { FunctionComponent } from "react";

interface EditPropertyModalProps {
    isOpen: boolean;
    toggle: () => void;
    onCancel: () => void;
    initialValue?: string;
    content: string;
    setContent: (content: string) => void;
    imagePreviewUrl: string;
    setImagePreviewUrl: (url: string) => void;
    id: string;
}

const EditPropertyModal: FunctionComponent<EditPropertyModalProps> = ({
    isOpen,
    toggle,
    onCancel,
    initialValue,
    content,
    setContent,
    imagePreviewUrl,
    setImagePreviewUrl,
    id
}) => (
    <Modal isOpen={isOpen} toggle={toggle}>
        <TextInputField
            name={"Title"}
            className={styles.titleField}
            id={`${id}_title`}
            label={"Title"}
            initialValue={initialValue}
        />
        <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
        <UploadImage
            setImagePreviewUrl={setImagePreviewUrl}
        />
        <MarkDownEditor
            content={content}
            setContent={setContent}
            showEditor={true}
        />
        <div className={styles.saveButton}>
            <button type="submit">Submit</button>
        </div>
        <div className={styles.closeModalButton}>
            <button data-testid="test-close-id" onClick={onCancel} type="button">
                ❌
            </button>
        </div>
    </Modal>
);

export default EditPropertyModal;