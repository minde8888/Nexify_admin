export const createFormData = (data: Record<string, any>, formData: FormData = new FormData(), parentKey = ''): FormData => {
    for (const [key, value] of Object.entries(data)) {
        const currentKey = parentKey ? `${parentKey}[${key}]` : key;

        if (value instanceof File) {            
            formData.append(parentKey === "images[0]" ? "images" : parentKey, value);
        } else if (typeof value === 'object' && value !== null) {
            createFormData(value, formData, currentKey);
        } else {
            formData.append(currentKey, String(value));
        }
    }

    return formData;
};
