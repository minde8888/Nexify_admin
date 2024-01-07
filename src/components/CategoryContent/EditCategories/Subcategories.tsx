import { FunctionComponent } from "react";
import styles from './edit.module.scss';
import Subcategory from "./Subcategory";
import { SubcategoryResponse } from "../../../types/category";

interface SubcategoriesProps {
    subcategories: SubcategoryResponse[];
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const Subcategories: FunctionComponent<SubcategoriesProps> = ({ subcategories, onRemove, onEdit }) => (
    <div className={styles.subcategoryContainer}>
        {subcategories.map(subcategory => (
            <Subcategory
                key={subcategory.Id}
                subcategory={subcategory}
                onRemove={onRemove}
                onEdit={onEdit} />
        ))}
    </div>
);

export default Subcategories;