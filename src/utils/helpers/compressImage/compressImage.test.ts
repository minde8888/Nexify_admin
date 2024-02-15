import { compressImage } from './compressImage';

describe('compressImage function', () => {
    test('should handle error', (done) => {
        const mockFile = new File(['dummyImageData'], 'dummyImage.jpg', { type: 'image/jpeg' });
        const targetSizeKB = 50;

        const mockFileReader = {
            onload: jest.fn(),
            readAsDataURL: jest.fn(),
            onerror: jest.fn()
        };
        global.FileReader = jest.fn(() => mockFileReader) as any;

        compressImage(mockFile, targetSizeKB, (result) => {
            expect(result).toBeNull();
            done();
        });

        mockFileReader.onerror();
    });
});
