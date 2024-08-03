import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/client",
    withCredentials: true
})

const initialState = {
    categories: [],
}

export const get_all_category = createAsyncThunk(
    'category/get_all_category',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/get-all-category')

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_category.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
            })
    }
})
export const {
    messageClear
} = categorySlice.actions

export default categorySlice.reducer