import { FunctionComponent } from "react";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import RemoveButton from "../../RemoveButton/RemoveButton";
import editIcon from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import styles from './edit.module.scss';
import { SubcategoryResponse } from "../../../types/category";

interface SubcategoryProps {
    subcategory: SubcategoryResponse;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const Subcategory: FunctionComponent<SubcategoryProps> = ({ subcategory, onRemove, onEdit }) => (
    <div key={subcategory.Id} className={styles.subcategoryRow}>
        <div>{subcategory.subCategoryName}</div>
        <div className={styles.description}>{subcategory.description}</div>
        <img src={subcategory.imageSrc ? subcategory.imageSrc : defaultImage} alt={subcategory.subCategoryName} />
        <div>
            <ButtonWithIcon icon={editIcon} altText="Edit" style={styles.buttonEdit} onClick={() => onEdit(subcategory.Id)} />
            <RemoveButton onClick={() => onRemove(subcategory.Id)} style={styles.removeButton} />
        </div>
    </div>
);

export default Subcategory;