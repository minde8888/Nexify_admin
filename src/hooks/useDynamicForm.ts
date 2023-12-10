import { useCallback } from 'react';
import DynamicFormProperty from '../types/categoryFormProperty';
import { submitCategory } from '../api/categoryAPI';
import { processCategory } from '../utils/helpers/processCategory';

function useDynamicForm() {
    
    const initialValues: DynamicFormProperty = {
        categoryName: '',
        properties: [],
        id: '',
        description: '',
        image: [],
        '': ''
    };

    const handleSubmit = useCallback((values: DynamicFormProperty, slug: string = '') => {

        const formData = new FormData();
        const categoryList = values.properties || [];

        categoryList.forEach((category, categoryIndex) => {
            processCategory(formData, category, categoryIndex);
        });
        submitCategory(formData, slug);
    }, []);

    return {
        initialValues,
        handleSubmit
    };
}

export default useDynamicForm;
