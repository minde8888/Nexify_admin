import  { FunctionComponent } from "react";
import { CategoryResponse } from "../../../types/category";
import Category from "./Category";
import { Modal } from "../../Modal/Modal";
import styles from './edit.module.scss';

interface EditPropertyProps {
    categories: CategoryResponse[];
    isOpen:boolean;
    toggle: () => void;
    onEdit: (id: string) => void;
    onRemove: (id: string) => void;
}

const EditProperty: FunctionComponent<EditPropertyProps> = ({ categories, isOpen, toggle, onEdit, onRemove }) => {

    const onCancel = () => toggle();

    return (
        <div className={styles.editPropertyContainer}>
            <Modal isOpen={isOpen} toggle={toggle}>
                <div className={styles.closeModalButton}>
                    <button data-testid="test-close-id" onClick={onCancel} type="button">
                        ❌
                    </button>
                </div>
            </Modal>
            {Object.values(categories).map(category => (
                <Category
                    key={category.categoryId}
                    category={category}
                    onRemove={onRemove}
                    onEdit={onEdit} />
            ))}
        </div>
    );
};

export default EditProperty;

;