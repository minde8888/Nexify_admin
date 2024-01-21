import { FormEvent, useCallback, useEffect, useState } from "react";
import { ImageFile } from "../../../types/imageFile";
import UploadImages from "../../UploadImages/UploadImages";
import { TextInputField } from "../../InputFields/TextInputField";
import useFormikValues from "../../../hooks/useFormikValues";
import EnhancedMdxEditorComponent from "../../MarkDownEditor/EnhancedMdxEditorComponent";
import { CategoryResponse } from "../../../types/category";
import SelectOptions from "../../SelectOptions/SelectOptions";
import styles from "../../../styles/postContent.module.scss";
import { CheckboxField } from "../../InputFields/CheckboxField";
import { useCheckboxContext } from "../../Context/CheckboxProvider";
import { useSelectFieldContext } from "../../Context/SelectFieldContext";

interface AddPostContentProps {
    setContent: (Content: string) => void;
    content: string;
    // setSelectValue: (value: string) => void;
    // selectValue: string;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categories?: CategoryResponse[];
}

const AddPostContent = ({
    setContent,
    content,
    // setSelectValue,
    // selectValue,
    resetImages,
    setResetImages,
    categories
}: AddPostContentProps) => {

    const { addNewValue } = useFormikValues();

    const { selectValue } = useSelectFieldContext();

    const { checkedCategories } = useCheckboxContext();

    const handleAction = () => {

        const checkedCategoryIds = Object.entries(checkedCategories)
            .filter(([_, checked]) => checked)
            .map(([categoryId, _]) => categoryId);

        addNewValue({ categoryId: checkedCategoryIds });
    };

    useEffect(() => {
        addNewValue({ content });
        handleAction();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {

        if (files.length !== 0) {
            addNewValue({ images: files.map(file => file.file) });
        }
    };

    const optionStyles = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '100%',
        marginBottom: '10px',
        height: '46px'
    }

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={styles.columns}>
                    <UploadImages
                        getImages={getImagesData}
                        maxNumber={1}
                        resetImages={resetImages}
                        setResetImages={setResetImages}
                    />
                </div>
                <div className={styles.columns}>
                    <TextInputField
                        label="Title"
                        className={styles.profileInput}
                        name="title"
                        id="title"
                        initialValue={''}
                    />
                    <EnhancedMdxEditorComponent content={content} setContent={setContent} width='95%' />
                </div>
                <div className={styles.columns}>
                    <SelectOptions
                        options={categories}
                        displayKey="categoryName"
                        styles={optionStyles}
                        name={"categoryId"}
                    />
                    {categories?.map((category) => (
                        <CheckboxField
                            key={category.id}
                            name={category.id}
                            label={category.categoryName}
                            className={styles.checkbox}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddPostContent;
