import { useEffect } from "react";
import { ImageFile } from "../../../types/imageFile";
import UploadImages from "../../UploadImages/UploadImages";
import { TextInputField } from "../../InputFields/TextInputField";
import useFormikValues from "../../../hooks/useFormikValues";
import EnhancedMdxEditorComponent from "../../MarkDownEditor/EnhancedMdxEditorComponent";
import { CategoryResponse } from "../../../types/category";
import styles from "../../../styles/postContent.module.scss";
import { CheckboxField } from "../../InputFields/CheckboxField";

interface AddPostContentProps {
    setContent: (Content: string) => void;
    content: string;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categories?: CategoryResponse[];
    checkedCategories: { [key: string]: boolean };
    componentKey: number;   
}

const AddPostContent = ({
    setContent,
    content,
    resetImages,
    setResetImages,
    categories,
    checkedCategories,
    componentKey
}: AddPostContentProps) => {

    const { addNewValue } = useFormikValues();

    const handleAction = () => {

        const checkedCategoryIds = Object.entries(checkedCategories)
            .filter(([_, checked]) => checked)
            .map(([categoryId, _]) => categoryId);

        addNewValue({ categoryId: checkedCategoryIds, content });
    };

    useEffect(() => {

        handleAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, checkedCategories]);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {

        if (files.length !== 0) {
            addNewValue({ images: files.map(file => file.file) });
        }
    };
    // log(checkedCategories)
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
                    <EnhancedMdxEditorComponent
                        content={content}
                        setContent={setContent}
                        width='95%'
                        componentKey={componentKey}
                    />
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