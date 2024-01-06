import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useModal } from '../../../hooks/useModel';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import { deleteAction } from '../../../redux/actions/actions';
import { useAppDispatch } from '../../../hooks/useRedux';
import { Post } from '../../../types/post';
import PostContext from './PostContext';

interface EditPostPropertyProps {
    posts: Post[];
    disabled: boolean;
    URL: string;
}

const EditPostProperty: FunctionComponent<EditPostPropertyProps> = ({ posts, disabled, URL }) => {
    const dispatch = useAppDispatch();
    const { isOpen, toggle } = useModal();

    const [content, setContent] = useState<string>('');
    const [file, setFile] = useState<ImageFile[]>([]);

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [values, setValues] = useState<CategoryFormProperty>({
        id: '',
        categoryName: '',
        description: '',
        accept: true
    });

    const { addNewValue } = useFormikValues();

    useEffect(() => {
        addNewValue({
            id: values.id,
            description: content,
            image: file,
            accept: values.accept,
            imageSrc: imagePreviewUrl
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.id, content, file, values.accept]);

    // const handleEdit = useCallback((id: string) => {
    //     toggle();

    //     const category = findCategoryById(id, categories);
    //     const subcategory = findSubcategoryById(id, categories);
    //     const updatedValues: CategoryFormProperty = {
    //         id: category?.categoryId || subcategory?.subCategoryId || '',
    //         categoryName: category?.categoryName || subcategory?.subCategoryName || '',
    //         description: category?.description || subcategory?.description || '',
    //         imageSrc: category?.imageSrc || subcategory?.imageSrc || '',
    //         accept: category ? true : false
    //     };
    //     addNewValue({ categoryName: updatedValues.categoryName ?? '' });
    //     setImagePreviewUrl(updatedValues.imageSrc || '');
    //     setValues(updatedValues);
    //     setContent(updatedValues.description || '');
    // }, [toggle, categories, addNewValue]);

    const onRemove = useCallback((id: string) => {
        dispatch(deleteAction(URL, id))
    }, [URL, dispatch]);

    const handleAddImage = useCallback((newFile: ImageFile[]) => {
        setFile(newFile);
    }, []);

    const handleCancel = useCallback(() => {
        toggle();
    }, [toggle]);

    return (
        <div className={'styles.editPropertyContainer'}>
            {/* <EditPropertyModal
        isOpen={isOpen}
        toggle={toggle}
        onCancel={handleCancel}
        content={content}
        setContent={setContent}
        categoryName={values.categoryName}
        handleAddImage={handleAddImage}
        setImagePreviewUrl={setImagePreviewUrl}
        imagePreviewUrl={imagePreviewUrl}
        disabled={disabled}
      /> */}
            {Object.values(posts).map((post, index) => (
                <PostContext
                    key={index}
                    post={post}
                    // onEdit={handleEdit}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default EditPostProperty;
