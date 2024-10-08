import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { decodeToken } from '../../utils/tokenUtil';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/auth'
})

const initialState = {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
    role: decodeToken(localStorage.getItem('accessToken')),
    token: localStorage.getItem('accessToken')
}

// Đăng nhập với admin
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

// Đăng nhập với seller
export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/seller-login', info, { withCredentials: true })
            localStorage.setItem('accessToken', data.token)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Đăng ký seller
export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/seller-register', info, { withCredentials: true })
            localStorage.setItem('accessToken', data.token)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Đăng xuất
export const logout = createAsyncThunk(
    'auth/logout',
    async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/logout', { withCredentials: true })

            localStorage.removeItem('accessToken')
            if (role === 'admin') {
                navigate('/admin/login')
            } else {
                navigate('/seller/login')
            }

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/get-user', { withCredentials: true })

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async (image, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/profile-image-upload', image, { withCredentials: true })

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/profile-info-add', info, { withCredentials: true })

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
                state.role = decodeToken(action.payload.token)
            })
            .addCase(seller_login.pending, (state, action) => {
                state.loader = true
            })
            .addCase(seller_login.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.error
            })
            .addCase(seller_login.fulfilled, (state, action) => {
                state.loader = false
                state.successMessage = action.payload.message
                state.token = action.payload.token
                state.role = decodeToken(action.payload.token)
            })
            .addCase(seller_register.pending, (state, action) => {
                state.loader = true
            })
            .addCase(seller_register.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.error
            })
            .addCase(seller_register.fulfilled, (state, action) => {
                state.loader = false
                state.successMessage = action.payload.message
                state.token = action.payload.token
                state.role = decodeToken(action.payload.token)
            })
            .addCase(get_user_info.fulfilled, (state, action) => {
                state.loader = false
                state.userInfo = action.payload.userInfo
                state.role = action.payload.userInfo.role
            })
            .addCase(profile_image_upload.pending, (state, action) => {
                state.loader = true
            })
            .addCase(profile_image_upload.fulfilled, (state, action) => {
                state.loader = false
                state.userInfo = action.payload.userInfo
                state.successMessage = action.payload.message
            })
            .addCase(profile_info_add.pending, (state, action) => {
                state.loader = true
            })
            .addCase(profile_info_add.fulfilled, (state, action) => {
                state.loader = false
                state.userInfo = action.payload.userInfo
                state.successMessage = action.payload.message
            })
    }
})

export const {
    messageClear
} = authSlice.actions

export default authSlice.reducer