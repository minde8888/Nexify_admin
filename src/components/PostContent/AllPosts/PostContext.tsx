import { FunctionComponent } from "react";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import RemoveButton from "../../Buttons/CustomButton";
import editIcon from "../../../assets/svg/edit document_edit file_edited_editing_icon.svg";
import defaultImage from "../../../assets/svg/gallery_image_photo_photography_picture_icon.svg";
import { Post } from "../../../types/post";
import styles from './allPost.module.scss';
import CustomButton from "../../Buttons/CustomButton";

interface PostProps {
    post: Post;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

const PostContext: FunctionComponent<PostProps> = ({ post, onRemove, onEdit }) => (
    <div key={post.id} className={styles.postRow}>
        <div className={styles.postInfo}>
            <div>{post.title}</div>
            <div className={styles.description}>{post.content}</div>
            <img src={Array.isArray(post.imageSrc) ? post.imageSrc[0] : post.imageSrc || defaultImage} alt={post.title} />
            <div>
                <ButtonWithIcon icon={editIcon} altText="Edit" style={{ justifyContent: 'center' }} onClick={() => onEdit(post.id)} />
                <CustomButton onClick={() => onRemove(post.id)} style={styles.removeButton} symbol={'-'}/>
            </div>
        </div>
    </div>
);

export default PostContext;
