import { compressImage } from './compressImage'; // Replace 'yourModule' with the actual module path

describe('compressImage function', () => {
    // test('should compress image to target size', async () => {
    //     const mockFile = new File(['dummyImageData'], 'dummyImage.jpg', { type: 'image/jpeg' });
    //     const targetSizeKB = 50;
    //     const expectedQuality = 0.5; // Adjust expected quality as needed
    
    //     // Mock FileReader and onload behavior
    //     const mockFileReaderResult = 'data:image/jpeg;base64,dummyBase64Data';
    //     const mockFileReader = {
    //         onload: jest.fn(),
    //         readAsDataURL: jest.fn(),
    //         result: mockFileReaderResult,
    //     };
    //     global.FileReader = jest.fn(() => mockFileReader) as any;
    
    //     // Mock Image and onload behavior
    //     const mockImage = {
    //         onload: jest.fn(),
    //         onerror: jest.fn(),
    //         src: '',
    //         width: 100,
    //         height: 100,
    //     };
    //     global.Image = jest.fn(() => mockImage) as any;
    
    //     // Create a ProgressEvent with a target property
    //     const progressEvent = {
    //         target: {
    //             result: mockFileReaderResult,
    //         },
    //     };
    
    //     // Create a Promise to await the callback
    //     const resultPromise = new Promise<string | null>((resolve) => {
    //         // Call compressImage and provide the resolve function to the callback
    //         compressImage(mockFile, targetSizeKB, resolve);
    
    //         // Simulate FileReader onload with the created ProgressEvent
    //         mockFileReader.onload(progressEvent);
    //     });
    
    //     // Await the result of the compressImage operation
    //     const result = await resultPromise;
    
    //     expect(result).not.toBeNull();
    //     expect(result).toContain('data:image/jpeg;base64,');
    //     const byteString = atob(result!.split(',')[1]);
    //     const byteSize = byteString.length;
    //     const expectedByteSize = targetSizeKB * 1024;
    
    //     // Check if compressed image size is less than or equal to target size
    //     expect(byteSize).toBeLessThanOrEqual(expectedByteSize);
    
    //     // Check if the quality of the compressed image matches the expected quality
    //     const compressedQuality = Number((result!.split(';')[0].split('=')[1]));
    //     expect(compressedQuality).toBeCloseTo(expectedQuality);
    // });
    

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
