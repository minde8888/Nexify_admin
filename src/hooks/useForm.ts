import { useCallback } from 'react';
import { submitCategory } from '../api/categoryAPI';
import { processCategory } from '../utils/helpers/processCategory';
import CategoryFormProperty from '../types/categoryFormProperty';
import { SlugError } from '../errorHandler/slugError';
import { createFormData } from '../utils/helpers/createFormData';

type SlugHandler<T> = (formData: FormData, values: T) => void;

const slugHandlers: Record<string, SlugHandler<any>> = {
    category: (formData, values) => {
        console.log('category', values);
        
        const categoryList = values.properties || [];
        categoryList.forEach((category: CategoryFormProperty, categoryIndex: number) => {
            processCategory(formData, category, categoryIndex);
        });
    },
    update: (formData, values) => {
        createFormData(values, formData);
    }
};

function useForm<T>(slug: string) {
    const initialValues: T = {} as T;

    const handleSubmit = useCallback(
        (values: T) => {
            const formData = new FormData();

            const handler = slugHandlers[slug];
            if (handler) {
                handler(formData, values);
            } else {
                throw new SlugError(`Unsupported slug: ${slug}`);
            }
            console.log(Object.fromEntries(formData));
            // submitCategory(formData, slug);
        },
        [slug]
    );

    return {
        initialValues,
        handleSubmit
    };
}

export default useForm;
