import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
import filterReducer from "./slice/filterSlice"
import cartReducer from "./slice/cartSlice"
import checkoutReducer from "./slice/checkoutSlice"
import orderReducer from "./slice/orderSlice"
import loggerMiddleware from "./loggerMiddleware"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
