import { useEffect } from "react";
import { ImageFile } from "../../../types/imageFile";
import UploadImages from "../../UploadImages/UploadImages";
import { TextInputField } from "../../InputFields/TextInputField";
import useFormikValues from "../../../hooks/useFormikValues";
import EnhancedMdxEditorComponent from "../../MarkDownEditor/EnhancedMdxEditorComponent";
import { CategoryResponse } from "../../../types/category";
import styles from "../../../styles/postContent.module.scss";
import { CheckboxField } from "../../InputFields/CheckboxField";
import { useCheckboxContext } from "../../Context/CheckboxProvider";

interface AddPostContentProps {
    setContent: (Content: string) => void;
    content: string;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categories?: CategoryResponse[];
}

const AddPostContent = ({
    setContent,
    content,
    resetImages,
    setResetImages,
    categories
}: AddPostContentProps) => {

    const { addNewValue } = useFormikValues();

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