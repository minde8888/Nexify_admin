import { FileReadError } from '../../../errorHandler/fileReadError';
import { dataURLtoFile } from './dataURLtoFile';

describe('dataURLtoFile', () => {
    test('converts a valid data URL to a File object', () => {
        const dataUrl = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='; 
        const filename = 'hello.txt';

        const file = dataURLtoFile(dataUrl, filename);

        expect(file).toBeInstanceOf(File);
        expect(file.name).toBe(filename);
        expect(file.type).toBe('text/plain');
    });

    test('throws a FileReadError when MIME type is missing from data URL', () => {
        const dataUrl = 'data:,SGVsbG8sIFdvcmxkIQ=='; 
        const filename = 'hello.txt';

        expect(() => dataURLtoFile(dataUrl, filename)).toThrow(FileReadError);
        expect(() => dataURLtoFile(dataUrl, filename)).toThrow('Unable to extract MIME type from data URL.');
    });
});
