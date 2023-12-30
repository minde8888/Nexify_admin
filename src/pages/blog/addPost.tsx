import { Form, Formik } from "formik";
import useForm from "../../hooks/useForm";
import { Post } from "../../types/post";
import {  BLOG_CATEGORIES_URL, BLOG_URL, POST_METHOD } from "../../constants/apiConst";
import styles from "../../styles/postContent.module.scss";
import AddPostContent from "../../components/PostContent/AddPosts/AddPostContent";
import validationSchema from "../../utils/validation/addPostValidationSchema";
import useFetchData from "../../hooks/useDataFetching";
import { useEffect } from "react";
import Preloader from "../preloader/preloader";

const AddPost = () => {
    const { handleSubmit, disabled } = useForm<Post>(POST_METHOD, BLOG_URL);
    const { loading, fetchData } = useFetchData(BLOG_CATEGORIES_URL);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Preloader isLoading={loading}>
            <Formik onSubmit={(values) => handleSubmit(values)} initialValues={{
                title: '',
                content: '',
                images: []
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
        </Preloader>
    );
};

export default AddPost;