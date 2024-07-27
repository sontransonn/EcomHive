import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer
    },

    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
    devTools: true
})

export default store