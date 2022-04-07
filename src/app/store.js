import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/posts/postSlice';
import userSlice from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSlice,
    user: userSlice,
  },
});
