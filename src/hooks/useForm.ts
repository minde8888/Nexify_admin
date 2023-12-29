import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UseFormError } from '../errorHandler/useFormError';
import CategoryFormProperty from '../types/categoryFormProperty';
import { processCategory } from '../utils/helpers/processCategory';
import { createFormData } from '../utils/helpers/createFormData';
import { postAction, putAction } from '../redux/actions/actions';

type MethodHandler<T> = (formData: FormData, values: T) => void;

const postHandler: MethodHandler<any> = (formData, values) => {
    const categoryList = values.properties || [];
    if (categoryList.length !== 0) {        
        categoryList.forEach((category: CategoryFormProperty, categoryIndex: number) => {
            processCategory(formData, category, categoryIndex);
        });
    } else {
        createFormData(values, formData);
    }
};

const putHandler: MethodHandler<any> = (formData, values) => {
    createFormData(values, formData);
};

function useForm<T>(method: string, url: string, post?: boolean, bool?: boolean) {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = useCallback(
        async (values: T) => {
            const formData = new FormData();
            setDisabled(true);

            const handler = post ? postHandler : putHandler;

            if (handler) {
                handler(formData, values);
            } else {
                throw new UseFormError(`Unsupported method: ${method}`);
            }

            try {
                const action = post ? postAction(formData, url) : putAction(formData, values, url);
                dispatch(action);
                setDisabled(false);
            } catch (error) {
                throw new UseFormError(`Error handling form submission: ${error}`);
            }
        },
        [dispatch, method, post, url]
    );

    return {
        handleSubmit,
        disabled
    };
}

export default useForm;
