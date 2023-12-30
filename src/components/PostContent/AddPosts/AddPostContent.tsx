import React, { FormEvent, useRef, useState } from "react";
import { ImageFile } from "../../../types/imageFile";
import { useAppSelector } from "../../../hooks/useRedux";
import UploadImages from "../../UploadImages/UploadImages";
import MarkDownEditor from "../../MarkDownEditor/MarkDownEditor";
import { SelectField } from "../../../utils/inputFields/SelectField";
import { TextInputField } from "../../../utils/inputFields/TextInputField";
import styles from "../../../styles/postContent.module.scss";
import CategoryFormProperty from "../../../types/categoryFormProperty";

const AddPostContent = () => {
    const [images, setImages] = useState<Array<ImageFile>>([]);
    const [content, setContent] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const windowSize = useRef(window.innerHeight / 2 - 82);
    const categories: CategoryFormProperty[] = useAppSelector((state) => state.data.blogCategories);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        if (files.length !== 0) {
            setImages(files);
        }
    };

    const CategoryOptions = categories.map((category: CategoryFormProperty, key: number) => {

        return (
            <option value={category.id} key={key}>
                {category.categoryName}
            </option>
        );
    });

    const handleSelectChange = (e: FormEvent<HTMLSelectElement>): void => {
        setValue((e.target as HTMLSelectElement).value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={styles.columns}>
                    <UploadImages getImages={getImagesData} maxNumber={1} />
                </div>
                <div className={styles.columns}>
                    <TextInputField
                        label="Title"
                        className={styles.profileInput}
                        name="title"
                        id="title"
                    />
                    <MarkDownEditor
                        setContent={setContent}
                        content={content}
                        showEditor={true}
                        width="100%"
                        editorHeight={windowSize.current}
                    />
                </div>
                <div className={styles.columns}>
                    <SelectField
                        name="categories"
                        as="select"
                        value={value}
                        onChange={(e: React.FormEvent<HTMLSelectElement>) => handleSelectChange(e)}
                    >
                        <option>Choose Category</option>
                        {CategoryOptions}
                    </SelectField>
                </div>
            </div>
        </div>
    );
};

export default AddPostContent;
