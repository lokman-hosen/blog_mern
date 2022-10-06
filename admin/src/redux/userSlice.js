import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        login: localStorage.getItem('login'),
        token: localStorage.getItem('token'),
    },
    reducers: {
        login: (state, action) => {
         state.name = action.payload.name;
         state.email = action.payload.email;
         state.login = action.payload.login;
         state.token = action.payload.token;
        },
        logout: state => {
            state.value -= 1
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;