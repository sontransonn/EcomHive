import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/client",
    withCredentials: true
})

const initialState = {
    successMessage: '',
    totalReview: 0,
    rating_review: [],
    reviews: [],
}

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, { fulfillWithValue }) => {
        try {
            const { data } = await api.post('/submit-review', info)

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error);
        }
    }
)

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({ productId, pageNumber }, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-reviews/${productId}?pageNo=${pageNumber}`)

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error);
        }
    }
)

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(customer_review.fulfilled, (state, action) => {
                state.successMessage = action.payload.message;
            })
            .addCase(get_reviews.fulfilled, (state, action) => {
                state.reviews = action.payload.reviews;
                state.totalReview = action.payload.totalReview;
                state.rating_review = action.payload.rating_review;
            })
    }
})
export const {
    messageClear
} = reviewSlice.actions

export default reviewSlice.reducer