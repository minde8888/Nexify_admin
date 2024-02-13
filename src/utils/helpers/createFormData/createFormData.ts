type FormDataConvertible = File | Record<string, any>;

const isFile = (value: FormDataConvertible): value is File => value instanceof File;

const appendFileToFormData = (formData: FormData, key: string, value: File, customKey?: string): void => {
    formData.append(customKey || key, value);
};

const appendObjectToFormData = (formData: FormData, data: Record<string, any>, parentKey: string = ''): void => {
    for (const [key, value] of Object.entries(data)) {
        const currentKey = parentKey ? `${parentKey}[${key}]` : key;
        if (isFile(value)) {       
            const customKey = currentKey === 'itemsImages[0]' ? 'itemsImages' : 'images';          
            appendFileToFormData(formData, currentKey, value, customKey);
        } else if (typeof value === 'object' && value !== null) {
            appendObjectToFormData(formData, value, currentKey);
        } else {
            formData.append(currentKey, String(value));
        }
    }
};

export const createFormData = (data: Record<string, any>, formData: FormData): FormData => {
    appendObjectToFormData(formData, data);
    return formData;
};
