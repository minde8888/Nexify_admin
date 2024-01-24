import { FunctionComponent } from "react";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import editIcon from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import { Post } from "../../../types/post";
import CustomButton from "../../Buttons/CustomButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from './allPost.module.scss';
import MDXToHTMLConverter from "../../MDXToHTMLConverter/MDXToHTMLConverter";


interface PostProps {
    post: Post;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const PostContext: FunctionComponent<PostProps> = ({ post, onRemove, onEdit }) => (
    <div key={post.id} className={styles.postRow}>
        <div className={styles.postInfo}>
            <div>{post.title}</div>
            <div className={styles.description}>
                {post.content && <MDXToHTMLConverter mdxString={post.content} />}
            </div>
            <LazyLoadImage
                className={styles.imagesContainer}
                src={Array.isArray(post.imageSrc) ? post.imageSrc[0] : post.imageSrc || defaultImage}
                alt={post.title}
                effect="blur"
            />
            <div className={styles.buttons}>
                <ButtonWithIcon icon={editIcon} altText="Edit" style={{ margin: '0' }} onClick={() => onEdit(post.id)} />
                <CustomButton onClick={() => onRemove(post.id)} style={styles.removeButton} symbol={'-'} />
            </div>
        </div>
    </div>
);

export default PostContext;
