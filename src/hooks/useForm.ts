import { useCallback, useState, useMemo } from 'react';
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
    const initialValues: T = useMemo(() => ({} as T), []); // Use useMemo to memoize initialValues
    const [formValues, setFormValues] = useState<T>(initialValues);

    const handleSubmit = useCallback(
        () => {
            const formData = new FormData();
            const handler = slugHandlers[slug];
            if (handler) {
                handler(formData, formValues);
            } else {
                throw new SlugError(`Unsupported slug: ${slug}`);
            }

            // submitCategory(formData, slug);
        },
        [slug, formValues]
    );

    const resetForm = useCallback(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    const handleChange = useCallback((newValues: T) => {
        setFormValues(newValues);
    }, []);

    return {
        initialValues,
        formValues,
        handleChange,
        handleSubmit,
        resetForm
    };
}

export default useForm;
