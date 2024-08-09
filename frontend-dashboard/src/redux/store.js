import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice'
import productReducer from './slices/productSlice'
import sellerReducer from './slices/sellerSlice'
import chatReducer from './slices/chatSlice'
import orderReducer from './slices/orderSlice'
import paymentReducer from './slices/paymentSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        seller: sellerReducer,
        chat: chatReducer,
        order: orderReducer,
        payment: paymentReducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
    devTools: true
})

export default store