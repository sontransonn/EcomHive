import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice';
import homeReducer from './slices/homeSlice';
import cardReducer from './slices/cardSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
        card: cardReducer
    },

    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
    devTools: true,
})

export default store;