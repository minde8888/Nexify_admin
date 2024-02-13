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

    test('should append files to FormData correctly', () => {
        const file = new File(['file contents'], 'test.txt');
        const data = {
            image: file
        };
        const formData = new FormData();
        createFormData(data, formData);
    
        expect(formData.get('images')).toBe(file);
    });    
});
