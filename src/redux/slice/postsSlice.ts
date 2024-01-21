import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post';
import CategoryFormProperty from '../../types/categoryFormProperty';

interface PagedResponse<T> {
    pageNumber: number;
    pageSize: number;
    items: T[];
    length: number;
    totalPages: number;
    totalRecords: number;
}

interface PostState {
    data: PagedResponse<Post>;
    lastRequestStatus: boolean | null;
}

const initialState: PostState = {
    data: {
        pageNumber: 0,
        pageSize: 0,
        items: [],
        length: 0,
        totalPages: 0,
        totalRecords: 0
    },
    lastRequestStatus: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,

    reducers: {
        getPosts: (state, action: PayloadAction<PagedResponse<Post>>) => {
            state.data = action.payload;
            state.lastRequestStatus = null;
            return state;
        },

        updatePostCategory: (state, action: PayloadAction<{ postId: string; category: CategoryFormProperty }>) => {
            const { postId, category } = action.payload;
            const postIndex = state.data.items.findIndex((post) => post.id === postId);
            if (postIndex !== -1) {
                // state.data.items[postIndex].categories = [...(state.data.items[postIndex].categories || []), category];
            }
            return state;
        },

        removePost: (state, action: PayloadAction<string>) => {
            state.data.items = state.data.items.filter((post) => post.id !== action.payload);
            return state;
        },

        requestBlogStatus: (state, action: PayloadAction<boolean>) => {
            state.lastRequestStatus = action.payload;
            return state;
        }
    }
});

export const { getPosts, updatePostCategory, removePost, requestBlogStatus } = postsSlice.actions;

export default postsSlice.reducer;
