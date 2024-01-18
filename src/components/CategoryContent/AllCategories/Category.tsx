import { FunctionComponent } from "react";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import Subcategories from "./Subcategories";
import { CategoryResponse } from "../../../types/category";
import editIcon from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import styles from './allCategories.module.scss';
import CustomButton from "../../Buttons/CustomButton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
            <LazyLoadImage
                className={styles.imagesContainer}
                src={category.imageSrc ? category.imageSrc : defaultImage}
                alt={category.categoryName}
                effect="blur"
            />
            <div className={styles.buttons}>
                <ButtonWithIcon icon={editIcon} altText="Edit" onClick={() => onEdit(category.id)} style={{ margin: '0' }} />
                <CustomButton onClick={() => onRemove(category.id)} style={styles.removeButton} symbol={'-'} />
            </div>
        </div>
        {category.subcategories && <Subcategories
            subcategories={category.subcategories}
            onRemove={onRemove}
            onEdit={onEdit} />}
    </div>
);

export default Category;
