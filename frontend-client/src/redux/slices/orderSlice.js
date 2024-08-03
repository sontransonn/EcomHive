import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/order/customer",
    withCredentials: true
})

export const place_order = createAsyncThunk(
    'order/place_order',
    async ({ price, products, shipping_fee, shippingInfo, userId, navigate, items }) => {
        try {
            const { data } = await api.post('/place-order', {
                price,
                products,
                shipping_fee,
                shippingInfo,
                userId,
                navigate,
                items,
            })

            navigate('/payment', {
                state: {
                    price: price + shipping_fee,
                    items,
                    orderId: data.orderId
                }
            })

            return true
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_orders = createAsyncThunk(
    'order/get_orders',
    async ({
        customerId,
        status
    }, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/customer/gat-orders/${customerId}/${status}`)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_order = createAsyncThunk(
    'order/get_order',
    async (orderId, {
        rejectWithValue,
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/customer/gat-order/${orderId}`)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        myOrders: [],
        errorMessage: '',
        successMessage: '',
        myOrder: {}
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(get_orders.fulfilled, (state, { payload }) => {
                state.myOrders = payload.orders
            })
            .addCase(get_order.fulfilled, (state, { payload }) => {
                state.myOrder = payload.order
            })
})

export const {
    messageClear
} = orderSlice.actions

export default orderSlice.reducer