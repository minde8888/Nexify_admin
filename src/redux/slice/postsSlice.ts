import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post';
import { findIndexById } from '../../utils/helpers/findIndexById';

interface PagedResponse<T> {
    pageNumber: number;
    pageSize: number;
    post: Post[];
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
        post: [],
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

        updatePost: (state, action: PayloadAction<Post>) => {
            state.lastRequestStatus = false;
            const updatedPost = action.payload;
            const postIndex = findIndexById(state.data.post, updatedPost.id, 'id');
            if (postIndex !== -1) {
                state.data.post[postIndex] = { ...state.data.post[postIndex], ...updatedPost };
                return state;
            }
            return state;
        },

        removePost: (state, action: PayloadAction<string>) => {
            state.data.post = state.data.post.filter((item) => item.id !== action.payload);
            return state;
        },

        requestBlogStatus: (state, action: PayloadAction<boolean>) => {
            state.lastRequestStatus = action.payload;
            return state;
        }
    }
});

export const { getPosts, updatePost, removePost, requestBlogStatus } = postsSlice.actions;

export default postsSlice.reducer;
