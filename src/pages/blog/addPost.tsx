import { Form, Formik } from "formik";
import useForm from "../../hooks/useForm";
import { Post } from "../../types/post";
import { POSTS_URL, POST_METHOD } from "../../constants/apiConst";
import styles from "../../styles/postContent.module.scss";
import AddPostContent from "../../components/PostContent/AddPosts/AddPostContent";
import validationSchema from "../../utils/validation/addPostValidationSchema";

const AddPost = () => {
    const { handleSubmit, disabled } = useForm<Post>(POST_METHOD, POSTS_URL);
    return (
        <Formik onSubmit={(values) => handleSubmit(values)} initialValues={{
            title: '',
            content: '',
            image: []
        }}
        validationSchema={validationSchema}
        >
            <Form >
                <h2>Add Post</h2>
                <AddPostContent />
                <div className={styles.saveButton}>
                    <button disabled={disabled} type="submit">
                        Save
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddPost;