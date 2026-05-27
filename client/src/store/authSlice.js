import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('bidlance_user')) || null,
    token: localStorage.getItem('bidlance_token') || null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setUser(state, action) {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.error = null;
            localStorage.setItem('bidlance_user', JSON.stringify(user));
            localStorage.setItem('bidlance_token', token);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('bidlance_user');
            localStorage.removeItem('bidlance_token');
        },
        setError(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { setLoading, setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;
