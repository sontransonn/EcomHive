import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/client",
    withCredentials: true
})

const initialState = {
    banners: []
}

export const get_banners = createAsyncThunk(
    'banner/get_banners',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/banners')

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_banners.fulfilled, (state, action) => {
                state.banners = action.payload.banners;
            });
    }
})
export const {
    messageClear
} = bannerSlice.actions

export default bannerSlice.reducer