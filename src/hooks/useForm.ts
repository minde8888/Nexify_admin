import { useCallback } from 'react';
import { submitCategory } from '../api/categoryAPI';
import { processCategory } from '../utils/helpers/processCategory';
import CategoryFormProperty from '../types/categoryFormProperty';
import { SlugError } from '../errorHandler/slugError';

type SlugHandler<T> = (formData: FormData, values: T) => void;

const slugHandlers: Record<string, SlugHandler<any>> = {
    category: (formData, values) => {
        const categoryList = values.properties || [];
        categoryList.forEach((category: CategoryFormProperty, categoryIndex: number) => {
            processCategory(formData, category, categoryIndex);
        });
    },
    update: (formData, values) => {
        console.log('====================================');
        console.log('values', values);
        console.log('====================================');
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
