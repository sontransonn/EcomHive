import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice';
import homeReducer from './slices/homeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
    },

    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
    devTools: true,
})

export default store;