export const compressImage = (file: File, targetSizeKB: number, callback: (result: string | null) => void): void => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, img.width, img.height);
            let quality = 1.0;
            let dataUrl = '';

            const checkSizeAndCompress = () => {
                dataUrl = canvas.toDataURL('image/jpeg', quality);
                const byteString = atob(dataUrl.split(',')[1]);
                const byteSize = byteString.length;

                if (byteSize > targetSizeKB * 1024 && quality > 0.1) {
                    quality -= 0.1;
                    checkSizeAndCompress();
                } else {
                    callback(byteSize <= targetSizeKB * 1024 ? dataUrl : null);
                }
            };

            checkSizeAndCompress();
        };
        img.onerror = () => {
            callback(null);
        };
        img.src = event.target?.result as string;
    };
    reader.onerror = () => {
        callback(null);
    };
    reader.readAsDataURL(file);
};
