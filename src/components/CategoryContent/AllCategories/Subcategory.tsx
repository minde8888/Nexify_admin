import { FunctionComponent } from "react";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import editIcon from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import { SubcategoryResponse } from "../../../types/category";
import styles from './allCategories.module.scss';
import CustomButton from "../../Buttons/CustomButton";

interface SubcategoryProps {
    subcategory: SubcategoryResponse;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const Subcategory: FunctionComponent<SubcategoryProps> = ({ subcategory, onRemove, onEdit }) => (
    <div key={subcategory.id} className={styles.subcategoryRow}>
        <div>{subcategory.categoryName}</div>
        <div className={styles.description}>{subcategory.description}</div>
        <img className={styles.imagesContainer} src={subcategory.imageSrc ? subcategory.imageSrc : defaultImage} alt={subcategory.categoryName} />
        <div className={styles.buttons}>
            <ButtonWithIcon icon={editIcon} altText="Edit" onClick={() => onEdit(subcategory.id)} style={{ margin: '0' }} />
            <CustomButton onClick={() => onRemove(subcategory.id)} style={styles.removeButton} symbol={'-'}/>
        </div>
    </div>
);

export default Subcategory;