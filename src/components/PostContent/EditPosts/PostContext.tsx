import { FunctionComponent } from "react";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import RemoveButton from "../../RemoveButton/RemoveButton";
import editIcon from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import styles from './editPost.module.scss';
import { Post } from "../../../types/post";

interface PostProps {
    post: Post;
    // onRemove: (id: string) => void;
    // onEdit: (id: string) => void;
}

const PostContext: FunctionComponent<PostProps> = ({ post}) => (
    <div key={post.postId} className={styles.postRow}>
        <div className={styles.postInfo}>
            <div>{post.title}</div>
            <div className={styles.description}>{post.content}</div>
            <img src={Array.isArray(post.imageSrc) ? post.imageSrc[0] : post.imageSrc || defaultImage} alt={post.title} />
            <div>
                {/* <ButtonWithIcon icon={editIcon} altText="Edit" style={styles.buttonEdit} onClick={() => onEdit(category.categoryId)} />
                <RemoveButton onClick={() => onRemove(category.categoryId)} style={styles.removeButton} /> */}
            </div>
        </div>
    </div>
);

export default PostContext;
