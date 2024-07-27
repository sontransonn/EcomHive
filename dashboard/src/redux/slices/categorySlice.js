import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const categoryAdd = createAsyncThunk(
    'category/categoryAdd',
    async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {

        try {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('image', image)

            const { data } = await api.post('/category-add', formData, { withCredentials: true })

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
            .addCase(categoryAdd.pending, (state, action) => {
                state.loader = true
            })
            .addCase(categoryAdd.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.error
            })
            .addCase(categoryAdd.fulfilled, (state, action) => {
                state.loader = false
                state.successMessage = action.payload.message
                state.categories = [...state.categories, action.payload.category]
            })
    }
})

export const {
    messageClear
} = categorySlice.actions

export default categorySlice.reducer