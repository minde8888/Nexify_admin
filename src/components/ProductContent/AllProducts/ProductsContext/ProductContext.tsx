import { FunctionComponent } from "react";
import ButtonWithIcon from "../../../Buttons/ButtonWithIcon/ButtonWithIcon";
import editIcon from "../../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import CustomButton from "../../../Buttons/CustomButton/CustomButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MDXToHTMLConverter from "../../../MDXToHTMLConverter/MDXToHTMLConverter";
import styles from '../../../../styles/allPost.module.scss';
import { Product } from "../../../../types/product";

interface ProductProps {
    product: Product;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const ProductContext: FunctionComponent<ProductProps> = ({ product, onRemove, onEdit }) => (
    <div key={product.id} className={styles.postRow}>
        <div className={styles.postInfo}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.description}>
                {product.content && <MDXToHTMLConverter mdxString={product.content} />}
            </div>
            <LazyLoadImage
                className={styles.imagesContainer}
                src={Array.isArray(product.imageSrc) ? product.imageSrc[0] : product.imageSrc || defaultImage}
                alt={product.title}
                effect="blur"
            />
            <div className={styles.categories}>
                <h4>Categories</h4>
                {product.categories && product.categories.map((category, index) => <div className={styles.category} key={index}>{category.categoryName}</div>)}
            </div>
            <div className={styles.buttons}>
                <ButtonWithIcon icon={editIcon} altText="Edit" style={{ margin: '0' }} onClick={() => onEdit(product.id)} id={product.id} />
                <CustomButton onClick={() => onRemove(product.id)} style={styles.removeButton} symbol={'-'} id={product.id} />
            </div>
        </div>
    </div>
);

export default ProductContext;
