import { FunctionComponent } from "react";
import ButtonWithIcon from "../../../Buttons/ButtonWithIcon/ButtonWithIcon";
import Subcategories from "../Subcategories/Subcategories";
import { CategoryResponse } from "../../../../types/category";
import editIcon from "../../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import CustomButton from "../../../Buttons/CustomButton/CustomButton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import MDXToHTMLConverter from "../../../MDXToHTMLConverter/MDXToHTMLConverter";
import styles from '../allCategories.module.scss';

interface CategoryProps {
    category: CategoryResponse;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const Category: FunctionComponent<CategoryProps> = ({ category, onRemove, onEdit }) => (
    <div key={category.id} className={styles.categoryRow} data-testid={'category-item'}>
        <div className={styles.categoryInfo}>
            <div className={styles.title}>{category.categoryName}</div>
            <div className={styles.description}>
                {category.description && <MDXToHTMLConverter mdxString={category.description} />}
            </div>
            <LazyLoadImage
                className={styles.imagesContainer}
                src={category.imageSrc ? category.imageSrc : defaultImage}
                alt={category.categoryName}
                effect="blur"
            />
            <div className={styles.buttons}>
                <ButtonWithIcon icon={editIcon} altText="Edit" onClick={() => onEdit(category.id)} style={{ margin: '0' }} id={category.id}/>
                <CustomButton onClick={() => onRemove(category.id)} style={styles.removeButton} symbol={'-'} id={category.id}/>
            </div>
        </div>
        {category.subcategories && <Subcategories
            subcategories={category.subcategories}
            onRemove={onRemove}
            onEdit={onEdit} />}
    </div>
);

export default Category;
