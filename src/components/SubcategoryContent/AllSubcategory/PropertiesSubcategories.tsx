import { FunctionComponent } from "react";
import { CategoryResponse } from "../../../types/category";
import Subcategory from "./Subcategory";

interface PropertiesSubcategoriesProps {
    categories: CategoryResponse[];
    setPrefix: (value: boolean) => void;
}

const PropertiesSubcategories: FunctionComponent<PropertiesSubcategoriesProps> = ({ categories, setPrefix }) => (
    <>
        {
            Object.values(categories).map((category, index) => (
                <div key={index}>
                    <div>{category.categoryName}</div>
                    <Subcategory
                        id={category.id}
                        subcategories={category.subcategories}
                        setPrefix={setPrefix}
                    />
                </div>
            ))
        }
    </>
);

export default PropertiesSubcategories;