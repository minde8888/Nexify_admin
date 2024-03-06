import categoriesReducer, { getCategories, updateCategory, updateSubcategory, removeCategory, removeSubcategory, requestCategoryStatus } from './categoriesSlice';

describe('categories reducer', () => {
    const initialState = {
        data: [],
        lastRequestStatus: null
    };

    const initialCategories = [
        {
            id: '1',
            title: 'Tech',
            description: 'Technology and Gadgets',
            imageSrc: 'tech.jpg',
            dateCreated: '2022-01-01',
            subcategories: [
                {
                    id: '1-1',
                    title: 'Smartphones',
                    description: 'Latest smartphones and accessories',
                    imageSrc: 'smartphones.jpg',
                    dateCreated: '2022-01-10',
                    subcategories: []
                }
            ]
        }
    ];

    test('should handle initial state', () => {
        expect(categoriesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle getCategories', () => {
        const action = getCategories(initialCategories);
        const state = categoriesReducer(initialState, action);
        expect(state.data).toEqual(initialCategories);
        expect(state.lastRequestStatus).toBeNull();
    });

    test('should handle updateCategory', () => {
        const updatedCategory = { id: '1', title: 'Technology' }; 
        const action = updateCategory(updatedCategory);
        const state = categoriesReducer({ ...initialState, data: initialCategories }, action);
        expect(state.data[0].title).toEqual('Technology');
        expect(state.lastRequestStatus).toBeFalsy();
    });

    test('should handle updateSubcategory', () => {
        const updatedSubcategory = { id: '1-1', title: 'Mobile Phones' }; 
        const action = updateSubcategory(updatedSubcategory);
        const state = categoriesReducer({ ...initialState, data: initialCategories }, action);
        expect(state.data[0].subcategories[0].title).toEqual('Mobile Phones');
        expect(state.lastRequestStatus).toBeFalsy();
    });

    test('should handle removeCategory', () => {
        const categoryIdToRemove = '1';
        const action = removeCategory(categoryIdToRemove);
        const state = categoriesReducer({ ...initialState, data: initialCategories }, action);
        expect(state.data.length).toBe(0);
    });

    test('should handle removeSubcategory', () => {
        const subcategoryIdToRemove = '1-1';
        const action = removeSubcategory(subcategoryIdToRemove);
        const state = categoriesReducer({ ...initialState, data: initialCategories }, action);
        expect(state.data[0].subcategories.length).toBe(0);
    });

    test('should handle requestCategoryStatus', () => {
        const status = true;
        const action = requestCategoryStatus(status);
        const state = categoriesReducer(initialState, action);
        expect(state.lastRequestStatus).toBe(status);
    });
});
