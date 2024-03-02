import { FunctionComponent } from "react";
import ButtonWithIcon from "../Buttons/ButtonWithIcon/ButtonWithIcon";
import Subcategories from "../CategoryContent/AllCategories/Subcategories/Subcategories";
import editIcon from "../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import MDXToHTMLConverter from "../MDXToHTMLConverter/MDXToHTMLConverter";
import { SubcategoryResponse } from "../../types/category";
import DataType from "../../types/dataType";
import styles from '../../styles/allCategories.module.scss';

interface EditProps {
    data: DataType;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const EditComponent: FunctionComponent<EditProps> = ({ data, onRemove, onEdit }) => (
    <>
        <div key={data.id} className={styles.categoryRow} data-testid={'data-item'}>
            <div className={styles.categoryInfo}>
                <div className={styles.title}>{data.title}</div>
                <div className={styles.description}>
                    {data.description && <MDXToHTMLConverter mdxString={data.description} />}
                </div>
                <LazyLoadImage
                    className={styles.imagesContainer}
                    src={data.imageSrc ? data.imageSrc : defaultImage}
                    alt={data.title}
                    effect="blur"
                />
                <div className={styles.buttons}>
                    <ButtonWithIcon icon={editIcon} altText="Edit" onClick={() => onEdit(data.id)} style={{ margin: '0' }} id={data.id} />
                    <CustomButton onClick={() => onRemove(data.id)} style={styles.removeButton} symbol={'-'} id={data.id} />
                </div>
            </div>
            {data.subcategories && <Subcategories
                subcategories={data.subcategories as unknown as SubcategoryResponse[]}
                onRemove={onRemove}
                onEdit={onEdit} />}
        </div>

    </>
);

export default EditComponent;
