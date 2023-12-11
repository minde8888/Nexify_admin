import { FunctionComponent, useState } from "react";
import { CategoryResponse, SubcategoryResponse } from "../../../types/category";
import Category from "./Category";
import { Modal } from "../../Modal/Modal";
import styles from './edit.module.scss';
import MarkDownEditor from "../../MarkDownEditor/MarkDownEditor";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { useModal } from "../../../hooks/useModel";
import { TextInputField } from "../../../utils/validation/TextInputField";
import UploadImage from "../../UploadImage/UploadImage";
import PropertyImagePreview from "../../PropertyImagePreview/PropertyImagePreview";

interface EditPropertyProps {
    categories: CategoryResponse[];
    dispatch: Dispatch<AnyAction>;
}

const EditProperty: FunctionComponent<EditPropertyProps> = ({ categories }) => {

    const [content, setContent] = useState<string>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

    const { isOpen, toggle } = useModal();
    const onCancel = () => toggle();

    const handleEdit = (id: string) => {
        toggle();
        const category = findCategoryById(id, Object.values(categories));
        const subcategory = findSubcategoryById(id, Object.values(categories));
        if (category) {

        }
        if (subcategory) {

        }
    };


    const onRemove = (id: string) => {
        console.log(id);
        // Add logic for removing category or subcategory
    };


    return (
        <div className={styles.editPropertyContainer}>
            <Modal isOpen={isOpen} toggle={toggle}>
                <div className={styles.closeModalButton}>
                    <button data-testid="test-close-id" onClick={onCancel} type="button">
                        ❌
                    </button>
                    <div>
                        <TextInputField
                            name={"Title"}
                            className=""
                            label="Title"
                            id={''}
                        />
                        <MarkDownEditor
                            content={content}
                            setContent={setContent}
                            showEditor={true}
                        />
                        <UploadImage
                            setImagePreviewUrl={setImagePreviewUrl}
                        />
                        <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
                    </div>
                </div>
            </Modal>
            {Object.values(categories).map(category => (
                <Category
                    key={category.categoryId}
                    category={category}
                    onEdit={handleEdit}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default EditProperty;

const findCategoryById = (categoryId: string, categories: CategoryResponse[]): CategoryResponse | undefined => {
    return categories.find(category => category.categoryId === categoryId);
};

const findSubcategoryById = (subCategoryId: string, categories: CategoryResponse[]): SubcategoryResponse | undefined => {
    const allSubcategories = categories.flatMap(category => category.subcategories || []);
    return allSubcategories.find(subcategory => subcategory.subCategoryId === subCategoryId);
};