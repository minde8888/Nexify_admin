import { createFormData } from './createFormData';

describe('createFormData', () => {
    test('should append key-value pairs to FormData correctly', () => {
        const data = {
            name: 'John',
            age: 30
        };
        const formData = new FormData();
        createFormData(data, formData);
        expect(formData.get('name')).toBe('John');
        expect(formData.get('age')).toBe('30');
    });

    test('should handle File objects', () => {
        const data = {
            avatar: [new File(['file1 content'], 'avatar1.jpg', { type: 'image/jpeg' }), new File(['file2 content'], 'avatar2.jpg', { type: 'image/jpeg' })]
        };

        const formData = createFormData(data);

        expect(formData.getAll('avatar').length).toBe(2);
        expect(formData.getAll('avatar')[0]).toBeInstanceOf(File);
        expect(formData.getAll('avatar')[1]).toBeInstanceOf(File);
    });

    test('should handle arrays of File objects', () => {
        const data = {
            images: [new File(['file1 content'], 'image1.jpg', { type: 'image/jpeg' }), new File(['file2 content'], 'image2.jpg', { type: 'image/jpeg' })]
        };

        const formData = createFormData(data);

        expect(formData.getAll('images').length).toBe(2);
        expect(formData.getAll('images')[0]).toBeInstanceOf(File);
        expect(formData.getAll('images')[1]).toBeInstanceOf(File);
    });
});
