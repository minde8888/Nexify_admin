import { Dispatch, FunctionComponent, RefObject, SetStateAction, useCallback, useState } from "react";
import { CategoryResponse } from "../../../../types/category";
import Subcategory from "../Subcategory/Subcategory";
import { FormikProps } from "formik";
import CategoryFormProperty from "../../../../types/categoryFormProperty";
import SubcategoryModal from "../../SubcategoryModal/SubcategoryModal";
import CustomButton from "../../../Buttons/CustomButton/CustomButton";
import useFormikValues from "../../../../hooks/useFormikValues";
import styles from '../subcategory.module.scss';

interface PropertiesSubcategoriesProps {
    categories?: CategoryResponse[];
    toggle: () => void;
    isOpen: boolean;
    disabled: boolean;
    formikRef: RefObject<FormikProps<CategoryFormProperty>>;
    setPrefix: Dispatch<SetStateAction<boolean>>;
}

const PropertiesSubcategories: FunctionComponent<PropertiesSubcategoriesProps> =
    ({ categories, toggle, setPrefix, disabled, isOpen, formikRef }) => {
        const { addNewValue } = useFormikValues();
      
        const [id, setId] = useState('');        

        const onAddNewProperty = useCallback((categoryId: string) => {
            setId(categoryId)
            toggle();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [toggle, addNewValue]);

        return (
            <>
                {categories?.map((category, index) => (
                    <div key={category.id || index} className={styles.container}>
                        <div className={styles.category}>
                            {category.title}
                        </div>

                        <Subcategory
                            subcategories={category.subcategories}
                        />
                        <CustomButton
                            onClick={() => onAddNewProperty(category.id)}
                            style={styles.buttonAdd}
                            symbol="+"
                            id={category.id}
                        />
                    </div>
                ))}
                <SubcategoryModal
                    setPrefix={setPrefix}
                    disabled={disabled}
                    formikRef={formikRef}
                    toggle={toggle}
                    isOpen={isOpen}
                    id={id}
                />
            </>
        );
    }

export default PropertiesSubcategories;
