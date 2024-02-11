import { Post } from '../../../types/post';
import postsSlice, { getPosts, removePost, requestBlogStatus } from './postsSlice';

const createInitialState = (overrides = {}) => ({
    data: {
        pageNumber: 0,
        pageSize: 0,
        post: [],
        length: 0,
        totalPages: 0,
        totalRecords: 0,
    },
    lastRequestStatus: null,
    ...overrides,
});

describe('postsSlice reducer', () => {
    test('updates state with new posts on getPosts action', () => {
        const initialState = createInitialState();
        const newPostsData = {
            pageNumber: 1,
            pageSize: 10,
            post: [{ id: '1', title: 'Test Post', content: 'This is a test' }] as Post[],
            length: 1,
            totalPages: 1,
            totalRecords: 1,
        };

        const updatedState = postsSlice(initialState, getPosts(newPostsData));
        expect(updatedState).toEqual({
            ...initialState,
            data: newPostsData,
        });
    });

    test('filters out a post by id on removePost action', () => {
        const initialState = createInitialState({
            data: {
                pageNumber: 1,
                pageSize: 10,
                post: [
                    { id: '1', title: 'Test Post 1', content: 'This is a test' },
                    { id: '2', title: 'Test Post 2', content: 'This is another test' },
                ],
                length: 2,
                totalPages: 1,
                totalRecords: 2,
            },
        });

        const postIdToRemove = '1';
        const updatedState = postsSlice(initialState, removePost(postIdToRemove));
        expect(updatedState.data.post).toEqual([
            { id: '2', title: 'Test Post 2', content: 'This is another test' },
        ]);
        // Assuming length and totalRecords should not change as they might be managed server-side
        expect(updatedState.data.length).toBe(initialState.data.length);
        expect(updatedState.data.totalRecords).toBe(initialState.data.totalRecords);
    });

    test('updates the last request status on requestBlogStatus action', () => {
        const initialState = createInitialState();
        const newStatus = true;

        const updatedState = postsSlice(initialState, requestBlogStatus(newStatus));
        expect(updatedState.lastRequestStatus).toBe(newStatus);
    });
});
