import React, { FormEvent, useCallback, useRef } from "react";
import { ImageFile } from "../../../types/imageFile";
import { useAppSelector } from "../../../hooks/useRedux";
import UploadImages from "../../UploadImages/UploadImages";
import MarkDownEditor from "../../MarkDownEditor/MarkDownEditor";
import { SelectField } from "../../InputFields/SelectField";
import { TextInputField } from "../../InputFields/TextInputField";
import styles from "../../../styles/postContent.module.scss";
import CategoryFormProperty from "../../../types/categoryFormProperty";
import useFormikValues from "../../../hooks/useFormikValues";

interface AddPostContentProps {
    setContent: (Content: string) => void;
    content: string;
    setSelectValue: (value: string) => void;
    selectValue: string;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
}

const AddPostContent = ({
    setContent,
    content,
    setSelectValue,
    selectValue,
    resetImages,
    setResetImages
}: AddPostContentProps) => {

    const { addNewValue } = useFormikValues();

    const windowSize = useRef(window.innerHeight / 2 - 82);

    const categories: CategoryFormProperty[] = useAppSelector((state) => state.data.blogCategories);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        if (files.length !== 0) {
            addNewValue({ images: files.map(file => file.file) });
        }
    };

    const CategoryOptions = categories.map((category: CategoryFormProperty, key: number) => (
        <option value={category.id} key={key}>
            {category.categoryName}
        </option>
    ));

    const handleSelectChange = useCallback((e: FormEvent<HTMLSelectElement>): void => {
        const selectedValue = (e.target as HTMLSelectElement).value;
        setSelectValue(selectedValue)
    }, [setSelectValue]);

    const handleContentChange = useCallback((newContent: string): void => {
        setContent(newContent);
        addNewValue({ content: newContent });
    }, [addNewValue, setContent]);

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={styles.columns}>
                    <UploadImages
                        getImages={getImagesData}
                        maxNumber={1}
                        resetImages={resetImages}
                        setResetImages={setResetImages} />
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
                        value={selectValue}
                        name="id"
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
                        <option value={"default"}>Choose Category</option>
                        {CategoryOptions}
                    </SelectField>
                </div>
            </div>
        </div>
    );
};

export default AddPostContent;
