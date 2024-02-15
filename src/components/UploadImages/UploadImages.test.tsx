import { render, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadImages from './UploadImages';
import styles from '../../styles/uploadImages.module.scss'

jest.mock('../../utils/helpers/compressImage/compressImage', () => ({
  compressImage: jest.fn((file, targetSizeKB, callback) => callback('data:image/jpeg;base64,compressed-image-data')),
}));

jest.mock('../../utils/helpers/dataURLtoFile/dataURLtoFile', () => ({
  dataURLtoFile: jest.fn().mockImplementation((dataURL, fileName) => new File([dataURL], fileName, { type: 'image/jpeg' })),
}));

const renderUploadImages = (props: ImagesProps) => render(
  <UploadImages
    getImages={props.getImages || jest.fn()}
    maxNumber={props.maxNumber || 3}
    resetImages={props.resetImages || false}
    setResetImages={props.setResetImages || (() => { })}
    initialImages={props.initialImages || []}
    styles={styles}
  />
);

describe('UploadImages Component', () => {
  const mockGetImages = jest.fn();
  const initialImages = ['data:image/jpeg;base64,initial-image-data'];

  test('renders correctly with initial images', () => {
    renderUploadImages({
      getImages: mockGetImages, initialImages,
      maxNumber: 0,
      resetImages: false,
      setResetImages: function (value: boolean): void { },
      styles:styles 
    });
    const displayedImages = screen.getAllByRole('img', { name: /imgAltText/i });
    expect(displayedImages[0]).toHaveAttribute('src', 'mock-file');
  });

  test('allows user to remove an image', async () => {
    renderUploadImages({ getImages: mockGetImages, 
      initialImages,
       maxNumber: 5, 
       resetImages: false, 
       setResetImages: () => { }, 
       styles:styles });

    const removeButton = await screen.findByTestId('icon-button-1');
    userEvent.click(removeButton);

    await waitFor(() => {
      expect(mockGetImages).toHaveBeenCalledTimes(1);
    });
  });
});

