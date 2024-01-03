import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post';
import { findIndexById } from '../../utils/helpers/findIndexById';
import CategoryFormProperty from '../../types/categoryFormProperty';

interface PostState extends Array<Post> {}

const postsSlice = createSlice({
  name: 'posts',
  initialState: [] as PostState,

  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      return action.payload;
    },

    updatePostCategory: (state, action: PayloadAction<CategoryFormProperty>) => {
      const updatedCategory = action.payload;
      // Perform the necessary logic for updating post category
    },
  },
});

export const { getPosts, updatePostCategory } = postsSlice.actions;

export default postsSlice.reducer;
