import { render, fireEvent, RenderResult, screen } from '@testing-library/react';
import UploadImage from './UploadImage';

jest.mock('../../utils/helpers/compressImage', () => ({
  compressImage: (file: File, targetSizeKB: number, callback: (compressedDataUrl: string) => void) => {
    callback('data:image/jpeg;base64,...');
  },
}));
jest.mock('../../utils/helpers/dataURLtoFile', () => ({
  dataURLtoFile: (dataURL: string, fileName: string): File => {
    return new File([dataURL], fileName, { type: 'image/jpeg' });
  },
}));

const setup = async (): Promise<RenderResult> => {
  const utils = render(<UploadImage setImagePreviewUrl={() => { }} />);
  return {
    ...utils,
  };
};

describe('UploadImage component', () => {
  test('should render without errors', async () => {
    const { container } = await setup();
    expect(container).toBeInTheDocument();
  });

  test('should handle image upload and preview', async () => {
    const setImagePreviewUrl = jest.fn();
    const handleAddImage = jest.fn();

    await setup();

    const fileInput = screen.getByTestId('file-input');

    const imageFile = new File(['image data'], 'example.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [imageFile] } });

    expect(setImagePreviewUrl).toHaveBeenCalledWith('data:image/jpeg;base64,...');
    expect(handleAddImage).toHaveBeenCalledWith([{ file: expect.any(File) }]);

    fireEvent.change(fileInput, { target: { files: [new File(['invalid data'], 'invalid.txt')] } });

     expect(screen.getByText('Invalid file. Please select a valid image file within the specified size limit.')).toBeInTheDocument();
  });

  test('should handle image removal', async () => {
    const setImagePreviewUrl = jest.fn();
    const handleAddImage = jest.fn();

    await setup();

    fireEvent.click(screen.getByTestId('icon-button-1'));

    expect(setImagePreviewUrl).toHaveBeenCalledWith('');
    expect(handleAddImage).toHaveBeenCalledWith([]);
  });
});
