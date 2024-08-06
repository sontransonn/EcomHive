import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import reviewReducer from './slices/reviewSlice';
import bannerReducer from './slices/bannerSlice';
import productSlice from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducere from './slices/wishlistSlice';
import orderReducer from './slices/orderSlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        review: reviewReducer,
        banner: bannerReducer,
        product: productSlice,
        cart: cartReducer,
        wishlist: wishlistReducere,
        order: orderReducer,
        chat: chatReducer
    },

    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
    devTools: true,
})

export default store;