import React, { FormEvent, useCallback, useRef, useState } from "react";
import { ImageFile } from "../../../types/imageFile";
import { useAppSelector } from "../../../hooks/useRedux";
import UploadImages from "../../UploadImages/UploadImages";
import MarkDownEditor from "../../MarkDownEditor/MarkDownEditor";
import { SelectField } from "../../../utils/inputFields/SelectField";
import { TextInputField } from "../../../utils/inputFields/TextInputField";
import styles from "../../../styles/postContent.module.scss";
import CategoryFormProperty from "../../../types/categoryFormProperty";
import useFormikValues from "../../../hooks/useFormikValues";

const AddPostContent = () => {

    const { addNewValue } = useFormikValues();

    const [content, setContent] = useState<string>("");

    const windowSize = useRef(window.innerHeight / 2 - 82);
    const categories: CategoryFormProperty[] = useAppSelector((state) => state.data.blogCategories);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        if (files.length !== 0) {
            addNewValue({ images: files });
        }
    };

    const CategoryOptions = categories.map((category: CategoryFormProperty, key: number) => (
        <option value={category.id} key={key}>
            {category.categoryName}
        </option>
    ));

    const handleSelectChange = useCallback((e: FormEvent<HTMLSelectElement>): void => {
        addNewValue({ categoryId: (e.target as HTMLSelectElement).value });
    }, [addNewValue]);

    const handleContentChange = useCallback((newContent: string): void => {
        setContent(newContent);
        addNewValue({ context: newContent });
    }, [addNewValue]);

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
                        initialValue={''}
                    />
                    <MarkDownEditor
                        setContent={handleContentChange}
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
                        onChange={(e: React.FormEvent<HTMLSelectElement>) => handleSelectChange(e)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            width: '100%',
                            marginBottom: '10px',
                            height: '46px'
                        }}
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
