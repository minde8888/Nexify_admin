import { FunctionComponent } from "react";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import RemoveButton from "../../RemoveButton/RemoveButton";
import Subcategories from "./Subcategories";
import { CategoryResponse } from "../../../types/category";
import editIcon from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import styles from './edit.module.scss';

interface CategoryProps {
    category: CategoryResponse;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const Category: FunctionComponent<CategoryProps> = ({ category, onRemove, onEdit }) => (
    <div key={category.id} className={styles.categoryRow}>
        <div className={styles.categoryInfo}>
            <div>{category.categoryName}</div>
            <div className={styles.description}>{category.description}</div>
            <img src={category.imageSrc ? category.imageSrc : defaultImage} alt={category.categoryName} />
            <div>
                <ButtonWithIcon icon={editIcon} altText="Edit" style={styles.buttonEdit} onClick={() => onEdit(category.id)} />
                <RemoveButton onClick={() => onRemove(category.id)} style={styles.removeButton} />
            </div>
        </div>
        {category.subcategories && <Subcategories
            subcategories={category.subcategories}
            onRemove={onRemove}
            onEdit={onEdit} />}
    </div>
);

export default Category;
