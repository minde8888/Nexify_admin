import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { SubcategoryResponse } from '../../../types/category';
import CustomButton from '../../Buttons/CustomButton';
import { Modal } from '../../Modal/Modal';
import CategoriesProperty from '../../CategoryContent/AddCategories/CategoriesProperty';
import { useModal } from '../../../hooks/useModel';
import styles from './subcategory.module.scss';

interface SubcategoryPropertiesProps {
    id: string;
    subcategories: SubcategoryResponse[];
    setPrefix: (value: boolean) => void;
}

const Subcategory: FunctionComponent<SubcategoryPropertiesProps> = ({ id, subcategories, setPrefix }) => {
    const { isOpen, toggle } = useModal();

    const addNewProperty = useCallback(() => {
        toggle();
        console.log('add new property for', id);
    }, [id, toggle]);

    return (
        <>
            {subcategories.map((subcategory) => (
                <div key={subcategory.id}>
                    <div>{subcategory.categoryName}</div>
                </div>
            ))}
            <CustomButton onClick={addNewProperty} style={styles.buttonAdd} symbol="+" />
            <Modal isOpen={isOpen} toggle={toggle}>
                <CategoriesProperty level={1} setPrefix={setPrefix} />
            </Modal>
        </>
    );
}

export default Subcategory;