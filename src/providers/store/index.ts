import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticate: false,
        user: null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticate = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticate = false;
            state.user = null;
        }
    }
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { login, logout } = authSlice.actions;
export default store;