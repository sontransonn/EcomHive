import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/dashboard',
    withCredentials: true
})

// Lấy ra các category theo truy vấn
export const get_categories_by_query = createAsyncThunk(
    'category/get_categories_by_query',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-categories-by-query?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Thêm category (Admin)
export const add_category = createAsyncThunk(
    'category/add_category',
    async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {

        try {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('image', image)

            const { data } = await api.post('/add-category', formData)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        categories: [],
        totalCategory: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_category.pending, (state, action) => {
                state.loader = true
            })
            .addCase(add_category.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.error
            })
            .addCase(add_category.fulfilled, (state, action) => {
                state.loader = false
                state.successMessage = action.payload.message
                state.categories = [...state.categories, action.payload.category]
            })
            .addCase(get_categories_by_query.fulfilled, (state, action) => {
                state.totalCategory = action.payload.totalCategory
                state.categories = action.payload.categories
            })
    }
})

export const {
    messageClear
} = categorySlice.actions

export default categorySlice.reducer