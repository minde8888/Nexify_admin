import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UseFormError } from '../errorHandler/useFormError';
import CategoryFormProperty from '../types/categoryFormProperty';
import { processAttribute, processCategory } from '../utils/helpers/processData/processData';
import { createFormData } from '../utils/helpers/createFormData/createFormData';
import { postAction, putAction } from '../redux/actions/actions';
import { Attributes } from '../types/attributes';

type MethodHandler<T> = (formData: FormData, values: T) => Promise<void>;

const postHandler: MethodHandler<any> = async (formData, values) => {
    const list = values.properties || [];
    if (Object.keys(values).includes('categoryName')) {
        await Promise.all(list.map((category: CategoryFormProperty, categoryIndex: number) => processCategory(formData, category, categoryIndex, values.categoryId)));
    } else if (Object.keys(values).includes('attributeName')) {
        await Promise.all(list.map((data: Attributes, categoryIndex: number) => processAttribute(formData, data, categoryIndex)));
    } else {
        createFormData(values, formData);
    }
};

const putHandler: MethodHandler<any> = async (formData, values) => {
    createFormData(values, formData);
};

function useForm<T>(method: string, url: string) {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = useCallback(
        async (values: T, { resetForm }: { resetForm: () => void }) => {
            const formData = new FormData();
            const handler = method === 'post' ? postHandler : putHandler;

            if (handler) {
                try {
                    setDisabled(true);
                    await handler(formData, values);
                } catch (error) {
                    throw new UseFormError(`Error handling form submission: ${error}`);
                } finally {
                    setDisabled(false);
                    resetForm();
                }
            } else {
                throw new UseFormError(`Unsupported method: ${method}`);
            }

            try {
                const action = method === 'post' ? postAction(formData, url) : putAction(formData, values, url);
                dispatch(action);
            } catch (error) {
                throw new UseFormError(`Error dispatching action: ${error}`);
            }
        },
        [dispatch, method, url]
    );

    return {
        handleSubmit,
        disabled
    };
}

export default useForm;
