import { useCallback } from 'react';
import { processCategory } from '../utils/helpers/processCategory';
import CategoryFormProperty from '../types/categoryFormProperty';
import { SlugError } from '../errorHandler/slugError';
import { createFormData } from '../utils/helpers/createFormData';
import { handlePostRequest, handlePutRequest } from '../api/apiHandle';
import { UseFormError } from '../errorHandler/useFormError';

type SlugHandler<T> = (formData: FormData, values: T) => void;

const slugHandlers: Record<string, SlugHandler<any>> = {
    category: (formData, { properties }) => {
        console.log('category', properties);

        const categoryList = properties || [];
        categoryList.forEach((category: CategoryFormProperty, categoryIndex: number) => {
            processCategory(formData, category, categoryIndex);
        });
    },
    update: (formData, values) => {
        createFormData(values, formData);
    }
};

function useForm<T>(slug: string, post?: boolean) {
    const handleSubmit = useCallback(
        async (values: T) => {
            const formData = new FormData();

            const handler = slugHandlers[slug];
            if (handler) {
                handler(formData, values);
            } else {
                throw new SlugError(`Unsupported slug: ${slug}`);
            }

            try {
                if (post) {
                    await handlePostRequest<T>(slug, formData);
                } else {
                    await handlePutRequest<T>(slug, formData);
                }
            } catch (error) {
                throw new UseFormError(`Error handling form submission: ${error}`);
            }
        },
        [slug]
    );

    return {
        handleSubmit
    };
}

export default useForm;
