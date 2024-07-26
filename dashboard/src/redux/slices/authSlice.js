import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

const initialState = {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
    token: localStorage.getItem('accessToken')
}

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/admin-login', info, { withCredentials: true })
            localStorage.setItem('accessToken', data.token)

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
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(admin_login.pending, (state, action) => {
                state.loader = true
            })
            .addCase(admin_login.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.error
            })
            .addCase(admin_login.fulfilled, (state, action) => {
                state.loader = false
                state.successMessage = action.payload.message
                state.token = action.payload.token
            })
    }
})

export const {
    messageClear
} = authSlice.actions

export default authSlice.reducer