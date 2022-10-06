import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: 'Default User',
        email: 'default@gmail.com',
        login: false,
        token: '123456789',
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