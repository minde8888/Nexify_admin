import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post';
import { findIndexById } from '../../utils/helpers/findIndexById';
import CategoryFormProperty from '../../types/categoryFormProperty';

interface PostState extends PagedResponse<Array<Post>> {}

const postsSlice = createSlice({
    name: 'posts',
    initialState: {} as PostState,

    reducers: {
        getPosts: (state, action: PayloadAction<PostState>) => {
            return action.payload;
        },

        updatePostCategory: (state, action: PayloadAction<CategoryFormProperty>) => {
            const updatedCategory = action.payload;
            // Perform the necessary logic for updating post category
        },

        removePost: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const index = findIndexById(state.post, id, 'postId');
            if (index !== -1) {
                state.post.splice(index, 1);
            }
        }
    }
});

export const { getPosts, updatePostCategory, removePost } = postsSlice.actions;

export default postsSlice.reducer;
