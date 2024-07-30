import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: null,
        errorMessage: '',
        successMessage: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        user_reset: (state, _) => {
            state.userInfo = ""
        }
    },
    // extraReducers: {
    //     [customer_register.pending]: (state, _) => {
    //         state.loader = true
    //     },
    //     [customer_register.rejected]: (state, { payload }) => {
    //         state.errorMessage = payload.error
    //         state.loader = false
    //     },
    //     [customer_register.fulfilled]: (state, { payload }) => {
    //         const userInfo = decodeToken(payload.token)
    //         state.successMessage = payload.message
    //         state.loader = false
    //         state.userInfo = userInfo
    //     },
    //     [customer_login.pending]: (state, _) => {
    //         state.loader = true
    //     },
    //     [customer_login.rejected]: (state, { payload }) => {
    //         state.errorMessage = payload.error
    //         state.loader = false
    //     },
    //     [customer_login.fulfilled]: (state, { payload }) => {
    //         const userInfo = decodeToken(payload.token)
    //         state.successMessage = payload.message
    //         state.loader = false
    //         state.userInfo = userInfo
    //     },
    // }
})

export const {
    messageClear,
    user_reset
} = authSlice.actions

export default authSlice.reducer