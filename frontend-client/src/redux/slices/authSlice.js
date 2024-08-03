import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

import { decodeToken } from '../../utils/tokenUtil'

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth",
    withCredentials: true
})

const initialState = {
    loader: false,
    userInfo: decodeToken(localStorage.getItem('customerToken')),
    errorMessage: '',
    successMessage: ''
}

// Đăng ký (Customer)
export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer-register', info)
            localStorage.setItem('customerToken', data.token)

            console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Đăng nhập (Customer)
export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer-login', info)
            localStorage.setItem('customerToken', data.token)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        user_reset: (state, _) => {
            state.userInfo = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(customer_register.pending, (state) => {
                state.loader = true;
            })
            .addCase(customer_register.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(customer_register.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
                state.userInfo = decodeToken(payload.token);
            })
            .addCase(customer_login.pending, (state) => {
                state.loader = true;
            })
            .addCase(customer_login.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(customer_login.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
                state.userInfo = decodeToken(payload.token);
            });
    }
})

export const {
    messageClear,
    user_reset
} = authSlice.actions

export default authSlice.reducer