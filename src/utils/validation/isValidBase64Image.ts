type Base64ImageString = string;

export const isValidBase64Image = (imageString: Base64ImageString): boolean => {
    const base64ImagePattern = /^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/;

    return base64ImagePattern.test(imageString);
};