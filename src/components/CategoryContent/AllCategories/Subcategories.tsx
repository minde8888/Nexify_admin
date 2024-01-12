import { FunctionComponent } from "react";
import Subcategory from "./Subcategory";
import { SubcategoryResponse } from "../../../types/category";
import styles from './allCategories.module.scss';

interface SubcategoriesProps {
    subcategories: SubcategoryResponse[];
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const Subcategories: FunctionComponent<SubcategoriesProps> = ({ subcategories, onRemove, onEdit }) => (
    <div className={styles.subcategoryContainer}>
        {subcategories.map(subcategory => (
            <Subcategory
                key={subcategory.id} 
                subcategory={subcategory}
                onRemove={onRemove}
                onEdit={onEdit} />
        ))}
    </div>
);

export default Subcategories;
