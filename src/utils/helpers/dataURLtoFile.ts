import { FileReadError } from "../../errorHandler/fileReadError";

export const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const match = arr[0].match(/:(.*?);/); 
    
    if (match === null) {
        throw new FileReadError('Unable to extract MIME type from data URL.');
    }

    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};