interface ImagesProps {
    getImages: (ImageData: ImageFile[]) => void;
    maxNumber: number;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    initialImages?: string[];
    styleDrop?: string;
    styles: Styles;
}
