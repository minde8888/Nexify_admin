import { FunctionComponent } from "react";
import ButtonWithIcon from "../../../Buttons/ButtonWithIcon/ButtonWithIcon";
import editIcon from "../../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import CustomButton from "../../../Buttons/CustomButton/CustomButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from '../../../../styles/allPost.module.scss';
import { Attributes } from "../../../../types/attributes";

interface PostProps {
    attribute: Attributes;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const AttributeContext: FunctionComponent<PostProps> = ({ attribute, onRemove, onEdit }) => (
    <div key={attribute.id} className={styles.postRow}>
        <div className={styles.postInfo}>
            <h1 className={styles.title}>{attribute.attributeName}</h1>
            <LazyLoadImage
                className={styles.imagesContainer}
                src={attribute.imageName ?? defaultImage}
                alt={attribute.attributeName}
                effect="blur"
            />
            <div className={styles.buttons}>
                <ButtonWithIcon
                    icon={editIcon}
                    altText="Edit"
                    style={{ margin: '0' }}
                    onClick={() => attribute.id !== undefined ? onEdit(String(attribute.id)) : undefined}
                    id={String(attribute.id)}
                />

                <CustomButton
                    onClick={() => attribute.id !== undefined ? onRemove(String(attribute.id)) : undefined}
                    style={styles.removeButton}
                    symbol={'-'}
                    id={String(attribute.id)}
                />
            </div>
        </div>
    </div>
);

export default AttributeContext;
