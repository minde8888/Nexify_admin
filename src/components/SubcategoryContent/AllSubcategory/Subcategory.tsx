import React, { FunctionComponent, RefObject, useCallback } from 'react';
import { SubcategoryResponse } from '../../../types/category';
import CustomButton from '../../Buttons/CustomButton';
import { Modal } from '../../Modal/Modal';
import CategoriesProperty from '../../CategoryContent/AddCategories/CategoriesProperty';
import { useModal } from '../../../hooks/useModel';
import styles from './subcategory.module.scss';
import { FormikProps } from 'formik';
import CategoryFormProperty from '../../../types/categoryFormProperty';


interface SubcategoryPropertiesProps {
    id: string;
    subcategories: SubcategoryResponse[];
    setPrefix: (value: boolean) => void;
    disabled?: boolean;
    formikRef: RefObject<FormikProps<CategoryFormProperty>>
}

const Subcategory: FunctionComponent<SubcategoryPropertiesProps> = ({ id, subcategories, setPrefix, disabled, formikRef }) => {
    const { isOpen, toggle } = useModal();

    const addNewProperty = useCallback(() => {
        toggle();
        console.log('add new property for', id);
    }, [id, toggle]);

    const closeModal = useCallback(() => {
        toggle();
        if (formikRef?.current) {
            formikRef.current.resetForm();
        }
    }, [formikRef, toggle]);

    return (
        <>
            {subcategories.map((subcategory) => (
                <div key={subcategory.id}>
                    <div>{subcategory.categoryName}</div>
                    <CustomButton onClick={addNewProperty} style={styles.buttonAdd} symbol="+" />
                </div>
            ))}

            <Modal isOpen={isOpen} toggle={closeModal}>
                <CustomButton onClick={closeModal} style={styles.removeDefaultButton} symbol={'❌'} />
                <CategoriesProperty level={1} setPrefix={setPrefix} />
                <div className={styles.saveButton}>
                    <button disabled={disabled} type="submit">
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default Subcategory;
