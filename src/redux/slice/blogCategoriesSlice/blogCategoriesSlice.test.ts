import blogCategoriesReducer, { getPostCategories, updatePostCategory, removePostCategory, requestBlogCategoryStatus } from './blogCategoriesSlice';

const initialCategories = [
    {
        id: '1',
        title: 'Tech',
        description: 'Technology and Gadgets',
        imageSrc: 'tech.jpg',
        dateCreated: '2022-01-01',
        subcategories: []
    },
    {
        id: '2',
        title: 'Lifestyle',
        description: 'Living and Wellness',
        imageSrc: 'lifestyle.jpg',
        dateCreated: '2022-02-01',
        subcategories: []
    }
];

describe('blogCategories reducer', () => {
    const initialState = {
        data: [],
        lastRequestStatus: null
    };

    test('should handle initial state', () => {
        expect(blogCategoriesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('should handle getPostCategories', () => {
        const action = getPostCategories(initialCategories);
        const state = blogCategoriesReducer(initialState, action);
        expect(state.data).toEqual(initialCategories);
        expect(state.lastRequestStatus).toBeNull();
    });

    test('should handle updatePostCategory', () => {
        const updatedCategory = {
            id: '1',
            title: 'Technology',
            description: 'All about the latest tech',
            imageSrc: 'new-tech.jpg'
        };
        const action = updatePostCategory(updatedCategory);
        const state = blogCategoriesReducer({ ...initialState, data: initialCategories }, action);
        expect(state.data[0]).toEqual(expect.objectContaining(updatedCategory));
        expect(state.lastRequestStatus).toBeFalsy();
    });

    test('should handle removePostCategory', () => {
        const categoryIdToRemove = '1';
        const action = removePostCategory(categoryIdToRemove);
        const state = blogCategoriesReducer({ ...initialState, data: initialCategories }, action);
        expect(state.data).toHaveLength(1);
        expect(state.data.find((category) => category.id === categoryIdToRemove)).toBeUndefined();
    });

    test('should handle requestBlogCategoryStatus', () => {
        const status = true;
        const action = requestBlogCategoryStatus(status);
        const state = blogCategoriesReducer(initialState, action);
        expect(state.lastRequestStatus).toBe(status);
    });
});
