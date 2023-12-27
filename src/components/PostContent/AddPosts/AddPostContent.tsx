import { useRef, useState } from "react";
import { TextInputField } from "../../../utils/inputFields/TextInputField";
import MarkDownEditor from "../../MarkDownEditor/MarkDownEditor";
import { ImageFile } from "../../../types/imageFile";
import UploadImages from "../../UploadImages/UploadImages";
import styles from "../../../styles/postContent.module.scss";

const AddPostContent = () => {
    const [images, setImages] = useState<Array<ImageFile>>([]);
    const [content, setContent] = useState<string>('');
    const windowSize = useRef(window.innerHeight / 2 - 82);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        if (files.length !== 0) {
            setImages(files);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.items}>
                    <div className={styles.columns}>
                        <UploadImages getImages={getImagesData} maxNumber={1} />
                    </div>
                    <div className={styles.columns}>
                        <TextInputField label="Title" className={styles.profileInput} name="title" id='title' />
                        <MarkDownEditor
                            setContent={setContent}
                            content={content}
                            showEditor={true}
                            width="100%"
                            editorHeight={windowSize.current}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddPostContent;