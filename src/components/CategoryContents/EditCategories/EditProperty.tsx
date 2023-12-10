import { FunctionComponent } from "react";
import image from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import edit from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import { CategoryResponse } from "../../../types/category";
import styles from './edit.module.scss';

interface EditPropertyProps {
    categories: CategoryResponse[];
}

const EditProperty: FunctionComponent<EditPropertyProps> = ({ categories }) => {

    return (
        <div className={styles.editPropertyContainer}>
            {categories.map((category) => (
                <div key={category.categoryId} className={styles.categoryRow}>
                    <div className={styles.categoryInfo}>
                        <div>{category.categoryName}</div>
                        <div className={styles.description}>{category.description}</div>
                        <img src={category.imageSrc ? category.imageSrc : image} alt={category.categoryName} />
                        <div >
                            <div className={styles.buttonEdit}>
                                <button type="button" >
                                    <img src={edit} alt="Alt_text" />
                                </button>
                            </div>
                            <div className={styles.removeButton}>
                                <button type="button" className={styles.removeButton}>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    {category.subcategories && (
                        <div className={styles.subcategoryContainer}>
                            {category.subcategories.map((subcategory) => (
                                <div key={subcategory.subCategoryId} className={styles.subcategoryRow}>
                                    <div>{subcategory.subCategoryName}</div>
                                    <div className={styles.description}>{subcategory.description}</div>
                                    <img src={subcategory.imageSrc ? subcategory.imageSrc : image} alt={subcategory.subCategoryName} />
                                    <div >
                                        <div className={styles.buttonEdit}>
                                            <button type="button" >
                                                <img src={edit} alt="Alt_text" />
                                            </button>
                                        </div>
                                        <div className={styles.removeButton}>
                                            <button type="button" className={styles.removeButton}>
                                                -
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EditProperty;