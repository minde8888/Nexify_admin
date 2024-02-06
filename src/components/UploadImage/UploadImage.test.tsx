import { render, fireEvent, RenderResult, screen, waitFor } from '@testing-library/react';
import UploadImage from './UploadImage';
import { ImageFile } from '../../types/imageFile';

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

interface SetupOptions {
  setImagePreviewUrl?: (imagePreviewUrl: string) => void;
  handleAddImage?: (images: ImageFile[]) => void;
}

const defaultSetImagePreviewUrl = jest.fn();
const defaultHandleAddImage = jest.fn();

const setup = async ({
  setImagePreviewUrl = defaultSetImagePreviewUrl,
  handleAddImage = defaultHandleAddImage,
}: SetupOptions = {}): Promise<RenderResult> => {
  const utils = render(
    <UploadImage
      setImagePreviewUrl={setImagePreviewUrl}
      handleAddImage={handleAddImage}
    />
  );
  return utils;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UploadImage component', () => {
  test('should render without errors', async () => {
    const { container } = await setup();
    expect(container).toBeInTheDocument();
  });

  test('should handle image upload and preview', async () => {

    await setup();

    const fileInput = screen.getByTestId('file-input');
    const imageFile = new File(['image data'], 'example.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [imageFile] } });

    await waitFor(() => expect(defaultSetImagePreviewUrl).toHaveBeenCalled());

    expect(defaultSetImagePreviewUrl).toHaveBeenCalledWith(expect.stringContaining('data:image/jpeg;base64,'));

    expect(defaultHandleAddImage).toHaveBeenCalledWith([{ file: expect.any(File) }]);
  });

  test('should handle image removal', async () => {

    render(<UploadImage setImagePreviewUrl={defaultSetImagePreviewUrl} handleAddImage={defaultHandleAddImage} />);

    fireEvent.click(screen.getByTestId('icon-button-1'));

    expect(defaultSetImagePreviewUrl).toHaveBeenCalledWith('');
    expect(defaultHandleAddImage).toHaveBeenCalledWith([]);
  });
});
