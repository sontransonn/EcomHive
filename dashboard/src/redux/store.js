import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice'
import productReducer from './slices/productSlice'
import sellerReducer from './slices/sellerSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        seller: sellerReducer
    },

    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
    devTools: true
})

export default store