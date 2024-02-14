import { findCategoryById, findSubcategoryById } from './categoryById';

describe('findCategoryById function', () => {
    const categories = [
        { id: '1', categoryName: 'Category 1', description: 'Description 1', imageSrc: 'image1.jpg', dateCreated: '2022-01-01', subcategories: [] },
        { id: '2', categoryName: 'Category 2', description: 'Description 2', imageSrc: 'image2.jpg', dateCreated: '2022-01-02', subcategories: [] },
        { id: '3', categoryName: 'Category 3', description: 'Description 3', imageSrc: 'image3.jpg', dateCreated: '2022-01-03', subcategories: [] }
    ];

    test('should find category by id', () => {
        const categoryId = '2';
        const foundCategory = findCategoryById(categoryId, categories);
        expect(foundCategory).toEqual({ id: '2', categoryName: 'Category 2', description: 'Description 2', imageSrc: 'image2.jpg', dateCreated: '2022-01-02', subcategories: [] });
    });

    test('should return undefined if category is not found', () => {
        const categoryId = '4';
        const foundCategory = findCategoryById(categoryId, categories);
        expect(foundCategory).toBeUndefined();
    });
});

describe('findSubcategoryById function', () => {
    const categories = [
        {
            id: '1',
            categoryName: 'Category 1',
            description: 'Description 1',
            imageSrc: 'image1.jpg',
            dateCreated: '2022-01-01',
            subcategories: [{ id: '11', categoryName: 'Subcategory 1-1', description: 'Description 1-1', imageSrc: 'image1-1.jpg', dateCreated: '2022-01-11' }]
        },
        {
            id: '2',
            categoryName: 'Category 2',
            description: 'Description 2',
            imageSrc: 'image2.jpg',
            dateCreated: '2022-01-02',
            subcategories: [{ id: '21', categoryName: 'Subcategory 2-1', description: 'Description 2-1', imageSrc: 'image2-1.jpg', dateCreated: '2022-01-21' }]
        },
        { id: '3', categoryName: 'Category 3', description: 'Description 3', imageSrc: 'image3.jpg', dateCreated: '2022-01-03', subcategories: [] }
    ];

    test('should find subcategory by id', () => {
        const subCategoryId = '21';
        const foundSubcategory = findSubcategoryById(subCategoryId, categories);
        expect(foundSubcategory).toEqual({ id: '21', categoryName: 'Subcategory 2-1', description: 'Description 2-1', imageSrc: 'image2-1.jpg', dateCreated: '2022-01-21' });
    });

    test('should return undefined if subcategory is not found', () => {
        const subCategoryId = '31';
        const foundSubcategory = findSubcategoryById(subCategoryId, categories);
        expect(foundSubcategory).toBeUndefined();
    });
});
