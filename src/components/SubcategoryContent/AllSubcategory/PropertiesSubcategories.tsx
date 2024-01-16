import { Dispatch, FunctionComponent, RefObject, SetStateAction } from "react";
import { CategoryResponse } from "../../../types/category";
import Subcategory from "./Subcategory";
import { FormikProps } from "formik";
import CategoryFormProperty from "../../../types/categoryFormProperty";

interface PropertiesSubcategoriesProps {
    categories: CategoryResponse[];
    setPrefix: Dispatch<SetStateAction<boolean>>;
    disabled: boolean;
    formikRef:  RefObject<FormikProps<CategoryFormProperty>>
}

const PropertiesSubcategories: FunctionComponent<PropertiesSubcategoriesProps> = ({ categories, setPrefix, disabled, formikRef }) => (
    <>
        {
            Object.values(categories).map((category, index) => (
                <div key={index}>
                    <div>{category.categoryName}</div>
                    <Subcategory
                        id={category.id}
                        subcategories={category.subcategories}
                        setPrefix={setPrefix}
                        disabled={disabled}
                        formikRef={formikRef}
                    />
                </div>
            ))
        }
    </>
);

export default PropertiesSubcategories;