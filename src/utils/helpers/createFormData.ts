export const createFormData = (data: Record<string, any>, formData: FormData, parentKey = ''): FormData => {
    for (const [key, value] of Object.entries(data)) {
      
        const currentKey = parentKey ? `${parentKey}[${key}]` : key;

        if (value instanceof File) {
            formData.append('images', value);
        } else if (typeof value === 'object' && value !== null) {
            createFormData(value, formData, currentKey);
        } else {
            formData.append(currentKey, String(value));
        }
    }

    return formData;
};


