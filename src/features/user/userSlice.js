import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action) {
            state.name  = action.payload.name;
            state.profileUrl = action.payload.profileUrl;
        }
    }
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer
