import { useEffect } from "react";
import { ImageFile } from "../../../types/imageFile";
import UploadImages from "../../UploadImages/UploadImages";
import { TextInputField } from "../../InputFields/TextInputField";
import useFormikValues from "../../../hooks/useFormikValues";
import { CategoryResponse } from "../../../types/category";
import { CheckboxField } from "../../InputFields/CheckboxField";
import styles from "../../../styles/edit.module.scss";
import imageStyles from '../../../styles/uploadImages.module.scss';

interface AddPostContentProps {
    setContent: (Content: string) => void;
    content: string;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categories?: CategoryResponse[];
    checkedCategories: { [key: string]: boolean };
    componentKey: number;
    lastRequestStatus:boolean;
}

const AddAttributesContent = ({
    setContent,
    content,
    resetImages,
    setResetImages,
    categories,
    checkedCategories,
    componentKey,
    lastRequestStatus
}: AddPostContentProps) => {

    const { addNewValue } = useFormikValues();    

    const handleAction = () => {
        addNewValue({ categoriesIds: Object.keys(checkedCategories).filter(key => checkedCategories[key]), content });
    };

    useEffect(() => {
        handleAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, checkedCategories]);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        addNewValue({ images: files.map(file => file.file) });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputField}>
                <TextInputField
                    label="Title"
                    className={styles.titleField}
                    name="title"
                    id="title"
                    initialValue={''}
                />
            </div>
            <div className={styles.images}>
                <UploadImages
                    getImages={getImagesData}
                    maxNumber={1}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                    styleDrop={styles.clickDrop}
                    styles={imageStyles}
                />
            </div>
            <div className={`${styles.columns} ${styles.checkboxContainer}`}>
                {categories?.map((category) => (
                    <CheckboxField
                        key={category.id}
                        name={category.id}
                        label={category.title}
                        className={styles.checkbox}
                    />
                ))}
            </div>
            <div className={styles.buttonPublic}>
                <button disabled={lastRequestStatus} type="submit">
                    Public
                </button>
            </div>

        </div>
    );
};

export default AddAttributesContent;