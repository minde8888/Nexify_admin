import { RefObject, useCallback, useEffect } from "react";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import CategoriesProperty from "../CategoryContent/AddCategories/CategoriesProperty/CategoriesProperty";
import { Modal } from "../Modal/Modal";
import { FormikProps } from "formik";
import CategoryFormProperty from "../../types/categoryFormProperty";
import styles from './AllSubcategory/subcategory.module.scss';

interface SubcategoryModalProps {
    setPrefix: (value: boolean) => void;
    disabled?: boolean;
    formikRef: RefObject<FormikProps<CategoryFormProperty>>;
    toggle: () => void;
    isOpen: boolean;
    id: string;
}

const SubcategoryModal = ({ setPrefix, disabled, formikRef, toggle, isOpen, id }: SubcategoryModalProps) => {

    useEffect(() => {
        formikRef.current?.setFieldValue('categoryId', id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formikRef.current?.values, id]);

    const closeModal = useCallback(() => {
        toggle();
        formikRef.current?.resetForm();
    }, [formikRef, toggle]);

    return (
        <Modal isOpen={isOpen} toggle={closeModal}>
            <div className={styles.modalScroll}>
                <h2>Add Product Subcategories</h2>
                <CustomButton onClick={closeModal} style={styles.removeDefaultButton} symbol={'❌'} />
                <CategoriesProperty level={1} setPrefix={setPrefix} />
                <div className={styles.saveButton}>
                    <button disabled={disabled} type="submit">
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default SubcategoryModal;
