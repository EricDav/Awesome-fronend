import { createSlice } from '@reduxjs/toolkit';

const initialState = {data: [], total: 0};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPosts(state, action) {
            state.data = action.payload.data;
            state.total = action.payload.total;
        }
    }
});

export const { fetchPosts } = postsSlice.actions;

export default postsSlice.reducer
